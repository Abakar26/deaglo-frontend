"use client";

import { MarginSimulationData, StrategySection } from "./components";
import { useMarginSimulationStore } from "./store";
import { EditMarginSimulationModal } from "./modals";
import { type MarginSimulation } from "@/app/interface";

interface Props {
  marginSimulation: MarginSimulation;
}

export const MarginPage: React.FunctionComponent<Props> = ({ marginSimulation }) => {
  const { editMargin } = useMarginSimulationStore();
  return (
    <>
      <StrategySection
        {...marginSimulation.strategySimulation}
        simulationId={marginSimulation.strategySimulationId}
      />
      <MarginSimulationData marginSimulation={marginSimulation} />
      {editMargin && <EditMarginSimulationModal />}
    </>
  );
};
