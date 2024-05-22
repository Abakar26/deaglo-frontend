import * as d3 from "d3";
import React, { useEffect, useRef, type PropsWithChildren } from "react";
import styled from "styled-components";
import { type GraphProps } from ".";
import { XLabel, YLabel } from "./Labels";
import { linearBuilder } from "./axisBuilders";

interface Props {
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
}

export const Graph: React.FunctionComponent<
  Props & GraphProps<number, number> & PropsWithChildren
> = ({
  xScale,
  yScale,
  height,
  width,
  direction = "vertical",
  xTickStyle,
  yTickStyle,
  xFormatter,
  yFormatter,
  xAxisLabel,
  yAxisLabel,
  withAxis = true,
  children,
}) => {
  const vertical = direction === "vertical";
  const axes = useRef<SVGGElement>(null);

  useEffect(() => {
    if (withAxis) {
      const graph = d3.select(axes.current);
      graph.selectAll("*").remove();

      linearBuilder(yScale, {
        width,
        height,
        graph,
        lined: true,
        direction,
        style: yTickStyle,
        formatter: yFormatter,
      });

      linearBuilder(xScale, {
        width,
        height,
        graph,
        lined: false,
        direction: vertical ? "horizontal" : "vertical",
        style: xTickStyle,
        formatter: xFormatter,
      });
    }
  }, [xScale, yScale, height, width, axes.current, withAxis]);

  return (
    <Container $xLabel={Boolean(xAxisLabel)} $yLabel={Boolean(yAxisLabel)}>
      <Svg width={width} height={height} transform={withAxis ? "translate(48,0)" : undefined}>
        <g width={width} height={height} ref={axes} />
        <g width={width} height={height} style={{ overflow: "hidden" }}>
          {children}
        </g>
      </Svg>
      {yAxisLabel ? <YLabel>{yAxisLabel}</YLabel> : null}
      {xAxisLabel ? <XLabel>{xAxisLabel}</XLabel> : null}
    </Container>
  );
};

const Container = styled.div<{ $yLabel: boolean; $xLabel: boolean }>`
  display: flex;
  padding-left: ${(props) => (props.$yLabel ? "16px" : 0)};
  padding-bottom: ${(props) => (props.$xLabel ? "32px" : 0)};
  position: relative;
`;

const Svg = styled.svg`
  overflow: visible;
`;
