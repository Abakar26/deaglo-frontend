import type React from "react";
import { create } from "zustand";
import type { ConfirmationModalProps } from "../modals";

interface ConfirmationModal {
  pageName: string;
  modalComponent: React.FunctionComponent<ConfirmationModalProps>;
}

interface ConfirmationStore {
  registeredModals: Record<string, ConfirmationModal>;
  registerModal: (
    pageName: string,
    modalComponent: React.FunctionComponent<ConfirmationModalProps>
  ) => void;
  unregisterModal: (pageName: string) => void;
}

export const useConfirmationStore = create<ConfirmationStore>((set) => ({
  registeredModals: {},
  registerModal: (pageName, modalComponent) =>
    set((state) => ({
      registeredModals: { ...state.registeredModals, [pageName]: { pageName, modalComponent } },
    })),
  unregisterModal: (pageName) =>
    set((state) => ({
      registeredModals: Object.fromEntries(
        Object.entries(state.registeredModals).filter(([name, _]) => name !== pageName)
      ),
    })),
}));
