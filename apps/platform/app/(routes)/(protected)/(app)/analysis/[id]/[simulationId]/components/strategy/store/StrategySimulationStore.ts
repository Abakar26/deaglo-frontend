import { type StrategySimulation } from "@/app/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StrategySimulationState {
  editStrategy?: StrategySimulation;
  setEditStrategy: (editStrategy?: StrategySimulation) => void;
}

export const useStrategySimulationStore = create(
  persist<StrategySimulationState>(
    (set) => ({
      editStrategy: undefined,
      setEditStrategy: (editStrategy?: StrategySimulation) => set(() => ({ editStrategy })),
    }),
    {
      name: "edit-strategy",
    }
  )
);
