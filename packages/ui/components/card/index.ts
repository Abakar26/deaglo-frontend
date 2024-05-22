import { type Selectable } from "components";

export * from "./analysis";
export * from "./common";
export * from "./leg";
export * from "./simulation";
export * from "./strategy";
export * from "./workspace";

type LegType = "Vanilla" | "Barrier";
export type DerivativeType = "Call" | "Put" | "Forward";
type ActionType = "Bought" | "Sold";
type BarrierType = "up-in" | "up-out" | "down-in" | "down-out";
type TenorType = "1 Month" | "1 Quarter" | "2 Quarters" | "3 Quarters" | "1 year";

export interface Leg {
  id?: string;
  title?: string;
  type?: LegType | Selectable;
  option?: DerivativeType;
  action?: ActionType;
  leverage?: number;
  strike?: number;
  tenor?: TenorType;
  barrierType?: BarrierType;
  barrierLevel?: number;
  legAmount?: number;
  premium?: number;
  premiumCurrency?: string;
}

export const typeOptions: Array<LegType> = ["Vanilla", "Barrier"];

export const typeSelectableOptions: Array<Selectable> = [
  {
    key: "1",
    value: "Vanilla",
    disabled: false,
  },
  {
    key: "2",
    value: "Barrier",
    disabled: false,
  },
];

export const barrierOptions: Array<BarrierType> = ["up-in", "up-out", "down-in", "down-out"];

export const tenorOptions: Array<TenorType> = [
  "1 Month",
  "1 Quarter",
  "2 Quarters",
  "3 Quarters",
  "1 year",
];

export const actionOptions: Array<ActionType> = ["Bought", "Sold"];

export const derivativeOptions: Array<DerivativeType> = ["Call", "Put", "Forward"];

type DerivativeSelectable = Omit<Selectable, "value"> & {
  value: DerivativeType;
};

export const derivationSelectableOptions: Array<DerivativeSelectable> = [
  {
    key: "1",
    value: "Call",
    disabled: false,
  },
  {
    key: "2",
    value: "Put",
    disabled: false,
  },
  {
    key: "3",
    value: "Forward",
    disabled: false,
  },
] satisfies Array<DerivativeSelectable>;

export type Strategy = Array<Leg>;
