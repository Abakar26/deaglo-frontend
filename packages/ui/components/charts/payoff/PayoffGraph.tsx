import * as d3 from "d3";
import React, { useMemo } from "react";
import styled from "styled-components";
import type { PayoffLeg } from ".";
import { Graph, Legend, Line, type LinearGraphOptions } from "..";
import { Color } from "../../../styles";
import { useExtrema, useGraphContainer, usePointGenerator } from "../hooks";
import { layeredPayoff } from "./utils";

type ExposureDirection = "bought" | "sold";

interface Props {
  direction?: ExposureDirection;
  notional: number;
  spot: number;
  legs: Array<PayoffLeg>;
  options?: LinearGraphOptions & PayoffGraphOptions;
}

interface PayoffGraphOptions {
  xFormatter?: (value: number) => string;
  yFormatter?: (value: number) => string;
}

export const PayoffGraph: React.FunctionComponent<Props> = ({
  direction = "bought",
  notional,
  spot,
  legs,
  options = {},
}) => {
  const { ref, width, height } = useGraphContainer({ withYLabel: Boolean(options.yAxis?.label) });
  const [spotMin, spotMax] = useExtrema(
    legs.map((leg) => (leg.isCall ? 1 - leg.strike / 100 : 1 + leg.strike / 100) * spot)
  );
  const [domainMin, domainMax] = [Math.min(spot, spotMin) * 0.8, Math.max(spot, spotMax) * 1.2];
  const payoffPoints = usePointGenerator(width, (value) =>
    layeredPayoff(spot, value, notional, legs)
  );
  const payoffData = useMemo(
    () => payoffPoints(domainMin, domainMax),
    [spotMin, spotMax, payoffPoints]
  );
  const [payoffMin, payoffMax] = useExtrema(payoffData.map(([_, payoff]) => payoff));
  const codomainMax = Math.max(
    Math.abs(payoffMin),
    Math.abs(payoffMax),
    (spot - domainMin) * notional
  );
  const codomainMin = Math.min(-codomainMax, (spot - domainMax) * notional);

  const exposure =
    direction === "bought"
      ? [
          { x: domainMin, y: (spot - domainMin) * notional },
          { x: domainMax, y: (spot - domainMax) * notional },
        ]
      : [
          { x: domainMin, y: (spot - domainMax) * notional },
          { x: domainMax, y: (spot - domainMin) * notional },
        ];

  const xScale = d3.scaleLinear().domain([domainMin, domainMax]).range([0, width]);
  const yScale = d3.scaleLinear().domain([codomainMin, codomainMax]).range([height, 0]);

  return (
    <Container ref={ref}>
      {!options.hideLegend ? (
        <Legend
          items={[
            {
              name: "Payoff",
              color: Color.PURPLE_700,
            },
            {
              name: "Exposure",
              color: Color.NEUTRAL_700,
              dashed: true,
            },
          ]}
        />
      ) : null}
      {height > 0 && width > 0 ? (
        <Graph
          width={width}
          height={height}
          xScale={xScale}
          yScale={yScale}
          xAxisLabel={options.xAxis?.label}
          yAxisLabel={options.yAxis?.label}
          xFormatter={options.xFormatter}
          yFormatter={options.yFormatter}
        >
          <Line
            color={Color.NEUTRAL_400}
            data={[
              { x: spot, y: codomainMax },
              { x: spot, y: codomainMin },
            ]}
            strokeWidth={1}
            yScale={yScale}
            xScale={xScale}
          />
          <Line
            color={Color.NEUTRAL_400}
            data={[
              { x: domainMin, y: 0 },
              { x: domainMax, y: 0 },
            ]}
            strokeWidth={1}
            yScale={yScale}
            xScale={xScale}
          />
          <Line
            color={Color.PURPLE_700}
            data={payoffData.map(([x, y]) => ({ x, y }))}
            yScale={yScale}
            xScale={xScale}
          />
          <Line color={Color.NEUTRAL_700} data={exposure} dashed yScale={yScale} xScale={xScale} />
          {legs.map(
            ({ isCall, barrierLevel, barrierType }, index) =>
              barrierType &&
              barrierLevel && (
                <Line
                  key={index}
                  color={
                    barrierType === "down-in" || barrierType === "up-in"
                      ? Color.SUCCESS_700
                      : Color.DANGER_700
                  }
                  data={[
                    {
                      x: (isCall ? 1 - barrierLevel / 100 : 1 + barrierLevel / 100) * spot,
                      y: codomainMax,
                    },
                    {
                      x: (isCall ? 1 - barrierLevel / 100 : 1 + barrierLevel / 100) * spot,
                      y: codomainMin,
                    },
                  ]}
                  dashed
                  yScale={yScale}
                  xScale={xScale}
                />
              )
          )}
        </Graph>
      ) : null}
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
