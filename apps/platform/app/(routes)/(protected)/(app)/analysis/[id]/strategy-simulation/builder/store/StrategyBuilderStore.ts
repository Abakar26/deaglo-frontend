import {
  type PartialStrategySimulation,
  type SimulationEnvironment,
  type Strategy,
} from "@/app/interface";
import { instanceToStrategy, strategyToInstance } from "@/app/interface/utils";
import { format, parseISO } from "date-fns";
import { SimulationType } from "ui/components";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BuildStep } from "..";

export interface SimulationNotional {
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  isBaseSold: boolean;
}

export interface StrategyMarket {
  spot: number;
  fwd: number;
}

interface StrategyBuilderState {
  completedSteps: Array<BuildStep>;
  completeStep: (step: BuildStep) => void;
  market?: StrategyMarket;
  notional?: SimulationNotional;
  environment?: SimulationEnvironment;
  strategies: Array<Strategy>;
  editMode: boolean;
  setMarket: (market?: StrategyMarket) => void;
  setNotional: (notional: SimulationNotional) => void;
  setEnvironment: (environment: SimulationEnvironment) => void;
  setStrategies: (strategies: Array<Strategy>) => void;
  addStrategies: (strategies: Array<Strategy>) => void;
  initialize: (simulation?: PartialStrategySimulation) => void;
  deinitialize: (simulation?: PartialStrategySimulation) => PartialStrategySimulation | undefined;
}

export const useStrategyBuilderStore = create(
  persist<StrategyBuilderState>(
    (set, get) => ({
      completedSteps: [],
      completeStep: (step: BuildStep) =>
        set(({ completedSteps }) => ({ completedSteps: [...completedSteps, step] })),
      notional: undefined,
      environment: undefined,
      market: undefined,
      strategies: [],
      editMode: false,
      name: "",
      setMarket: (market?: StrategyMarket) => set(() => ({ market })),
      setNotional: (notional?: SimulationNotional) => set(() => ({ notional })),
      setEnvironment: (environment?: SimulationEnvironment) => set(() => ({ environment })),
      setStrategies: (strategies: Array<Strategy>) => set(() => ({ strategies })),
      addStrategies: (_strategies: Array<Strategy>) =>
        set(({ strategies }) => ({ strategies: [...strategies, ..._strategies] })),
      initialize: (simulation?: PartialStrategySimulation) => {
        if (simulation) {
          set(({ environment, notional, strategies }) => ({
            environment: environment ?? {
              ...simulation.simulationEnvironment,
              appreciationPercent: simulation.simulationEnvironment.appreciationPercent * 100,
              volatility: simulation.simulationEnvironment.volatility * 100,
            },
            notional: notional ?? {
              name: simulation.name,
              amount: simulation.notional,
              isBaseSold: simulation.isBaseSold,
              startDate: parseISO(simulation.startDate),
              endDate: parseISO(simulation.endDate),
            },
            strategies:
              strategies.length > 0
                ? strategies
                : simulation.strategyInstance.map(instanceToStrategy),
            editMode: true,
            completedSteps: [BuildStep.NOTIONAL, BuildStep.ENVIRONMENT, BuildStep.STRATEGY],
          }));
        } else {
          set(() => ({ editMode: false }));
        }
      },
      deinitialize: (
        simulation?: PartialStrategySimulation
      ): PartialStrategySimulation | undefined => {
        const { notional, environment, strategies, market } = get();
        set(() => ({
          environment: undefined,
          notional: undefined,
          market: undefined,
          strategies: [],
          completedSteps: [],
          name: "",
        }));
        if (notional && environment && strategies.length > 0 && market) {
          return {
            name: notional.name,
            simulationEnvironment: {
              ...environment,
              appreciationPercent: environment.appreciationPercent / 100,
              volatility: environment.volatility / 100,
            },
            strategyInstance: strategies.map(strategyToInstance),
            notional: notional.amount,
            isBaseSold: notional.isBaseSold,
            startDate: format(notional.startDate, "yyyy-MM-dd"),
            endDate: format(notional.endDate, "yyyy-MM-dd"),
            status: "In Progress",
            type: SimulationType.STRATEGY,
            spread: simulation?.spread ?? 0.2,
            initialSpotRate: market.spot,
            initialForwardRate: market.fwd,
            pin: false,
          };
        }
      },
    }),
    {
      name: "strategy-builder",
    }
  )
);
