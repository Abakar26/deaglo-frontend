import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfirmationStore } from "@/core/store";

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
  const location = useLocation();
  const navigate = useNavigate();
  const { registeredModals, unregisterModal } = useConfirmationStore();

  useEffect(() => {
    const currentModal = Object.values(registeredModals).find(
      (modal) => !location.pathname.includes(modal.pageName)
    );
    if (currentModal) {
      setModalPageName(currentModal.pageName);
      setNextPath(location.pathname);
      navigate(-1);
    }
  }, [location, registeredModals, unregisterModal, navigate]);

  const onConfirm = () => {
    const currentModal = registeredModals[modalPageName ?? ""];
    if (currentModal) {
      unregisterModal(currentModal.pageName);
      setModalPageName(undefined);
      if (nextPath) {
        navigate(nextPath, { replace: true });
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
