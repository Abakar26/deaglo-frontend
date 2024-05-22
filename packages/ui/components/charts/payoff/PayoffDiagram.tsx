import * as d3 from "d3";
import React, { useMemo } from "react";
import styled from "styled-components";
import type { PayoffLeg } from ".";
import { Graph, Line } from "..";
import { Color } from "../../../styles";
import { useExtrema, useGraphContainer, usePointGenerator } from "../hooks";
import { layeredPayoff } from "./utils";

interface Props {
  legs: Array<PayoffLeg>;
}

const NOTIONAL = 100;

export const PayoffDiagram: React.FunctionComponent<Props> = ({ legs }) => {
  const { ref, width, height } = useGraphContainer({ showXAxis: false, showYAxis: false });
  const [spotMin, spotMax] = useExtrema(
    legs.map((leg) => (leg.isCall ? 1 - leg.strike / 100 : 1 + leg.strike / 100))
  );
  const [domainMin, domainMax] = [Math.min(1, spotMin) * 0.8, Math.max(1, spotMax) * 1.2];
  const payoffPoints = usePointGenerator(width, (value) => layeredPayoff(1, value, NOTIONAL, legs));
  const payoffData = useMemo(
    () => payoffPoints(domainMin, domainMax),
    [spotMin, spotMax, payoffPoints]
  );
  const [payoffMin, payoffMax] = useExtrema(payoffData.map(([_, payoff]) => payoff));
  const codomainMax = Math.max(
    Math.abs(payoffMin),
    Math.abs(payoffMax),
    (1 - domainMin) * NOTIONAL
  );
  const codomainMin = -codomainMax; // Math.min(-codomainMax, (1 - domainMax) * NOTIONAL)

  const xScale = d3.scaleLinear().domain([domainMin, domainMax]).range([0, width]);
  const yScale = d3.scaleLinear().domain([codomainMin, codomainMax]).range([height, 0]);

  return (
    <Container ref={ref}>
      {height > 0 && width > 0 ? (
        <Graph width={width} height={height} xScale={xScale} yScale={yScale} withAxis={false}>
          <Line
            color={Color.BRAND_300}
            data={[
              { x: domainMin, y: 0 },
              { x: domainMax, y: 0 },
            ]}
            yScale={yScale}
            xScale={xScale}
          />
          <Line
            color={Color.BRAND_800}
            data={payoffData.map(([x, y]) => ({ x, y }))}
            yScale={yScale}
            xScale={xScale}
          />
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
                    { x: isCall ? 1 - barrierLevel / 100 : 1 + barrierLevel / 100, y: codomainMax },
                    { x: isCall ? 1 - barrierLevel / 100 : 1 + barrierLevel / 100, y: codomainMin },
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
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${Color.BRAND_100};
  overflow: hidden;
`;
