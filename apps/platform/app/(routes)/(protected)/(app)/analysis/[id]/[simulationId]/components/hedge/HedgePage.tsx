"use client";
import React from "react";
import { SelectedEnvironment, ScenarioComparison, ScenariosDetails } from "./components";
import { useHedgeSimulationStore } from "./store";
import { EditHedgeStrategyModal } from "./modals";
import { type HedgeSimulation } from "@/app/interface";

interface Simulation {
  hedgeSimulation: HedgeSimulation;
}

export const HedgePage: React.FunctionComponent<Simulation> = ({ hedgeSimulation }) => {
  const { editHedge } = useHedgeSimulationStore();

  return (
    <>
      <SelectedEnvironment environment={hedgeSimulation.simulationEnvironment} edit={false} />
      {hedgeSimulation.results && (
        <>
          <ScenarioComparison results={hedgeSimulation.results} />
          <ScenariosDetails fwdRates={hedgeSimulation.fwdRates} results={hedgeSimulation.results} />
        </>
      )}

      {editHedge && <EditHedgeStrategyModal simulation={hedgeSimulation} />}
    </>
  );
};
