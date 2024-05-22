"use client";

import { type Analysis, type StrategySimulation } from "@/app/interface";
import React from "react";
import styled from "styled-components";
import { ContentBlock } from "ui/components";
import { Color, Typography } from "ui/styles";
import { DistributionDataTable } from "../../..";
import { StrategyGraphs } from "./graphs";

interface Props {
  analysis: Analysis;
  strategySimulation: StrategySimulation;
}

export const StrategySimulationData: React.FunctionComponent<Props> = ({
  analysis,
  strategySimulation,
}) => {
  const results = strategySimulation.results;
  // const baseWeakens =
  //   strategySimulation.isBaseSold && strategySimulation.simulationEnvironment.skew < 0;

  return (
    <Container>
      <TitleSection>
        <Title>Simulation Comparison</Title>
      </TitleSection>
      <ContentBlock>
        <SimulationDescription>
          We analyzed {strategySimulation.strategyInstance.length}{" "}
          {strategySimulation.strategyInstance.length === 1 ? "strategy" : "strategies"} using
          20,000 market projections. You specified a market environment with volatility of{" "}
          <Bold>{(strategySimulation.simulationEnvironment.volatility * 100).toFixed(2)}%</Bold>,{" "}
          <Bold>{strategySimulation.simulationEnvironment.skew}%</Bold> skew, and a{" "}
          <Bold>
            {Math.abs(strategySimulation.simulationEnvironment.appreciationPercent * 100).toFixed(
              2
            )}
            %
          </Bold>{" "}
          {strategySimulation.simulationEnvironment.appreciationPercent > 0
            ? "appreciation"
            : "depreciation"}
          .
          {/* This means that your
          results are taking into consideration a weakening{" "}
          {baseWeakens ? analysis.baseCurrency.code : analysis.foreignCurrency.code} or a
          strengthening {baseWeakens ? analysis.foreignCurrency.code : analysis.baseCurrency.code} */}
        </SimulationDescription>
      </ContentBlock>
      <DataSection>
        {results && (
          <StrategyGraphs results={results} simulation={strategySimulation} analysis={analysis} />
        )}
        {results?.summary && <DistributionDataTable data={results.summary} />}
        {/* <ContentBlock
          title="Summary"
          description="Your exposure on this investment is large. The variance in returns should you not hedge is X and Y appropriate cash reserve. The Call and Forward reduce this variance substantially. However the Par Forward provides the best protection and the most upside"
        /> */}
      </DataSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
`;

const Title = styled.div`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DataSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bold = styled.span`
  color: ${Color.NEUTRAL_900};
  ${Typography.SUBHEAD_2};
`;

const SimulationDescription = styled.span`
  color: ${Color.NEUTRAL_900};
  ${Typography.BODY_3};
`;
