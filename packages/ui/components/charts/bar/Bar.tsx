import React from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { type Color } from "../../../styles";
import { type BarSection } from ".";

interface Props {
  data: Array<BarSection>;
  width: number;
  yScale: d3.ScaleLinear<number, number, never>;
  direction: "vertical" | "horizontal";
}

interface DataReduction {
  total: number;
  paths: Array<{ stroke: Color; fill: Color; path: string | undefined }>;
}

export const Bar: React.FunctionComponent<Props> = ({ data, width, yScale, direction }) => {
  const verticalAreaBuilder = d3
    .area<number>()
    .x0(width)
    .x1(0)
    .y0((y) => yScale(y))
    .y1((y) => yScale(y));

  const horizontalAreaBuilder = d3
    .area<number>()
    .y0(width)
    .y1(0)
    .x0((y) => yScale(y))
    .x1((y) => yScale(y));

  const areaBuilder = direction == "vertical" ? verticalAreaBuilder : horizontalAreaBuilder;

  const { paths } = data.reduce(
    ({ total, paths }: DataReduction, { value, stroke, fill }) => {
      return {
        total: total + value,
        paths: [
          ...paths,
          {
            stroke,
            fill,
            path: areaBuilder([total, value + total]) ?? undefined,
          },
        ],
      };
    },
    { total: 0, paths: [] }
  );

  return (
    <G>
      {paths.map(({ path, stroke, fill }, index) => (
        <path
          key={`${index}:${path}:${fill}`}
          d={path}
          fill={fill}
          stroke={stroke}
          strokeWidth={1.5}
        />
      ))}
    </G>
  );
};

const G = styled.g`
  cursor: crosshair;
`;
