"use client";

import { create } from "zustand";
import { type HarvestEntry } from "../components";

export interface PartialHarvest {
  editHarvest: boolean;
  setEditHarvest: (editHarvest: boolean) => void;
  harvest: Array<HarvestEntry>;
  setHarvest: (harvest: Array<HarvestEntry>) => void;
}

export const usePartialHarvestStore = create<PartialHarvest>((set) => ({
  harvest: [],
  editHarvest: false,
  setHarvest: (harvest: Array<HarvestEntry>) => set(() => ({ harvest })),
  setEditHarvest: (editHarvest: boolean) => set(() => ({ editHarvest })),
}));
