import React from "react";
import * as d3 from "d3";
import { useExtrema } from "../hooks";
import { Color } from "../../../styles";

interface Props {
  data: Array<number>;
}

export const TickerGraph: React.FunctionComponent<Props> = ({ data }) => {
  const width = 60;
  const height = 20;

  const [min, max] = useExtrema(data);

  const yScale = d3.scaleLinear().domain([min, max]).range([height, 0]).nice();

  const xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);

  const areaBuilder = d3
    .area<number>()
    .x((_, index) => xScale(index))
    .y0((_) => yScale(min))
    .y1((y) => yScale(y));

  const lineBuilder = d3
    .line<number>()
    .x((_, index) => xScale(index))
    .y((y) => yScale(y));

  const path = lineBuilder(data);
  const area = areaBuilder(data);

  const positive = (data[0] ?? 0) < (data[data.length - 1] ?? 0);

  return (
    <svg width={width - 2} height={height}>
      <path d={area ?? undefined} fill={positive ? Color.SUCCESS_100 : Color.DANGER_100} />
      <path
        d={path ?? undefined}
        stroke={positive ? Color.SUCCESS_700 : Color.DANGER_700}
        strokeWidth={1.5}
        fill={"none"}
      />
    </svg>
  );
};
