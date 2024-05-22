"use client";
import { type HedgeSimulationResults } from "@/app/interface";
import React, { useState } from "react";
import { styled } from "styled-components";
import { DualDensityGraph, SegmentedControl } from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  results: HedgeSimulationResults;
}

export enum Scenario {
  SCENARIO_1 = "Scenario 1",
  SCENARIO_2 = "Scenario 2",
  SCENARIO_3 = "Scenario 3",
}

export const ScenarioComparison: React.FunctionComponent<Props> = ({ results }) => {
  const [scenario, setScenario] = useState<Scenario>(Scenario.SCENARIO_1);

  return (
    <>
      <Container>
        <Row>
          <TitleSection>
            <Title>Scenarios Comparison</Title>
            <Description>
              Below is a summary plot presenting unhedged IRR vs hedged IRR distributions for
              different forward scenarios.
            </Description>
          </TitleSection>
          <SegmentedControl
            onChange={(scenario) => setScenario(scenario.key as Scenario)}
            segments={[
              {
                key: Scenario.SCENARIO_1,
                label: Scenario.SCENARIO_1,
              },
              {
                key: Scenario.SCENARIO_2,
                label: Scenario.SCENARIO_2,
              },
              {
                key: Scenario.SCENARIO_3,
                label: Scenario.SCENARIO_3,
              },
            ]}
          />
        </Row>
        <ChartContainer>
          <DualDensityGraph
            selected={scenario}
            left={{
              name: "Unhedged",
              data: results.violin_plot.unhedged,
            }}
            right={[
              {
                name: Scenario.SCENARIO_1,
                data: results.violin_plot.scenario_1,
              },
              {
                name: Scenario.SCENARIO_2,
                data: results.violin_plot.scenario_2,
              },
              {
                name: Scenario.SCENARIO_3,
                data: results.violin_plot.scenario_3,
              },
            ]}
          />
        </ChartContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  background: ${Color.NEUTRAL_00};
  padding: 20px;
  gap: 20px;
  height: max-content;
`;

const Title = styled.h1`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.p`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 330px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
