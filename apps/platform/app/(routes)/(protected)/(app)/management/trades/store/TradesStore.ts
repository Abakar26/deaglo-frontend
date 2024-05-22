import { create } from "zustand";
import type { Trades } from "../components/_mocks";

type TradesState = {
  checkAllTradesSelected: () => boolean;
  checkSelectedTrades: (tradeIds: string[]) => boolean;
  clearSelectedTrades: () => void;
  selectAllTrades: (select: boolean) => void;
  selectedTradeIds: string[];
  selectTrades: (tradeIds: string[], select: boolean) => void;
  selectTradesToRoll: (tradeIds: string[]) => void;
  selectTradesToSell: (tradeIds: string[]) => void;
  setTrades: (trades: Trades) => void;
  trades: Trades;
  tradesToRoll: Trades;
  tradesToSell: Trades;
};

export const useTradesStore = create<TradesState>((set, get) => ({
  selectedTradeIds: [],
  trades: [],
  tradesToRoll: [],
  tradesToSell: [],

  selectTrades: (tradeIds, select) => {
    set((state) => {
      const newSelection = select
        ? [...state.selectedTradeIds, ...tradeIds]
        : state.selectedTradeIds.filter((selectedId) => !tradeIds.some((id) => id === selectedId));

      return { selectedTradeIds: newSelection };
    });
  },

  selectAllTrades: (select) => {
    const tradeIds = get().trades.map((trade) => trade.trade_id);
    set({ selectedTradeIds: select ? tradeIds : [] });
  },

  checkSelectedTrades: (tradeIds) => tradeIds.every((id) => get().selectedTradeIds.includes(id)),

  checkAllTradesSelected: () => {
    const tradeIds = get().trades.map((trade) => trade.trade_id);
    return get().checkSelectedTrades(tradeIds);
  },

  clearSelectedTrades: () => set({ selectedTradeIds: [] }),

  setTrades: (trades) => set({ trades }),

  selectTradesToRoll: (tradeIds) => {
    set((state) => {
      const tradesToRoll = state.trades.filter((trade) => {
        return tradeIds.some((tradeId) => tradeId === trade.trade_id);
      });

      return { tradesToRoll };
    });
  },

  selectTradesToSell: (tradeIds) => {
    set((state) => {
      const tradesToSell = state.trades.filter((trade) => {
        return tradeIds.some((tradeId) => tradeId === trade.trade_id);
      });

      return { tradesToSell };
    });
  },
}));
