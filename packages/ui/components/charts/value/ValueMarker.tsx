import * as d3 from "d3";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import type { LineColor } from ".";
import { Color } from "../../../styles";

interface Props {
  id: string;
  value: number;
  color: LineColor;
  label: React.ReactNode;
  onChange?: (value: number) => void;
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  draggable?: boolean;
  onDragStart: (legId: string) => void;
}

export const ValueMarker: React.FunctionComponent<Props> = ({
  id,
  value,
  color,
  label,
  onChange,
  xScale,
  yScale,
  onDragStart,
  draggable = true,
}) => {
  // Marker line
  const width = useMemo(() => Math.max(...xScale.range()), [xScale]);
  const height = useMemo(() => Math.max(...yScale.range()), [yScale]);
  const line = useMemo(
    () =>
      d3.line()([
        [0, Math.max(Math.min(yScale(value), height), 0)],
        [width, Math.max(Math.min(yScale(value), height), 0)],
      ]) ?? undefined,
    [value, width, height, yScale]
  );

  // Dragging
  const [dragging, setDragging] = useState<boolean>(false);
  const dragValueRef = useRef(value);

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (!draggable || !onChange) return;
      const newY = yScale.invert(yScale(dragValueRef.current) + e.movementY);
      dragValueRef.current = newY;
      onChange(newY);
    },
    [draggable, onChange, yScale]
  );

  const handleMouseDown = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    if (!draggable) return;

    if (draggable && onDragStart) {
      onDragStart(id);
    }

    e.preventDefault();
    setDragging(true);
    dragValueRef.current = value;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(false);
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    if (dragging) {
      window.addEventListener("mousemove", handleDrag);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleDrag]);

  return (
    <G
      width={width}
      height={48}
      dragging={dragging}
      draggable={!!onChange && draggable}
      onMouseDown={draggable ? handleMouseDown : undefined}
    >
      <foreignObject
        x={12}
        y={Math.max(0, Math.min(yScale(value), height)) - 24}
        width="100%"
        height="24px"
      >
        {label}
      </foreignObject>
      <Path
        d={line}
        stroke={color.stroke}
        strokeDasharray={color.dashed ? "3,3" : undefined}
        strokeWidth={2}
      />

      {draggable && (
        <path
          transform={`translate(0,${Math.max(0, Math.min(yScale(value), height)) - 6})`}
          d="M0 12C0.787931 12 1.56815 11.8448 2.2961 11.5433C3.02405 11.2417 3.68549 10.7998 4.24264 10.2426C4.79979 9.68549 5.24175 9.02405 5.54328 8.2961C5.84481 7.56815 6 6.78793 6 6C6 5.21207 5.84481 4.43185 5.54328 3.7039C5.24175 2.97595 4.79979 2.31451 4.24264 1.75736C3.68549 1.20021 3.02405 0.758251 2.2961 0.456723C1.56815 0.155194 0.787931 -6.88831e-08 -4.76837e-07 0L0 6V12Z"
          fill={color.dashed ? Color.NEUTRAL_00 : color.stroke}
          stroke={color.stroke}
          strokeWidth={2}
        />
      )}
    </G>
  );
};

const G = styled.g<{ draggable: boolean; dragging: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: ${(props) => (!props.draggable ? "default" : props.dragging ? "grabbing" : "grab")};
`;

const Path = styled.path``;
