"use client";

import type { Analysis, StrategySimulation, StrategySimulationResults } from "@/app/interface";
import React, { useState, type ReactNode } from "react";
import styled from "styled-components";
import { TabBar, TabBarSize, Tooltip } from "ui/components";
import { DataSection } from "../../../..";
import { Greeks } from "./Greeks";
import { Payoff } from "./Payoff";
import { Violin } from "./Violin";

interface Props {
  analysis: Analysis;
  simulation: StrategySimulation;
  results: StrategySimulationResults;
}

enum GraphType {
  VIOLIN = "VIOLIN",
  GREEKS = "GREEKS",
  PAYOFF = "PAYOFF",
}

export const StrategyGraphs: React.FunctionComponent<Props> = ({
  results,
  simulation,
  analysis,
}) => {
  const [graphType, setGraphType] = useState<GraphType>(GraphType.VIOLIN);

  return (
    <DataSection>
      <Row>
        <RowSection>
          Simulation Comparison
          <Tooltip {...getTooltip(graphType)} icon="info" />
        </RowSection>
        <TabBar
          size={TabBarSize.SMALL}
          onChange={(key) => setGraphType(key as GraphType)}
          current={graphType}
          tabs={[
            {
              key: GraphType.VIOLIN,
              label: "Violin",
            },
            {
              key: GraphType.PAYOFF,
              label: "Payoff Diagram",
            },
            // {
            //   key: GraphType.GREEKS,
            //   label: "Greeks",
            // },
          ]}
        />
      </Row>
      {getGraph(graphType, results, simulation, analysis)}
    </DataSection>
  );
};

const getTooltip = (graphType: GraphType): { label: string; body: string } => {
  switch (graphType) {
    case GraphType.VIOLIN:
      return {
        label: "Using violin plots for strategy comparison",
        body: "Violin plots provide a visual summary of the distribution of possible outcomes for different strategies, combining the features of a box plot with a kernel density plot. This view helps in assessing the probability density of returns.",
      };
    case GraphType.GREEKS:
      return {
        label:
          "This view utilizes option Greeks to compare strategies based on key risk measures such as delta, gamma, theta, and vega. It helps in understanding how different options strategies are likely to perform with changes in market conditions.",
        body: "Lorem ipsum",
      };
    case GraphType.PAYOFF:
      return {
        label: "Using payoff diagrams for strategy comparison",
        body: "Payoff diagrams graphically represent the potential outcomes of options strategies at expiration. This is a very conventional view that allows for a straightforward comparison of the P&L potential of various strategies, highlighting the break-even points, maximum gain, and maximum loss.",
      };
  }
};

const getGraph = (
  graphType: GraphType,
  results: StrategySimulationResults,
  simulation: StrategySimulation,
  analysis: Analysis
): ReactNode => {
  switch (graphType) {
    case GraphType.VIOLIN:
      return <Violin analysis={analysis} results={results} />;
    case GraphType.GREEKS:
      return <Greeks results={results} />;
    case GraphType.PAYOFF:
      return <Payoff analysis={analysis} simulation={simulation} />;
  }
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RowSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;
