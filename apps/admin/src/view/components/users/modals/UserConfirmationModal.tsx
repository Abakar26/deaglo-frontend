import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Button, ButtonType, ContentIconColor, Modal } from "ui/components";
import { APIRoute, HTTPMethod, authenticatedMutation } from "@/core";

type StatusLabelProps = {
  userId: string;
  onDismiss: () => void;
};

export const UserConfirmationModal: React.FunctionComponent<StatusLabelProps> = ({
  onDismiss,
  userId,
}) => {
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    const { success, error } = await authenticatedMutation(
      APIRoute.USER,
      undefined,
      undefined,
      HTTPMethod.DELETE,
      userId + "/"
    );

    if (error) {
      console.error(error);
    }

    if (success) {
      navigate(0);
    }
  };

  return (
    <Modal
      icon={{
        color: ContentIconColor.DANGER_100,
        icon: "trash",
      }}
      onDismiss={onDismiss}
      title={`Are you sure to delete the user?`}
    >
      <ModalButtonsContainer>
        <Button label="Cancel" type={ButtonType.OUTLINE} onClick={onDismiss} resizeMode="fit" />
        <Button label="Delete" onClick={() => void handleDeleteUser()} resizeMode="fit" />
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
