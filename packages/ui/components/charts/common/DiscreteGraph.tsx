import React, { type PropsWithChildren, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { linearBuilder, bandBuilder } from "./axisBuilders";
import { XLabel, YLabel } from "./Labels";
import { type GraphProps } from ".";

interface Props {
  xScale: d3.ScaleBand<string>;
  yScale: d3.ScaleLinear<number, number, never>;
  onBrush?: (start: [number, number], stop: [number, number]) => void;
}

export const DiscreteGraph: React.FunctionComponent<
  Props & GraphProps<string, number> & PropsWithChildren
> = ({
  xScale,
  yScale,
  height,
  width,
  direction = "vertical",
  xTickStyle,
  yTickStyle,
  yFormatter,
  xFormatter,
  onBrush,
  yAxisLabel,
  xAxisLabel,
  withLabels,
  children,
}) => {
  const vertical = direction === "vertical";
  const axes = useRef<SVGGElement>(null);
  const brush = useRef<SVGElement>(null);

  const [viewBox, setViewBox] = useState<string>();

  const onBrushed = (e: d3.D3BrushEvent<any>) => {
    if (e.selection) {
      const [start, stop] = e.selection;
      if (typeof start !== "number" && typeof stop !== "number") {
        onBrush?.(start, stop);
      }
    }
  };

  useEffect(() => {
    const brushLayer = d3.select(brush.current);
    const graph = d3.select(axes.current);
    brushLayer.selectAll("#brush").remove();
    graph.selectAll("*").remove();
    brushLayer
      .append("g")
      .attr("class", "brush")
      .attr("id", "brush")
      .call(
        d3
          .brush()
          .on("start", () => brushLayer.raise())
          .on("end", (e) => {
            onBrushed(e);
            brushLayer.lower();
            d3.selectAll("#brush.brush").remove();
          })
      );

    linearBuilder(yScale, {
      width,
      height,
      graph,
      lined: true,
      direction,
      style: yTickStyle,
      formatter: yFormatter,
    });

    bandBuilder(xScale, {
      width,
      height,
      graph,
      direction: vertical ? "horizontal" : "vertical",
      style: xTickStyle,
      formatter: xFormatter,
    });
  }, [xScale, yScale, height, width, axes.current]);

  // TODO: Might be useful to other types of charts
  useEffect(() => {
    if (axes.current === null) return;
    if (width === 0 || height === 0) return;

    const rso = new ResizeObserver(([entry]) => {
      if (entry) {
        const bBox = axes.current!.getBBox();
        const viewBoxWidth = bBox.width > width ? bBox.width : width;
        const viewBoxHeight = bBox.height > height ? bBox.height : height;

        // Needs additional logic to prevent shrinking charts that fit the dimensions
        if (direction === "horizontal") {
          setViewBox(`${bBox.x} ${bBox.y} ${viewBoxWidth} ${viewBoxHeight}`);
        } else {
          setViewBox(`${bBox.x} ${bBox.y} ${width} ${height}`);
        }
      }
    });

    rso.observe(axes.current);

    return () => {
      rso.disconnect();
    };
  }, [direction, height, width]);

  return (
    <Container xLabel={!!xAxisLabel} yLabel={!!yAxisLabel}>
      <Svg width={width} height={height} viewBox={viewBox}>
        <g width={width} height={height} ref={axes} />
        {onBrush && <g width={width} height={height} ref={brush} />}
        <g width={width} height={height}>
          {children}
        </g>
      </Svg>
      {withLabels && <YLabel>{yAxisLabel}</YLabel>}
      {withLabels && <XLabel>{xAxisLabel}</XLabel>}
    </Container>
  );
};

const Container = styled.div<{ yLabel: boolean; xLabel: boolean }>`
  display: flex;
  padding-left: ${(props) => (props.yLabel ? "20px" : 0)};
  padding-bottom: ${(props) => (props.xLabel ? "32px" : 0)};
  position: relative;
`;

const Svg = styled.svg`
  overflow: visible;
`;
