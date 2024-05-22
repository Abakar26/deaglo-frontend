import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { useExtrema, useGraphContainer } from "../hooks";
import { Color, Typography } from "../../../styles";
import { DiscreteGraph } from "..";

interface Props {
  rates: [number, number, number];
}

const RATE_DAYS = ["Day 0", "Day 365", "Day 730"];

export const FWDRatesGraph: React.FunctionComponent<Props> = ({ rates }) => {
  const { ref, width, height } = useGraphContainer();

  const [valueMin, valueMax] = useExtrema(rates);

  const yScale = d3.scaleLinear().domain([valueMin, valueMax]).range([height, 0]).nice();
  const xScale = d3.scaleBand().domain(RATE_DAYS).range([0, width]).padding(-0.4);

  const lineBuilder = d3
    .line<number>()
    .x((_, index) => (xScale(RATE_DAYS.at(index) ?? "Day 0") ?? 0) + width / 4)
    .y((d) => yScale(d));

  const ratePath = lineBuilder(rates) ?? undefined;

  return (
    <Container>
      <Row>
        <Line />
        <Label>FWD</Label>
      </Row>
      <GraphContainer ref={ref}>
        {height && width && (
          <DiscreteGraph
            width={width}
            height={height}
            xScale={xScale}
            yScale={yScale}
            xTickStyle={`${Typography.LABEL_5} color: ${Color.NEUTRAL_700}`}
          >
            <path
              d={ratePath}
              stroke={Color.BRAND_800}
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
            />
          </DiscreteGraph>
        )}
      </GraphContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${Color.NEUTRAL_100};
  border-radius: 4px;
  padding: 8px;
  gap: 12px;
  display: flex;
  flex-direction: column;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 4px;
`;

const Label = styled.span`
  ${Typography.LABEL_5};
  color: ${Color.NEUTRAL_900};
`;

const Line = styled.div`
  height: 2px;
  width: 8px;
  background-color: ${Color.BRAND_900};
`;
