import React, { useMemo, useState } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { DiscreteGraph, Graph } from "../common";
import { useGraphContainer } from "../hooks/useGraphContainer";
import { useExtrema } from "../hooks";
import { Density } from "./Density";
import { Color } from "../../../styles";
import { useGraphTooltip } from "../hooks/useGraphTooltip";
import { v4 as uuid } from "uuid";
import { ChartTooltip } from "../..";
export interface DensityData {
  name: string;
  data: Array<number>;
}

interface Props {
  selected: string;
  left: DensityData;
  right: Array<DensityData>;
  withInteraction?: boolean;
  withLabels?: boolean;
}

export const DualDensityGraph: React.FunctionComponent<Props> = ({
  left,
  right,
  selected,
  withInteraction = true,
  withLabels = true,
}) => {
  const { width, height, ref } = useGraphContainer();
  const [hovered, setHovered] = useState<string>();
  const [min, max] = useExtrema([...left.data, ...right.flatMap((density) => density.data)]);
  const tooltip = useGraphTooltip();

  const [yDomain, setYDomain] = useState<[number, number]>([min, max]);

  const yScale = d3.scaleLinear().domain(yDomain).range([height, 0]).nice();

  const xScale = d3.scaleBand().range([0, width]).domain([left.name, selected]).padding(0);

  const xAxisScale = d3
    .scaleBand()
    .range([width / 4, (3 * width) / 4])
    .domain([left.name, selected])
    .padding(0);

  const binBuilder = d3
    .bin()
    .domain(yDomain)
    .thresholds(yScale.ticks(height / 8))
    .value((d) => d);

  const leftMax = Math.max(...binBuilder(left.data).map((bin) => bin.length));
  const rightMax = Math.max(
    ...right.map((density) => Math.max(...binBuilder(density.data).map((bin) => bin.length)))
  );

  const densityScale = d3
    .scaleLinear()
    .domain([0, Math.max(rightMax, leftMax)])
    .range([0, xScale.bandwidth()]);

  const onBrush = (start: [number, number], stop: [number, number]) => {
    const [_, startY] = start;
    const [__, stopY] = stop;
    setYDomain([yScale.invert(stopY), yScale.invert(startY)]);
  };

  const resetDomains = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setYDomain([min, max]);
  };

  return (
    <Container ref={ref} onDoubleClick={resetDomains}>
      <DiscreteGraph
        xScale={xAxisScale}
        yScale={yScale}
        width={width}
        height={height}
        onBrush={onBrush}
        withLabels={withLabels}
      >
        {tooltip.position && withInteraction && (
          <path
            d={
              d3.line()([
                [0, tooltip.position.y],
                [width, tooltip.position.y],
              ]) ?? undefined
            }
            stroke={Color.NEUTRAL_500}
            strokeWidth={1}
          />
        )}
        <g
          transform={`translate(${xScale(left.name)},0)`}
          height={height}
          onMouseEnter={() => setHovered(left.name)}
          onMouseLeave={() => {
            setHovered(undefined);
            tooltip.setPosition(undefined);
          }}
        >
          <Density
            id={uuid()}
            index={0}
            tooltip={tooltip}
            name={left.name}
            data={left.data}
            binCount={height / 8}
            width={xScale.bandwidth()}
            height={height}
            yScale={yScale}
            xScale={densityScale}
            side="left"
            fadeout={withInteraction && !!hovered && hovered !== left.name}
            domain={yDomain}
            withInteraction={withInteraction}
          />
        </g>
        {right
          .sort(({ name }) => (name === selected ? 1 : -1))
          .map((density, index) => (
            <g
              height={height}
              transform={`translate(${xScale(selected)},0)`}
              onMouseEnter={() => setHovered(density.name)}
              onMouseLeave={() => {
                setHovered(undefined);
                tooltip.setPosition(undefined);
              }}
            >
              <Density
                id={uuid()}
                tooltip={tooltip}
                name={density.name}
                key={index}
                index={right.length - index - 1}
                data={density.data}
                binCount={height / 8}
                width={xScale.bandwidth()}
                height={height}
                yScale={yScale}
                xScale={densityScale}
                side="right"
                fadeout={withInteraction && !!hovered && hovered !== density.name}
                domain={yDomain}
                withInteraction={withInteraction}
              />
            </g>
          ))}
        <path
          d={
            d3.line()([
              [xScale.bandwidth(), yScale(yDomain.at(0) ?? 0)],
              [xScale.bandwidth(), yScale(yDomain.at(1) ?? 0)],
            ]) ?? undefined
          }
          stroke={Color.NEUTRAL_900}
          strokeWidth={1}
          strokeLinecap="round"
        />
      </DiscreteGraph>
      {withInteraction && <ChartTooltip {...tooltip} />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
