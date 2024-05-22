"use client";

import { WorkspaceInteractor } from "@/app/interactors";
import type { Workspace } from "@/app/interface";
import { useRouter } from "next/navigation";
import React from "react";
import { styled } from "styled-components";
import { Button, ButtonType, ContentIconColor, Modal } from "ui/components";
import { useAnalysisStore } from "../store/AnalysisStore";

type StatusLabelProps = {
  workspace: Workspace;
  onDismiss: () => void;
};

export const DeleteWorkspaceModal: React.FunctionComponent<StatusLabelProps> = ({
  onDismiss,
  workspace,
}) => {
  const router = useRouter();
  const { setWorkspace } = useAnalysisStore();

  const handleDeleteWorkspace = async () => {
    if (!workspace.workspaceId) return;

    const [response, error] = await WorkspaceInteractor.del(workspace.workspaceId);

    if (error) {
      console.error(error);
    }

    if (!response) {
      setWorkspace(undefined);
      onDismiss();
      router.refresh();
      router.push("/analysis");
    }
  };

  return (
    <Modal
      icon={{
        color: ContentIconColor.DANGER_100,
        icon: "trash",
      }}
      onDismiss={onDismiss}
      title={`Delete ${workspace.name}`}
      description="Are you sure you want to delete this workspace?"
    >
      <ModalButtonsContainer>
        <Button label="Cancel" type={ButtonType.OUTLINE} onClick={onDismiss} resizeMode="fit" />
        <Button label="Delete" onClick={() => void handleDeleteWorkspace()} resizeMode="fit" />
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
