import { create } from "zustand";
import { type HedgeSimulation } from "../../../interface";

interface HedgeSimulationState {
  editHedge?: HedgeSimulation;
  setEditHedge: (editHedge?: HedgeSimulation) => void;
}

export const useHedgeSimulationStore = create<HedgeSimulationState>((set) => ({
  editHedge: undefined,
  setEditHedge: (editHedge?: HedgeSimulation) => set(() => ({ editHedge })),
}));
