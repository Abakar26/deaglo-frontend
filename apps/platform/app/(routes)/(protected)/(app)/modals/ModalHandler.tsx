"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useConfirmationStore } from "../store";

export interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

interface ModalHandlerProps {
  children: React.ReactNode;
}

const ModalHandler: React.FC<ModalHandlerProps> = ({ children }) => {
  const [modalPageName, setModalPageName] = useState<string>();
  const [nextPath, setNextPath] = useState("");
  const pathName = usePathname();
  const router = useRouter();
  const { registeredModals, unregisterModal } = useConfirmationStore();

  useEffect(() => {
    const currentModal = Object.values(registeredModals).find(
      (modal) => !pathName.includes(modal.pageName)
    );
    if (currentModal) {
      setModalPageName(currentModal.pageName);
      setNextPath(pathName);
      router.back();
    }
  }, [pathName, registeredModals, unregisterModal, router]);

  const onConfirm = () => {
    const currentModal = registeredModals[modalPageName ?? ""];
    if (currentModal) {
      unregisterModal(currentModal.pageName);
      setModalPageName(undefined);
      if (nextPath) {
        router.replace(nextPath);
      }
    }
  };

  const Modal = modalPageName ? registeredModals[modalPageName]?.modalComponent : undefined;

  return (
    <>
      {Modal && <Modal onConfirm={onConfirm} onCancel={() => setModalPageName(undefined)} />}
      {children}
    </>
  );
};

export default ModalHandler;
