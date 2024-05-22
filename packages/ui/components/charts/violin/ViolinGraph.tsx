import * as d3 from "d3";
import React, { useState } from "react";
import styled from "styled-components";
import { ChartTooltip, type ViolinColor } from "../..";
import { Color } from "../../../styles";
import { DiscreteGraph } from "../common";
import { useExtrema } from "../hooks";
import { useGraphContainer } from "../hooks/useGraphContainer";
import { useGraphTooltip } from "../hooks/useGraphTooltip";
import { Violin } from "./Violin";

export interface ViolinData {
  id: string;
  color: ViolinColor;
  name: string;
  data: Array<number>;
}

interface Props {
  data: Array<ViolinData>;
  withInteraction?: boolean;
  withLabels?: boolean;
  options?: ViolinGraphOptions;
}

interface ViolinGraphOptions {
  xFormatter?: (value: string) => string;
  yFormatter?: (value: number) => string;
}

export const ViolinGraph: React.FunctionComponent<Props> = ({
  data,
  options = {},
  withInteraction = true,
  withLabels = true,
}) => {
  const [hovered, setHovered] = useState<string>();
  const { width, height, ref } = useGraphContainer();
  const tooltip = useGraphTooltip();

  const [min, max] = useExtrema(data.map(({ data }) => data).flat());

  const [yDomain, setYDomain] = useState<[number, number]>([min, max]);
  const [xDomain, setXDomain] = useState<Array<string>>(data.map(({ name }) => name));

  const yScale = d3.scaleLinear().domain(yDomain).range([height, 0]);

  const xScale = d3.scaleBand().domain(xDomain).range([0, width]).padding(0.25);

  const onBrush = (start: [number, number], stop: [number, number]) => {
    const [startX, startY] = start;
    const [stopX, stopY] = stop;
    setYDomain([yScale.invert(stopY), yScale.invert(startY)]);
    const bandWidth = xScale.bandwidth();
    const _xDomain = xScale
      .domain()
      .filter(
        (name) =>
          (xScale(name) ?? 0) + bandWidth / 2 < stopX &&
          (xScale(name) ?? 0) + bandWidth / 2 > startX
      );
    _xDomain.length && setXDomain(_xDomain);
  };

  const resetDomains = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setYDomain([min, max]);
    setXDomain(data.map(({ name }) => name));
  };

  return (
    <Container ref={ref} onDoubleClick={resetDomains}>
      <DiscreteGraph
        width={width}
        height={height}
        yScale={yScale}
        xScale={xScale}
        onBrush={onBrush}
        withLabels={withLabels}
        xFormatter={options.xFormatter}
        yFormatter={options.yFormatter}
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
        {data.map(({ name, data, color, id }) => {
          return xDomain.includes(name) ? (
            <g
              key={id}
              transform={`translate(${xScale(name)},0)`}
              height={height}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => {
                setHovered(undefined);
                tooltip.setPosition(undefined);
              }}
            >
              <Violin
                name={name}
                data={data}
                color={color}
                id={id}
                yScale={yScale}
                width={xScale.bandwidth()}
                binCount={height / 8}
                tooltip={tooltip}
                withInteraction={withInteraction}
                fadeout={withInteraction && !!hovered && hovered !== id}
                height={height}
                domain={yDomain}
              />
            </g>
          ) : null;
        })}
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
