export * from "./PayoffDiagram";
export * from "./PayoffGraph";

export interface PayoffLeg {
  isCall: boolean | null;
  isBought: boolean;
  leverage: number;
  premium: number;
  strike: number;
  barrierType?: BarrierType;
  barrierLevel?: number;
}

export type BarrierType = "up-in" | "up-out" | "down-in" | "down-out";
