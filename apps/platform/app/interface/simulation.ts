import type { SimulationType } from "ui/components";
import type { HistoricalSpot, Leg, Strategy } from ".";

export enum SimulationStatus {
  ENQUEUED = "ENQUEUED",
  IN_PROGRESS = "IN PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface StrategySimulation {
  type: SimulationType.STRATEGY;
  id: string;
  resultId: string;
  name: string;
  dateUpdated: string;
  dateAdded: string;
  simulationEnvironment: SimulationEnvironment;
  status: string; // SimulationStatus;
  startDate: string;
  endDate: string;
  isBaseSold: boolean;
  notional: number;
  initialSpotRate: number;
  initialForwardRate: number;
  spread: number;
  strategyInstance: Array<StrategyInstance>;
  results?: StrategySimulationResults;
  spotHistoryData?: HistoricalSpot;
  pin: boolean;
  simulationStatus: SimulationStatus;
}

export type StrategyInstance = Omit<Strategy, "legs"> & {
  legs: Array<LegInstance>;
};

export interface LegInstance {
  dateAdded?: string;
  strategyLegId: string;
  leverageOverride: number;
  premiumOverride: number;
  strikeOverride: number;
  hiddenStrategyLeg?: Leg;
}

export interface StrategySimulationResults {
  paths: Array<Array<number>>;
  violin_plot: Record<string, Array<number>>;
  summary: Record<string, ResultsSummary>;
  drawdown: PathOutcomes;
}

export interface ResultsSummary {
  median: number;
  average: number;
  qt25: number;
  qt75: number;
  qt90: number;
  qt95: number;
}

export interface PathOutcomes {
  best: number;
  worst: number;
  mean: number;
}

export type PartialStrategySimulation = Omit<
  StrategySimulation,
  "strategySimulationId" | "dateAdded" | "dateUpdated" | "id" | "resultId"
>;

export interface StrategyRequest {
  strategyId: string;
  isCustomStrategy: boolean;
  legs: Array<Leg>;
}
export interface MarginSimulation {
  type: SimulationType.MARGIN;
  id: string;
  resultId: string;
  name: string;
  dateUpdated: string;
  dateAdded: string;
  status: string;
  strategySimulationId: string;
  minimumTransferAmount: number;
  initialMarginPercentage: number;
  variationMarginPercentage: number;
  startDate: string;
  endDate: string;
  strategySimulation: {
    name: string;
    status: string;
    dateUpdated: string;
  };
  results?: MarginSimulationResults;
  pin: boolean;
  simulationStatus: SimulationStatus;
}

export interface MarginSimulationResults {
  violin_plot: Record<string, Array<number>>;
  summary: Record<string, ResultsSummary>;
}

export type PartialMarginSimulation = Omit<
  MarginSimulation,
  | "marginSimulationId"
  | "dateAdded"
  | "dateUpdated"
  | "strategySimulation"
  | "type"
  | "startDate"
  | "endDate"
  | "id"
  | "resultId"
>;

export enum EnvironmentName {
  LOW_VOL = "Low Vol",
  MED_VOL = "Medium Vol",
  MED_VOL_TAIL = "Medium Vol - Fat Tails",
  HIGH_VOL = "High Vol",
  CUSTOM = "Custom",
}
export interface SimulationEnvironment {
  dateAdded?: string;
  name: EnvironmentName;
  volatility: number;
  skew: number;
  appreciationPercent: number;
}

export type WaterfallEntry = [string, string];

export interface HedgeSimulation {
  type: SimulationType.HEDGE;
  id: string;
  resultId: string;
  name: string;
  status: string;
  simulationEnvironment: SimulationEnvironment;
  dateAdded: string;
  dateUpdated: string;
  startDate: string;
  endDate: string;
  fwdRates: [FWDRate, FWDRate, FWDRate];
  results?: HedgeSimulationResults;
  harvest?: Array<WaterfallEntry>;
  pin: boolean;
  simulationStatus: SimulationStatus;
}

export type PartialHedgeSimulation = Omit<
  HedgeSimulation,
  "dateUpdated" | "dateAdded" | "type" | "id" | "resultId" | "startDate" | "endDate"
>;

export interface HedgeSimulationResults {
  violin_plot: HedgeResultsKeys<Array<number>>;
  summary: HedgeResultsKeys<HedgeResultsSummary>;
}

export interface HedgeResultsSummary {
  median: number;
  qt25: number;
  qt75: number;
  min: number;
  max: number;
}

export interface HedgeResultsKeys<T> {
  unhedged: T;
  scenario_1: T;
  scenario_2: T;
  scenario_3: T;
}

export type FWDRate = [number, number, number];

export type SimulationInstance = HedgeSimulation | StrategySimulation | MarginSimulation;
