"use client";

import React from "react";
import { styled } from "styled-components";
import { Button, ButtonType, ContentIconColor, Modal } from "ui/components";

type StatusLabelProps = {
  onDismiss: () => void;
  onClick: () => void;
  title: string;
};

export const DeleteConfirmationModal: React.FunctionComponent<StatusLabelProps> = ({
  onDismiss,
  onClick,
  title,
}) => {
  return (
    <Modal
      icon={{
        color: ContentIconColor.DANGER_100,
        icon: "trash",
      }}
      onDismiss={onDismiss}
      title={title}
    >
      <ModalButtonsContainer>
        <Button label="Cancel" type={ButtonType.OUTLINE} onClick={onDismiss} resizeMode="fit" />
        <Button label="Delete" onClick={onClick} resizeMode="fit" />
      </ModalButtonsContainer>
    </Modal>
  );
};

const ModalButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 24px;
`;
