import React, { useState, type PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { Icon } from "..";
import { Color } from "../../styles";

interface Props {
  disabled?: boolean;
  dataTransfer?: string;
  onDrag?: (x: number, y: number) => void;
  onDrop?: (x: number, y: number) => void;
}

export const Draggable: React.FunctionComponent<Props & PropsWithChildren> = ({
  disabled,
  dataTransfer,
  onDrag,
  onDrop,
  children,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const drag = (e: React.DragEvent<HTMLDivElement>) => {
    onDrag?.(e.clientX, e.clientY);
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dataTransfer && e.dataTransfer.setData("text", dataTransfer);
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    onDrop?.(e.clientX, e.clientY);
  };

  return (
    <Container
      active={isDragging}
      disabled={disabled}
      draggable={!disabled && isDragging}
      onDragEnd={drop}
      onDrag={drag}
      onDragStart={dragStart}
    >
      <DragSection
        disabled={disabled}
        active={isDragging}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
      >
        <Icon
          name="drag-and-drop"
          color={disabled ? Color.NEUTRAL_400 : isDragging ? Color.BRAND_800 : Color.NEUTRAL_700}
        />
      </DragSection>
      {children}
    </Container>
  );
};

const Container = styled.div<{ active: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  border: 1px solid transparent;
  ${(props) =>
    props.active &&
    css`
      border-color: ${Color.BRAND_800};
    `}
  border-radius: 4px;
  flex-wrap: nowrap;
  height: min-content;
  width: min-content;
  background-color: ${Color.NEUTRAL_00};
  transition: 0.15s ease border-color;
`;

const DragSection = styled.button<{ active: boolean }>`
  cursor: ${(props) => (props.disabled ? "unset" : props.active ? "grabbing" : "grab")};
  background-color: transparent;
  border: none;
  outline: none;
`;
