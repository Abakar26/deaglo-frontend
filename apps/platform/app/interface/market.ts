import { type Flag } from "ui/components";

export interface MarketCurrency {
  code: string;
  countryName: Flag;
}

export type HistoricalSpot = Array<{
  rate: number;
  date: string;
}>;

export interface HistoricalSpotResponse {
  spotHistoryData: HistoricalSpot;
}

export interface HistoricalSpotRequest {
  baseCurrency: MarketCurrency;
  foreignCurrency: MarketCurrency;
  startDate: string;
  endDate: string;
  isBaseSold: boolean;
}

export interface SpotHistory {
  spotHistoryId: string;
  name: string;
  baseCurrency: MarketCurrency;
  foreignCurrency: MarketCurrency;
  durationMonths: number;
  isDefault: boolean;
  spotHistoryData: HistoricalSpot;
  // hedgingCost: number;
  // volatility: number;
}

export type PartialSpotHistory = Omit<SpotHistory, "spotHistoryId" | "isDefault">;

export interface FXMovement {
  fxMovementId: string;
  name: string;
  durationMonths: number;
  currencyPairs: Array<{
    baseCurrency: MarketCurrency;
    foreignCurrency: MarketCurrency;
    spotHistoryData: HistoricalSpot;
  }>;
  isDefault: boolean;
}

export type PartialFXMovement = Omit<FXMovement, "fxMovementId" | "isDefault">;

export interface FWDEffeciency {
  fwdEfficiencyId: string;
  name: string;
  baseCurrency: MarketCurrency;
  foreignCurrency: MarketCurrency;
  durationMonths: number;
  isDefault: number;
  spotHistoryData: HistoricalSpot;
  // fwdRate: number;
  // volatility: number;
}

export type PartialFWDEfficiency = Omit<FWDEffeciency, "fwdEfficiencyId" | "isDefault">;

export interface DefaultMarket {
  fxMovement: FXMovement;
  fwdEfficiency: FWDEffeciency;
  spotHistory: SpotHistory;
}
