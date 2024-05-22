"use client";

import { create } from "zustand";

export type PartialFWDRates = Record<string, number | undefined>;

export interface FWDRatesStore {
  rates: PartialFWDRates;
  setRates: (rates: PartialFWDRates) => void;
}

export const useFWDRatesStore = create<FWDRatesStore>((set) => ({
  rates: {},
  setRates: (rates: PartialFWDRates) => set(() => ({ rates })),
}));
