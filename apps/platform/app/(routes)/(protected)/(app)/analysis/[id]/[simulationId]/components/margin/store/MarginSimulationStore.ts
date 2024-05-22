import { type MarginSimulation } from "@/app/interface";
import { create } from "zustand";

interface MarginSimulationState {
  editMargin?: MarginSimulation;
  setEditMargin: (editMargin?: MarginSimulation) => void;
}

export const useMarginSimulationStore = create<MarginSimulationState>((set) => ({
  editMargin: undefined,
  setEditMargin: (editMargin?: MarginSimulation) => set(() => ({ editMargin })),
}));
