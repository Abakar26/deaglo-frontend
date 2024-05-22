import React from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { type LineData } from "..";
import { Color } from "../../../styles";

interface Props {
  spot: LineData;
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
}

export const SimulationDivider: React.FunctionComponent<Props> = ({ spot, xScale, yScale }) => {
  const [_, end] = d3.extent(spot.map(({ date }) => date));

  return (
    <path
      d={
        d3.line()([
          [xScale(end ?? 0), 0],
          [xScale(end ?? 0), yScale.range()[0] ?? 0],
        ]) ?? undefined
      }
      stroke={Color.NEUTRAL_900}
      strokeDasharray={"3,3"}
      strokeWidth={1}
      strokeLinecap="round"
    />
  );
};
