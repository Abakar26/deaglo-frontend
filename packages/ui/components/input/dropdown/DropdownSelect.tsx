import { useState } from "react";
import styled from "styled-components";
import { Dropdown } from ".";
import {
  Flag,
  Icon,
  Tooltip,
  type IconName,
  type Selectable,
  type TooltipProps,
} from "../../../components";
import { useClickOutside } from "../../../components/hooks";
import { Color, Typography } from "../../../styles";

interface Props<T> {
  selected?: T;
  onSelect: (value: T) => void;
  onOpen?: () => void;
  onClose?: () => void;
  options: Array<T>;
  error?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  icon?: IconName | Flag;
  tooltip?: TooltipProps;
  onSearch?: (search: string) => void;
  search?: string;
  changeable?: boolean;
}

export const DropdownSelect = <T extends string | Selectable>({
  selected,
  onSelect,
  onOpen,
  onClose,
  options,
  error,
  disabled = false,
  label,
  placeholder,
  icon,
  tooltip,
  onSearch,
  search,
  changeable = true,
}: Props<T>) => {
  const [open, setOpen] = useState<boolean>(false);

  const select = (key: T) => {
    setOpen(false);
    onClose?.();
    onSelect(key);
  };

  const ref = useClickOutside(() => {
    onClose?.();
    setOpen(false);
  });

  const handleOpen = () => {
    if (!disabled) {
      open ? onClose?.() : onOpen?.();
      setOpen(!open);
    }
  };

  return (
    <Container ref={ref}>
      <TooltipContainer>{tooltip && <Tooltip {...tooltip} />}</TooltipContainer>
      <Display
        onClick={() => changeable && handleOpen()}
        disabled={disabled}
        error={!!error}
        active={open}
      >
        <Selected disabled={disabled}>
          {icon && <Icon name={icon} />}
          {typeof selected === "string" ? selected : selected?.value}
        </Selected>

        <Label
          disabled={disabled}
          error={!!error}
          active={open}
          positioned={!!selected || open}
          icon={!!icon}
        >
          {label}
        </Label>

        <Placeholder active={!selected && open} icon={!!icon}>
          {placeholder}
        </Placeholder>
        {changeable && (
          <IconContainer open={open}>
            <Icon name="chevron-down" color={disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_900} />
          </IconContainer>
        )}
      </Display>
      <Error show={!!error}>{error}</Error>
      <Dropdown
        onSelect={select}
        options={options}
        selected={selected ? [selected] : []}
        onSearch={onSearch}
        search={search}
        visible={open}
      />
    </Container>
  );
};

const getColor = (error: boolean, active: boolean, disabled: boolean): Color => {
  return disabled
    ? Color.NEUTRAL_400
    : error
      ? Color.DANGER_700
      : active
        ? Color.BRAND_800
        : Color.NEUTRAL_400;
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Display = styled.div<{ disabled: boolean; error: boolean; active: boolean }>`
  width: 100%;
  height: 48px;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${(props) => getColor(props.error, props.active, props.disabled)};
  background-color: transparent;
  z-index: 50;
  padding: 0 12px;
  ${Typography.BODY_1};
  &:hover {
    border-color: ${(props) =>
      !props.error && !props.disabled && !props.active && Color.NEUTRAL_500};
  }
  ${(props) => !props.disabled && "cursor: pointer"};
  transition: 0.15s ease border-color;
`;

const IconContainer = styled.div<{ open: boolean }>`
  height: 24px;
  transform: rotate(${(props) => (props.open ? "180deg" : 0)});
  transition: 0.15s ease transform;
`;

const Label = styled.span<{
  error: boolean;
  active: boolean;
  disabled: boolean;
  icon: boolean;
  positioned: boolean;
}>`
  ${(props) => (props.positioned ? Typography.LABEL_4 : Typography.BODY_1)};
  background-color: ${Color.NEUTRAL_00};
  padding: 2px 4px;
  position: absolute;
  top: ${(props) => (props.positioned ? "-10px" : "calc(50% - 14px)")};
  left: ${(props) => (props.icon && !props.positioned ? "38px" : "10px")};
  overflow: hidden;
  z-index: ${(props) => (props.positioned ? 100 : 50)};
  color: ${(props) =>
    props.error && props.positioned
      ? Color.DANGER_700
      : props.disabled
        ? Color.NEUTRAL_400
        : props.active
          ? Color.BRAND_800
          : Color.NEUTRAL_700};
  transition:
    font-size 0.3s ease,
    top 0.3s ease,
    color 0.3s ease,
    left 0.5s ease;
`;

const Placeholder = styled.div<{ active: boolean; icon: boolean }>`
  position: absolute;
  top: calc(50% - 12px);
  left: ${(props) => (props.icon ? "38px" : "10px")};
  z-index: 40;
  color: ${Color.NEUTRAL_700};
  ${Typography.BODY_1};
  width: min-content;
  white-space: nowrap;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: ${(props) => (props.active ? "0.3s" : 0)} ease opacity;
  transition-delay: ${(props) => (props.active ? "0.15s" : 0)};
`;

const Selected = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  ${Typography.BODY_1};
  color: ${(props) => (props.disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_900)};
`;

const Error = styled.span<{ show: boolean }>`
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  z-index: 100;
  ${Typography.LABEL_4}
  color: ${Color.DANGER_700};
  overflow: hidden;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition:
    height 0.3s ease,
    opacity 0.3s ease;
`;

const TooltipContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: calc(100% + 12px);
`;
