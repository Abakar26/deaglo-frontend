export type Strategy = {
  strategyId: string;
  dateAdded: string;
  isCustom: boolean;
  name: string;
  description: string;
  legs: Array<Leg>;
};

export type PartialStrategy = Omit<Strategy, "dateAdded" | "strategyId" | "isCustom" | "legs"> & {
  legs: Array<PartialLeg>;
};

export interface Leg {
  strategyLegId: string;
  isCall: boolean | null;
  isBought: boolean;
  premium: number;
  premiumCurrency?: string;
  leverage: number;
  strike: number;
  barrierType?: BarrierType;
  barrierLevel?: number;
}

export type PartialLeg = Omit<Leg, "strategyLegId">;
export type BarrierType = "up-in" | "up-out" | "down-in" | "down-out";
