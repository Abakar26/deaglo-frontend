"use client";

import { useStrategySimulationStore } from "./store";
import { EditStrategySimulationModal } from "./modals";
import { MarginSection, MarketSection, StrategySimulationData } from "./components";
import { useEditMode } from "../../hooks/useEditMode";
import {
  type Analysis,
  type PartialStrategySimulation,
  type StrategySimulation,
} from "@/app/interface";
import { StrategyBuilder } from "../../../strategy-simulation/builder";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useConfirmationStore } from "@/app/(routes)/(protected)/(app)/store";
import { LeaveStrategySimulationModal } from "../../../strategy-simulation/modals";

interface Props {
  analysis: Analysis;
  strategySimulation: StrategySimulation;
}

export const StrategyPage: React.FunctionComponent<Props> = ({ analysis, strategySimulation }) => {
  const { editStrategy, setEditStrategy } = useStrategySimulationStore();
  const { editMode, setEditMode } = useEditMode();
  const { id, simulationId } = useParams<{ id: string; simulationId: string }>();
  const { registerModal, unregisterModal } = useConfirmationStore();

  const onEditComplete = (simulation: PartialStrategySimulation) => {
    if (editStrategy) {
      setEditStrategy({
        ...editStrategy,
        ...simulation,
      });
      setEditMode(false);
    }
  };

  useEffect(() => {
    editMode
      ? registerModal(`${id}/${simulationId}`, LeaveStrategySimulationModal)
      : unregisterModal(`${id}/${simulationId}`);
  }, [editMode]);

  return !editMode ? (
    <>
      <StrategySimulationData strategySimulation={strategySimulation} analysis={analysis} />
      <MarketSection simulation={strategySimulation} />
      <MarginSection marginId="" />
      {editStrategy && <EditStrategySimulationModal analysis={analysis} />}
    </>
  ) : (
    <StrategyBuilder
      simulation={editStrategy ?? strategySimulation}
      onSave={onEditComplete}
      onAbort={() => setEditMode(false)}
    />
  );
};
