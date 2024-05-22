"use client";

import { useEffect } from "react";
import { useConfirmationStore } from "../store";
import { type ConfirmationModalProps } from "../modals";

export const usePageConfirmation = (
  pageName: string,
  modalComponent: React.FunctionComponent<ConfirmationModalProps>
) => {
  const { registerModal } = useConfirmationStore();

  useEffect(() => {
    registerModal(pageName, modalComponent);
  }, [pageName, modalComponent, registerModal]);
};
