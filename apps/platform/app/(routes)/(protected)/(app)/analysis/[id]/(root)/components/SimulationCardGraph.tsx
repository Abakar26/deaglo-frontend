"use client";

import { SimulationInteractor } from "@/app/interactors";
import {
  type HedgeSimulation,
  type HedgeSimulationResults,
  type MarginSimulation,
  type MarginSimulationResults,
  type SimulationInstance,
  type StrategySimulation,
  type StrategySimulationResults,
} from "@/app/interface";
import React, { useEffect, useState } from "react";
import {
  ViolinColor,
  ViolinGraph,
  SimulationType,
  SuspenseBlock,
  DualDensityGraph,
} from "ui/components";
import { Scenario } from "../../[simulationId]/components/hedge/components";
import styled from "styled-components";

interface StrategyResultsInstance {
  type: SimulationType.STRATEGY;
  results: StrategySimulationResults;
}

interface MarginResultsInstance {
  type: SimulationType.MARGIN;
  results: MarginSimulationResults;
}

interface HedgeResultsInstance {
  type: SimulationType.HEDGE;
  results: HedgeSimulationResults;
}

type ResultsInstance = StrategyResultsInstance | MarginResultsInstance | HedgeResultsInstance;

interface Props {
  simulation: SimulationInstance;
}

export const SimulationCardGraph: React.FunctionComponent<Props> = ({ simulation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [results, setResults] = useState<ResultsInstance>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      switch (simulation.type) {
        case SimulationType.STRATEGY:
          const strategyResults = await getStrategyResults(simulation);
          strategyResults &&
            setResults({ type: SimulationType.STRATEGY, results: strategyResults });
          setLoading(false);
          return;
        case SimulationType.MARGIN:
          const marginResults = await getMarginResults(simulation);
          marginResults && setResults({ type: SimulationType.MARGIN, results: marginResults });
          setLoading(false);
          return;
        case SimulationType.HEDGE:
          const hedgeResults = await getHedgeResults(simulation);
          hedgeResults && setResults({ type: SimulationType.HEDGE, results: hedgeResults });
          setLoading(false);
      }
    })();
  }, [simulation]);

  return loading || !results ? (
    <SuspenseBlock width="100%" height="192px" />
  ) : (
    <Container>{getResultsGraph(results)}</Container>
  );
};

const getResultsGraph = ({ type, results }: ResultsInstance) => {
  switch (type) {
    case SimulationType.STRATEGY:
      return (
        <ViolinGraph
          withInteraction={false}
          withLabels={false}
          data={[
            {
              id: "exposure",
              name: "exposure",
              color: ViolinColor.NEUTRAL_400,
              data: results.violin_plot.exposure ?? [],
            },
            ...Object.entries(results.violin_plot)
              .filter(([name]) => name !== "exposure")
              .map(([name, data], index) => ({
                id: `${index}`,
                name: name,
                color: ViolinColor.BRAND_300,
                data,
              })),
          ]}
        />
      );
    case SimulationType.MARGIN:
      return (
        <ViolinGraph
          withInteraction={false}
          withLabels={false}
          data={Object.entries(results.violin_plot).map(([name, data], index) => ({
            id: `${index}`,
            name: name,
            color: ViolinColor.BROWN_200,
            data,
          }))}
        />
      );
    case SimulationType.HEDGE:
      return (
        <DualDensityGraph
          selected={Scenario.SCENARIO_1}
          withInteraction={false}
          withLabels={false}
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
      );
  }
};

// TODO: Error handling
const getStrategyResults = async (simulation: StrategySimulation) => {
  const [results, error] = await SimulationInteractor.results.getResults<StrategySimulationResults>(
    simulation.id,
    simulation.resultId
  );
  return results;
};

const getMarginResults = async (simulation: MarginSimulation) => {
  const [results, error] = await SimulationInteractor.results.getResults<MarginSimulationResults>(
    simulation.id,
    simulation.resultId
  );
  return results;
};

const getHedgeResults = async (simulation: HedgeSimulation) => {
  const [results, error] = await SimulationInteractor.results.getResults<HedgeSimulationResults>(
    simulation.id,
    simulation.resultId
  );
  return results;
};

const Container = styled.div`
  height: 192px;
  width: 100%;
`;
