import { type Flag } from "ui/components";
import type { HedgeSimulation, MarginSimulation, StrategySimulation } from ".";

export interface AnalysisCurrency {
  code: string;
  countryName: Flag;
}
export interface Analysis {
  analysisId: string;
  dateAdded: Date;
  name: string;
  category: string;
  baseCurrency: AnalysisCurrency;
  foreignCurrency: AnalysisCurrency;
  simulations: Array<StrategySimulation | MarginSimulation | HedgeSimulation>;
  organization?: string;
}

export type PartialAnalysis = Omit<
  Analysis,
  "analysisId" | "dateAdded" | "simulations" | "organization"
>;
