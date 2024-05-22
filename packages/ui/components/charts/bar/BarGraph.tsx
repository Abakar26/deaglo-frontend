import React from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { useExtrema, useGraphContainer } from "../hooks";
import { DiscreteGraph, Legend, type LegendItem } from "..";
import { Bar } from "./Bar";
import { Color, Typography } from "../../../styles";

export interface BarSection {
  value: number;
  stroke: Color;
  fill: Color;
}

export interface Bar {
  name: string;
  threshold?: number;
  sections: Array<BarSection>;
}

interface BarGraphOptions {
  label?: string;
  legend?: boolean;
  min?: number;
  max?: number;
  yFormatter?: (value: number) => string;
}

interface Props {
  data: Array<Bar>;
  direction?: "horizontal" | "vertical";
  options?: BarGraphOptions;
}

export const BarGraph: React.FunctionComponent<Props> = ({
  data,
  direction = "vertical",
  options = {},
}) => {
  const vertical = direction === "vertical";
  const withLabels = Boolean(options.label);

  const { ref, width, height } = useGraphContainer({
    showXAxis: vertical,
    showYAxis: vertical,
    withYLabel: vertical && withLabels,
  });

  const [dataMin, dataMax] = useExtrema(
    data.map(({ sections, threshold }) => {
      const accumulated = sections.reduce((a, b) => a + b.value, 0);
      return Math.max(accumulated, threshold ?? 0) * 1.1;
    })
  );

  const [min, max] = [options.min ?? dataMin, options.max ?? dataMax];

  const yScale = d3
    .scaleLinear()
    .domain([Math.min(0, min), max])
    .range(vertical ? [height, 0] : [0, width]);
  // .nice();

  const xScale = d3
    .scaleBand()
    .domain(data.map((bar) => bar.name))
    .range(vertical ? [0, width] : [0, height])
    .padding(0.25);

  const zeroLine =
    d3.line()([
      [yScale(0), 0],
      [yScale(0), vertical ? width : height],
    ]) ?? undefined;

  const dataToLegend = data.reduce<LegendItem[]>((items, bar) => {
    const sections = bar.sections.map((section, index) => ({
      name: `${bar.name} ${index + 1}`,
      color: section.fill,
      filled: true,
    }));
    return [...items, ...sections];
  }, []);

  const hasThreshold = data.some((bar) => bar.threshold !== undefined);
  const thresholdLegend = { name: "Threshold", color: Color.DANGER_400, filled: true };
  const legendItems = hasThreshold ? [...dataToLegend, thresholdLegend] : dataToLegend;

  function thresholdToBarSection(threshold: number) {
    const barHeight = (max - Math.min(0, min)) * 0.02;
    const buffer = { value: threshold, stroke: "transparent", fill: "transparent" };
    const bar = { value: barHeight, stroke: Color.DANGER_400, fill: Color.DANGER_400 };
    return [buffer, bar] as BarSection[];
  }

  return (
    <Container>
      {options.legend ? <Legend items={legendItems} /> : null}
      <GraphContainer ref={ref}>
        <DiscreteGraph
          height={height}
          width={width}
          direction={direction}
          yScale={yScale}
          xScale={xScale}
          xTickStyle={`${Typography.LABEL_3.toString()} color: ${Color.NEUTRAL_900}`}
          yFormatter={options.yFormatter}
          withLabels={Boolean(options.label)}
          xAxisLabel={direction === "horizontal" ? options.label : undefined}
          yAxisLabel={direction === "vertical" ? options.label : undefined}
        >
          {height &&
            width &&
            data.map(({ name, sections, threshold }) => (
              <g
                key={name}
                transform={
                  vertical ? `translate(${xScale(name)},0)` : `translate(0,${xScale(name)})`
                }
                height={height}
              >
                <Bar
                  data={sections}
                  yScale={yScale}
                  width={xScale.bandwidth()}
                  direction={direction}
                />
                {threshold ? (
                  <Bar
                    data={thresholdToBarSection(threshold)}
                    yScale={yScale}
                    width={xScale.bandwidth()}
                    direction={direction}
                  />
                ) : null}
              </g>
            ))}
          {min < 0 && (
            <path d={zeroLine} stroke={Color.NEUTRAL_900} strokeWidth={1.5} fill="none" />
          )}
        </DiscreteGraph>
      </GraphContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
`;
