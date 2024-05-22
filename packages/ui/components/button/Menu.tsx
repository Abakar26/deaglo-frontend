import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Dropdown, Icon, type Selectable } from "..";
import { Color } from "../../styles";
import { useClickOutside } from "../hooks";

export interface MenuProps<T> {
  onSelect: (key: T) => void;
  onClick?: () => void;
  options?: Array<T>;
  disabled?: boolean;
}

export const Menu = <T extends string | Selectable>({
  onSelect,
  onClick,
  options,
  disabled = false,
}: MenuProps<T>) => {
  const [open, setOpen] = useState(false);

  const container = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>();
  const [menuPosition, setMenuPosition] = useState<"right" | "left">("right");

  const ref = useClickOutside(() => setOpen(false));

  const updatePosition = () => {
    if (container.current) {
      const rect = container.current.getBoundingClientRect();
      const availableSpace = window.innerWidth - (rect.left + rect.width);
      const menuWidth = 250;

      if (availableSpace < menuWidth) {
        setMenuPosition("left");
      } else {
        setMenuPosition("right");
      }

      setPosition({
        top: rect.top,
        left: rect.left,
      });
    }
  };

  const select = (key: T) => {
    setOpen(false);
    onSelect(key);
  };

  const toggleDropdown = () => {
    if (!open) {
      setOpen(true);
      updatePosition();
    } else {
      setOpen(false);
    }
    onClick?.();
  };

  useEffect(() => {
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          setOpen(false);
        }
      },
      { threshold: 0.1 }
    );

    if (container.current) {
      observer.observe(container.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Container ref={container}>
      <ButtonContainer
        onClick={toggleDropdown}
        disabled={disabled}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Menu"
      >
        <Icon
          name="menu"
          color={disabled ? Color.NEUTRAL_400 : open ? Color.NEUTRAL_00 : Color.BRAND_900}
        />
      </ButtonContainer>
      {open &&
        options &&
        createPortal(
          <MenuDropdown
            position={position}
            menuPosition={menuPosition}
            ref={ref as React.RefObject<HTMLDivElement>}
          >
            <Dropdown onSelect={select} options={options} />
          </MenuDropdown>,
          document.body
        )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const MenuDropdown = styled.div<{
  position?: { top: number; left: number };
  menuPosition: "right" | "left";
}>`
  position: fixed;
  top: ${(props) => (props.position?.top ?? 0) + 24}px;
  ${(props) =>
    props.menuPosition === "right" ? `left: ${props.position?.left ?? 0}px;` : `right: 300px;`}
  z-index: 10000;
  transition:
    0.1s ease top,
    0.1s ease left;
`;

const ButtonContainer = styled.button`
  border: none;
  outline: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${Color.NEUTRAL_00};
  outline-offset: 2px;
  &:hover {
    background-color: ${Color.BRAND_100};
  }
  &:focus {
    background-color: ${Color.BRAND_800};
    outline: 2px solid ${Color.BRAND_900};
  }
  &:active {
    background-color: ${Color.BRAND_300};
  }
  &:disabled {
    background-color: ${Color.NEUTRAL_00};
  }
  ${(props) => !props.disabled && "cursor: pointer"};
  transition: 0.15s ease background-color;
`;
