import React, { useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { type LineData } from ".";
import { Color } from "../../../styles";
import { useExtrema } from "../hooks";
import { isSameDay } from "date-fns";
interface Props {
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  data: LineData;
  color: {
    stroke: Color;
    fill?: Color;
    dashed?: boolean;
    endCap?: boolean;
  };
}

export const ValueLine: React.FunctionComponent<Props> = ({ xScale, yScale, data, color }) => {
  const ref = useRef<SVGGElement>(null);

  const areaBuilder = d3
    .area<{ date: Date; value: number }>()
    .x(({ date }) => xScale(date))
    .y0((_) => yScale(yScale.domain()[0] ?? 0))
    .y1(({ value }) => yScale(value));

  const lineBuilder = d3
    .line<{ date: Date; value: number }>()
    .x(({ date }) => xScale(date))
    .y(({ value }) => yScale(value));

  const [path, area] = [lineBuilder(data), color.fill ? areaBuilder(data) : undefined];
  const [minDate, maxDate] = useExtrema(data.map(({ date }) => date.getTime()));
  const [minValue, maxValue] = [
    data.find(({ date }) => isSameDay(date, new Date(minDate)))?.value,
    data.find(({ date }) => isSameDay(date, new Date(maxDate)))?.value,
  ];

  return (
    <G ref={ref}>
      <path d={area ?? undefined} fill={color.fill ?? "none"} fillOpacity={1} />
      <path
        d={path ?? undefined}
        stroke={area ? Color.NEUTRAL_00 : color.stroke}
        fill={"none"}
        strokeWidth={1.5}
        strokeOpacity={1}
        fillOpacity={0}
        strokeDasharray={color.dashed ? "2 4" : undefined}
      />
      {color.endCap && (
        <>
          <rect
            width={8}
            height={8}
            fill={Color.NEUTRAL_00}
            stroke={color.stroke}
            strokeWidth={1.5}
            rx={4}
            ry={4}
            transform={`translate(${xScale(minDate)},${yScale(minValue ?? 0) - 4})`}
          />
          <rect
            width={8}
            height={8}
            fill={Color.NEUTRAL_00}
            stroke={color.stroke}
            strokeWidth={1.5}
            rx={4}
            ry={4}
            transform={`translate(${xScale(maxDate)},${yScale(maxValue ?? 0) - 4})`}
          />
        </>
      )}
    </G>
  );
};

const G = styled.g`
  cursor: crosshair;
  &:hover {
    z-index: 1000000;
  }
`;
