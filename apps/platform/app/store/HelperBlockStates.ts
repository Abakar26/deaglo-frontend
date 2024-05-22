import { HelperBlockType } from "@/app/(routes)/(protected)/(app)/components/helpers";
import { create } from "zustand";

interface HelperBlockState {
  visible: boolean;
  type: HelperBlockType;
  setVisible: (visible: boolean) => void;
  setType: (type: HelperBlockType) => void;
}

export const useHelperBlockStore = create<HelperBlockState>((set) => ({
  visible: false,
  type: HelperBlockType.DASHBOARD,
  setVisible: (visible: boolean) => set(() => ({ visible })),
  setType: (type: HelperBlockType) => set(() => ({ type })),
}));
