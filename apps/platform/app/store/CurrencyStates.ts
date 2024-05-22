import { type Flag } from "ui/components";
import { create } from "zustand";

export interface Currency {
  code: string;
  name: string;
  countryName: Flag;
}

interface CurrencyState {
  currencies: Array<Currency>;
  setCurrencies: (currencies: Array<Currency>) => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currencies: [],
  setCurrencies: (currencies: Array<Currency>) => set(() => ({ currencies })),
}));
