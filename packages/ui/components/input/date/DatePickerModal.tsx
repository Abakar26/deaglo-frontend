import { type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { useClickOutside } from "../../../components";
import { Color, Shadow } from "../../../styles";

type DatePickerModalProps = {
  anchor: React.RefObject<HTMLElement>;
  portal?: boolean;
  onCancel: () => void;
};

export function DatePickerModal({
  anchor,
  children,
  portal,
  onCancel,
}: PropsWithChildren<DatePickerModalProps>) {
  const ref = useClickOutside(onCancel);

  const ModalWrapper = (
    <Container $anchor={anchor.current} $portal={portal} aria-modal="true" ref={ref} role="dialog">
      {children}
    </Container>
  );

  return portal ? createPortal(ModalWrapper, document.body) : ModalWrapper;
}

function getPosition(node: HTMLElement | null, portal: boolean | undefined) {
  if (node === null) return;

  // TODO: Get computed dimensions
  const CONTAINER_WIDTH = 346;
  const CONTAINER_HEIGHT = 426;

  const rect = node.getBoundingClientRect();
  const anchorBottom = rect.top < CONTAINER_HEIGHT;
  const anchorLeft = document.body.clientWidth - rect.left > CONTAINER_WIDTH;

  const left = `${portal ? rect.left : 0}px`;
  const right = `${portal ? document.body.clientWidth - rect.right : 0}px`;
  const top = `${portal ? rect.top : 0}px`;
  const translateY = `${anchorBottom ? `calc(${rect.height}px + 4px)` : `calc(-100% - 4px)`}`;

  return css`
    position: absolute;
    left: ${anchorLeft ? left : undefined};
    right: ${anchorLeft ? undefined : right};
    top: ${top};
    transform: translateY(${translateY});
  `;
}

const Container = styled.div<{ $anchor: HTMLElement | null; $portal: boolean | undefined }>`
  border-radius: 4px;
  ${Shadow.CARD};
  border: 1px solid ${Color.NEUTRAL_400};
  z-index: 10000000;
  padding: 20px;
  background-color: ${Color.NEUTRAL_00};

  ${(props) => getPosition(props.$anchor, props.$portal)}
`;
