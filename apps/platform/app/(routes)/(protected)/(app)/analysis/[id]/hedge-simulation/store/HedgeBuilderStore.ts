import { create } from "zustand";
import { BuildStep } from "../builder";
import { persist } from "zustand/middleware";
import {
  type FWDRate,
  type PartialHedgeSimulation,
  type SimulationEnvironment,
} from "@/app/interface";
import { SimulationStatus } from "ui/components";
import { format } from "date-fns";

interface HedgeSimulationState {
  completedSteps: Array<BuildStep>;
  fileName?: string;
  harvest: Array<[string, number]>;
  environment?: SimulationEnvironment;
  editMode: boolean;
  fwdRates?: [FWDRate, FWDRate, FWDRate];
  name: string;
  completeStep: (step: BuildStep) => void;
  setFileName: (value?: string) => void;
  setHarvest: (value: Array<[string, number]>) => void;
  setEnvironment: (environment: SimulationEnvironment) => void;
  setFwdRates: (value: [FWDRate, FWDRate, FWDRate]) => void;
  setName: (value: string) => void;
  initialize: (simulation?: PartialHedgeSimulation) => void;
  deinitialize: (simulation?: PartialHedgeSimulation) => PartialHedgeSimulation | undefined;
}

export const useHedgeBuilderStore = create(
  persist<HedgeSimulationState>(
    (set, get) => ({
      fwdRates: undefined,
      harvest: [],
      editMode: false,
      name: "",
      completedSteps: [],
      completeStep: (step: BuildStep) =>
        set(({ completedSteps }) => ({ completedSteps: [...completedSteps, step] })),
      fileName: undefined,
      environment: undefined,
      scenario: [],
      setFileName: (fileName?: string) => set(() => ({ fileName })),
      setName: (value) => set(() => ({ name: value })),
      setHarvest: (updates) => set(() => ({ harvest: updates })),
      setEnvironment: (environment?: SimulationEnvironment) => set(() => ({ environment })),
      setFwdRates: (value) => set(() => ({ fwdRates: value })),
      initialize: (simulation?: PartialHedgeSimulation) => {
        if (simulation) {
          set(({ environment, harvest, fwdRates, name }) => ({
            environment: environment ?? {
              ...simulation.simulationEnvironment,
              appreciationPercent: simulation.simulationEnvironment.appreciationPercent * 100,
              volatility: simulation.simulationEnvironment.volatility * 100,
            },
            fwdRates: fwdRates ?? simulation.fwdRates,
            harvest: harvest ?? simulation.harvest?.map,
            name: name ?? simulation.name,
            editMode: true,
            completedSteps: [BuildStep.HARVEST, BuildStep.ENVIRONMENT, BuildStep.FWD_RATES],
          }));
        } else {
          set(() => ({ editMode: false }));
        }
      },
      deinitialize: (simulation?: PartialHedgeSimulation): PartialHedgeSimulation | undefined => {
        const { environment, harvest, fwdRates, name } = get();
        set(() => ({
          environment: undefined,
          fileName: undefined,
          // harvest: undefined,
          fwdRates: undefined,
          completedSteps: [],
          name: "",
        }));
        if (environment && fwdRates && harvest && name) {
          return {
            status: "In Progress",
            simulationEnvironment: {
              ...environment,
              appreciationPercent: environment?.appreciationPercent / 100,
              volatility: environment?.volatility / 100,
            },
            harvest,
            fwdRates: fwdRates ?? simulation?.fwdRates,
            name: name ?? simulation?.name ?? "",
          };
        }
        if (simulation) {
          return {
            status: "In Progress",
            simulationEnvironment: {
              ...simulation.simulationEnvironment,
              appreciationPercent: simulation.simulationEnvironment?.appreciationPercent,
              volatility: simulation.simulationEnvironment?.volatility,
            },
            harvest: simulation.harvest,
            fwdRates: fwdRates ?? simulation?.fwdRates,
            name: simulation?.name,
          };
        }
      },
    }),
    {
      name: "hedge-builder",
    }
  )
);
