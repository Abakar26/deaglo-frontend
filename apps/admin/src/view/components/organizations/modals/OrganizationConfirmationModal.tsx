import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Button, ButtonType, ContentIconColor, Modal } from "ui/components";
import { APIRoute, HTTPMethod, authenticatedMutation } from "@/core";

type StatusLabelProps = {
  organizationId: string;
  onDismiss: () => void;
};

export const OrganizationConfirmationModal: React.FunctionComponent<StatusLabelProps> = ({
  onDismiss,
  organizationId,
}) => {
  const navigate = useNavigate();

  const handleDeleteOrganization = async () => {
    const { success, error } = await authenticatedMutation(
      APIRoute.ORGANIZATION,
      undefined,
      undefined,
      HTTPMethod.DELETE,
      organizationId + "/"
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
      title={`Are you sure to delete the organization?`}
    >
      <ModalButtonsContainer>
        <Button label="Cancel" type={ButtonType.OUTLINE} onClick={onDismiss} resizeMode="fit" />
        <Button label="Delete" onClick={() => void handleDeleteOrganization()} resizeMode="fit" />
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
