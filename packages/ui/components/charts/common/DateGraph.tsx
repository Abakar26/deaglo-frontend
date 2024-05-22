import React, { type PropsWithChildren, useEffect, useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { format } from "date-fns";
import { type GraphProps } from ".";
import { linearBuilder, timeBuilder } from "./axisBuilders";

interface Props {
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
}

export const DateGraph: React.FunctionComponent<
  GraphProps<Date, number> & Props & PropsWithChildren
> = ({
  xScale,
  yScale,
  height,
  width,
  xTickStyle,
  yTickStyle,
  xFormatter,
  yFormatter,
  direction = "vertical",
  children,
}) => {
  const axes = useRef<SVGGElement>(null);
  useEffect(() => {
    const vertical = direction === "vertical";
    const graph = d3.select(axes.current);
    graph.selectAll("*").remove();

    const formatter = (value: Date) => format(value, "EEE");

    linearBuilder(yScale, {
      width,
      height,
      graph,
      lined: true,
      direction,
      formatter: yFormatter,
      style: yTickStyle,
    });

    timeBuilder(xScale, {
      width,
      height,
      graph,
      formatter: xFormatter ?? formatter,
      direction: vertical ? "horizontal" : "vertical",
      style: xTickStyle,
    });
  }, [xScale, yScale, height, width, axes.current]);
  return (
    <Svg width={width} height={height} transform="translate(28,0)">
      <g width={width} height={height} ref={axes} />
      <g width={width} height={height}>
        {children}
      </g>
    </Svg>
  );
};

const Svg = styled.svg`
  overflow: visible;
  padding-left: 8px;
`;
