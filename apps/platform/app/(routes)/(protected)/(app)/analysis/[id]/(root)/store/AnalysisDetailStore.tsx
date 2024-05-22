import { type SimulationStatus } from "ui/components";
import { create } from "zustand";
import { type SimulationInstance } from "@/app/interface";

interface AnalysisDetailState {
  executeStrategy: boolean;
  setExecuteStrategy: (executeStrategy: boolean) => void;
  updateStatus?: SimulationInstance;
  setUpdateStatus: (simulation?: SimulationInstance) => void;
  statusOverrides: Record<string, SimulationStatus>;
  addStatusOverride: (id: string, status: SimulationStatus) => void;
}

export const useAnalysisDetailStore = create<AnalysisDetailState>((set) => ({
  executeStrategy: false,
  setExecuteStrategy: (executeStrategy: boolean) => set(() => ({ executeStrategy })),
  updateStatus: undefined,
  setUpdateStatus: (updateStatus?: SimulationInstance) => set(() => ({ updateStatus })),
  statusOverrides: {},
  addStatusOverride: (id: string, status: SimulationStatus) =>
    set((current) => ({ statusOverrides: { ...current.statusOverrides, [id]: status } })),
}));
