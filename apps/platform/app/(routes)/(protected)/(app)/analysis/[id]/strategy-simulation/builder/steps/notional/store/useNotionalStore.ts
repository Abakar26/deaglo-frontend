import { create } from "zustand";

export interface PartialNotional {
  name?: string;
  amount?: number;
  startDate?: Date;
  endDate?: Date;
  isBaseSold?: boolean;
}

const DEFAULT_NOTIONAL_VALUES = {
  startDate: new Date(),
  name: "",
};

export interface NotionalStore {
  notional: PartialNotional;
  setNotional: (notaional: PartialNotional) => void;
}

export const useNotionalStore = create<NotionalStore>((set) => ({
  notional: DEFAULT_NOTIONAL_VALUES,
  setNotional: (updates: PartialNotional) =>
    set(({ notional }) => ({ notional: { ...notional, ...updates } })),
}));
