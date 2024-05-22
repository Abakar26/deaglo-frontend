import * as d3 from "d3";
import React from "react";
import styled from "styled-components";
import { LineColor } from ".";
import { Color } from "../../../styles";

interface Props {
  date: Date;
  values: Array<{ color: LineColor; value: number }>;
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
}

export const ValueDisplay: React.FunctionComponent<Props> = ({ date, values, xScale, yScale }) => {
  const [yMin, yMax] = yScale.range() as [number, number];
  const line =
    d3.line()([
      [xScale(date), yMin],
      [xScale(date), yMax],
    ]) ?? undefined;

  return (
    <g>
      <path d={line} stroke={Color.NEUTRAL_700} />
      {values.map(({ color, value }) => (
        <circle
          cy={yScale(value)}
          cx={xScale(date)}
          fill={color.stroke}
          stroke={Color.NEUTRAL_900}
          strokeWidth={1.5}
          r={3}
        />
      ))}
    </g>
  );
};
