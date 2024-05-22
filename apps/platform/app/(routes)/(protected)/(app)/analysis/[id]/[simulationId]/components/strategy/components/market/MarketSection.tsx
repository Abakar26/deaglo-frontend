"use client";

import { type StrategySimulation } from "@/app/interface";
import { toAccountingFormat } from "@/utilities/conversions";
import React from "react";
import styled from "styled-components";
import { Color, Typography } from "ui/styles";
import { DataSection } from "../../..";
import { PathSimulation } from "./PathSimulation";
import { Summary } from "./Summary";

interface Props {
  simulation: StrategySimulation;
}

export const MarketSection: React.FunctionComponent<Props> = ({
  simulation: { startDate, endDate, simulationEnvironment, results, spotHistoryData },
}) => {
  return (
    <Container>
      <TitleSection>
        <Title>Market Environment</Title>
        <Description>
          Examine the details below to assess market conditions across various projections. Utilize
          the 'Path Simulation' graph to visualize the range of potential outcomes, including the
          best and worst scenarios projected during the simulation.
        </Description>
      </TitleSection>

      <Row>
        <Summary
          name={simulationEnvironment.name}
          // tooltip={{
          //   label: `What is ${simulationEnvironment.name}?`,
          //   body: "Lorem ipsum",
          //   icon: "info",
          // }}
          segments={[
            {
              label: "Volatility Model",
              // TODO
              value: "GBM",
            },
            {
              label: "Historical Volatility",
              value: (simulationEnvironment.volatility * 100).toFixed(2) + "%",
            },
            {
              label: "Skew",
              value: simulationEnvironment.skew,
            },
            {
              label: "Appreciation / Depreciation",
              value: (simulationEnvironment.appreciationPercent * 100).toFixed(2) + "%",
            },
          ]}
        />
        {results && (
          <Summary
            name="Path Simulation Outcomes"
            tooltip={{
              label: "What is Path Outcomes?",
              body: "Use this section to see a summary of highest, lowest, and average spot outcomes.",
              icon: "info",
            }}
            segments={[
              {
                label: "Highest",
                value: toAccountingFormat(results.drawdown.best),
              },
              {
                label: "Lowest",
                value: toAccountingFormat(results.drawdown.worst),
              },
              {
                label: "Average",
                value: toAccountingFormat(results.drawdown.mean),
              },
            ]}
          />
        )}
      </Row>
      <DataSection>
        <PathSimulation
          paths={results?.paths ?? []}
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          spotHistory={spotHistoryData ?? []}
        />
      </DataSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 8px;
`;

const Title = styled.div`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.div`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
