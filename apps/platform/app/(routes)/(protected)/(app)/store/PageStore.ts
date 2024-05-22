import { type SimulationStatus, type MenuProps, type Selectable } from "ui/components";
import { create } from "zustand";

export interface PageState {
  saved?: boolean;
  status?: SimulationStatus;
  menu?: MenuProps<Selectable>;
}

interface PageStates {
  pages: Record<string, PageState | undefined>;
  flush: () => void;
  set: (page: string, state?: PageState) => void;
}
export const usePageStore = create<PageStates>((set) => ({
  pages: {},
  flush: () => set(() => ({ pages: {} })),
  set: (page: string, state?: PageState) =>
    set(({ pages }) => ({ pages: { ...pages, [page]: state } })),
}));
