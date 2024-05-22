import * as d3 from "d3";
import React from "react";
import styled from "styled-components";
import { type LineData } from "..";
import { type Color } from "../../../styles";

interface Props {
  data: LineData;
  color: Color;
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
}

export const SimulationPath: React.FunctionComponent<Props> = ({ data, color, xScale, yScale }) => {
  const lineBuilder = d3
    .line<{ date: Date; value: number }>()
    .x(({ date }) => xScale(date))
    .y(({ value }) => yScale(value));

  const path = lineBuilder(data);

  return <Path d={path ?? undefined} stroke={color} strokeWidth={1.5} fill="none" />;
};

const Path = styled.path`
  cursor: crosshair;
`;
