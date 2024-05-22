import type { IconName, SnackPosition, SnackbarLevel } from "ui/components";
import { create } from "zustand";

export interface Snack {
  level?: SnackbarLevel;
  icon?: IconName;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  cancellabel?: boolean;
  position?: SnackPosition;
  message: string;
  description?: string;
}

interface SnackbarState {
  snack?: Snack;
  setSnack: (snack?: Snack) => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  snack: undefined,
  setSnack: (snack?: Snack) => set(() => ({ snack })),
}));
