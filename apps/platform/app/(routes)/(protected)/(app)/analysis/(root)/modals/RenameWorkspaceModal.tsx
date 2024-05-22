"use client";

import { WorkspaceInteractor } from "@/app/interactors";
import type { Workspace } from "@/app/interface";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, Modal, TextInput } from "ui/components";
import { useAnalysisStore } from "../store/AnalysisStore";

interface Props {
  workspace: Workspace;
  onDismiss: () => void;
}

export const RenameWorkspaceModal: React.FunctionComponent<Props> = ({ onDismiss, workspace }) => {
  const router = useRouter();
  const { setWorkspace, workspaceList, setWorkspaceList } = useAnalysisStore();
  const [name, setName] = useState<string>(workspace.name);

  const handleRenameWorkspace = async () => {
    if (!workspace.workspaceId) return;

    const [response, error] = await WorkspaceInteractor.update(workspace.workspaceId, {
      ...workspace,
      name,
    });

    if (error) {
      console.error(error);
    }

    if (response) {
      setWorkspace(undefined);
      const newWorkspaceList = workspaceList ?? [];
      const index = newWorkspaceList?.findIndex(
        (item) => item.workspaceId === workspace.workspaceId
      );
      if (index !== -1) {
        newWorkspaceList[index] = {
          ...newWorkspaceList[index],
          name,
        };
        setWorkspaceList(newWorkspaceList);
      }
      onDismiss();
      router.refresh();
      router.push("/analysis");
    }
  };

  return (
    <Modal
      title={"Rename Workspace"}
      description={"Enter the new name for your workspace"}
      onDismiss={onDismiss}
    >
      <TextInput
        label={"New Name"}
        placeholder="New workspace name"
        value={name}
        onChange={setName}
      />
      <Row>
        <Button label="Cancel" onClick={onDismiss} type={ButtonType.OUTLINE} resizeMode="fit" />
        <Button
          label="Rename Workspace"
          onClick={() => (name !== workspace.name ? void handleRenameWorkspace() : onDismiss())}
          resizeMode="fit"
          disabled={!name}
        />
      </Row>
    </Modal>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: end;
  gap: 24px;
`;
