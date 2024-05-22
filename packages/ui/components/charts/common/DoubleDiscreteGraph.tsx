import React, { type PropsWithChildren, useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { bandBuilder, linearBuilder } from "./axisBuilders";
import { type GraphProps } from ".";

interface Props {
  xScale: d3.ScaleBand<string>;
  yScale: d3.ScaleBand<string>;
}

export const DoubleDiscreteGraph: React.FunctionComponent<
  Props & GraphProps & PropsWithChildren
> = ({
  xScale,
  yScale,
  height,
  width,
  xTickStyle,
  yTickStyle,
  xFormatter,
  yFormatter,
  children,
}) => {
  const axes = useRef<SVGGElement>(null);

  useEffect(() => {
    const graph = d3.select(axes.current);
    graph.selectAll("*").remove();

    bandBuilder(yScale, {
      width,
      height,
      graph,
      lined: false,
      direction: "vertical",
      style: yTickStyle,
      unticked: true,
      formatter: yFormatter,
    });

    bandBuilder(xScale, {
      width,
      height,
      graph,
      lined: false,
      direction: "horizontal",
      style: xTickStyle,
      formatter: xFormatter,
    });
  }, [xScale, yScale, height, width, axes.current]);

  return (
    <Svg width={width} height={height}>
      <g width={width} height={height} ref={axes} />
      <g width={width} height={height}>
        {children}
      </g>
    </Svg>
  );
};

const Svg = styled.svg`
  overflow: visible;
`;
