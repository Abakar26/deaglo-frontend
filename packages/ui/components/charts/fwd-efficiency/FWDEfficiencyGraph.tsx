import React from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { useGraphContainer } from "../hooks";
import { Graph } from "..";
import { gaussian } from ".";
import { FWDEfficiencyGaussian } from "./FWDEfficiencyGaussian";
import { useGraphTooltip } from "../hooks/useGraphTooltip";
import { ChartTooltip } from "../..";

interface Props {
  spot: number;
  fwdRate: number;
  volatility: number;
}

export const FWDEfficiencyGraph: React.FunctionComponent<Props> = ({
  spot,
  fwdRate,
  volatility,
}) => {
  const { ref, width, height } = useGraphContainer();
  const tooltip = useGraphTooltip();

  const xScale = d3
    .scaleLinear()
    .domain([spot - 4 * volatility, spot + 4 * volatility])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, gaussian(spot, spot, volatility)])
    .range([height, 0]);

  return (
    <Container>
      <GraphContainer ref={ref}>
        <Graph width={width} height={height} xScale={xScale} yScale={yScale}>
          {width && height && (
            <FWDEfficiencyGaussian
              xScale={xScale}
              yScale={yScale}
              mean={spot}
              target={fwdRate}
              stdDev={volatility}
              width={width}
              tooltip={tooltip}
            />
          )}
        </Graph>
      </GraphContainer>
      <ChartTooltip {...tooltip} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: visible;
  position: relative;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;
