import React, { useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { type PointData } from ".";
import { type Color } from "../../../styles";

interface Props {
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  data: PointData[];
  color: Color;
  dashed?: boolean;
  strokeWidth?: number;
}

export const Line: React.FunctionComponent<Props> = ({
  xScale,
  yScale,
  data,
  color,
  dashed,
  strokeWidth = 1.5,
}) => {
  const ref = useRef<SVGGElement>(null);

  const lineBuilder = d3
    .line<PointData>()
    .x((data) => xScale(data.x))
    .y((data) => yScale(data.y));

  const path = lineBuilder(data) ?? undefined;

  return (
    <G ref={ref}>
      <path
        d={path}
        stroke={color}
        fill={"none"}
        strokeWidth={strokeWidth}
        strokeOpacity={1}
        fillOpacity={0}
        strokeDasharray={dashed ? "3 3" : undefined}
      />
    </G>
  );
};

const G = styled.g`
  cursor: crosshair;
  &:hover {
    z-index: 1000000;
  }
`;
