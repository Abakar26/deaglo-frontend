"use client";
import React from "react";
import { styled } from "styled-components";
import { Color, Typography } from "ui/styles";
import { ScenarioCards } from "./index";
import { type FWDRate, type HedgeSimulationResults } from "@/app/interface";

interface Props {
  fwdRates: [FWDRate, FWDRate, FWDRate];
  results: HedgeSimulationResults;
}

export const ScenariosDetails: React.FunctionComponent<Props> = ({ fwdRates, results }) => {
  return (
    <>
      <Heading>Scenarios Details</Heading>
      <Description>
        The results for each forward point scenario are displayed in three split violin plots. The
        left half of the plot shows the results for unhedged IRR. It will be identical across all
        scenarios. The right half shows the results for hedged IRR.
      </Description>
      <ScenarioCards
        title={"Scenario 1"}
        unhedged={results.violin_plot.unhedged}
        hedged={results.violin_plot.scenario_1}
        summary={{
          "Unhedged IRR": results.summary.unhedged,
          "Scenario 1": results.summary.scenario_1,
        }}
        fwdRate={fwdRates[0]}
      />
      <ScenarioCards
        title={"Scenario 2"}
        unhedged={results.violin_plot.unhedged}
        hedged={results.violin_plot.scenario_2}
        summary={{
          "Unhedged IRR": results.summary.unhedged,
          "Scenario 2": results.summary.scenario_2,
        }}
        fwdRate={fwdRates[1]}
      />
      <ScenarioCards
        title={"Scenario 3"}
        unhedged={results.violin_plot.unhedged}
        hedged={results.violin_plot.scenario_3}
        summary={{
          "Unhedged IRR": results.summary.unhedged,
          "Scenario 3": results.summary.scenario_3,
        }}
        fwdRate={fwdRates[2]}
      />
    </>
  );
};

const Heading = styled.h1`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.p`
  ${Typography.BODY_3}
  color: ${Color.NEUTRAL_700};
  margin-bottom: 16px;
`;
