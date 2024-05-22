/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { WorkspaceInteractor } from "@/app/interactors";
import { type Workspace } from "@/app/interface";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { WorkspaceCard, type Flag, type MenuProps, type Selectable } from "ui/components";
import { DeleteWorkspaceModal, RenameWorkspaceModal } from "../modals";
import { useAnalysisStore } from "../store/AnalysisStore";

interface Props {
  workspaces: Array<Workspace>;
}

export const WorkspaceList: React.FunctionComponent<Props> = ({ workspaces }) => {
  const router = useRouter();
  const { setShowWorkspace, workspace, setWorkspace, workspaceList, setWorkspaceList } =
    useAnalysisStore();
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setWorkspaceList(workspaces);
  }, [workspaces, setWorkspaceList]);

  const menu = (_workspace: Workspace): MenuProps<Selectable> => {
    return {
      onSelect: (option: Selectable) => {
        if (option.key === "remove") {
          setWorkspace(_workspace);
          setShowDeleteModal(true);
        } else if (option.key === "rename") {
          setWorkspace(_workspace);
          setShowRenameModal(true);
        }
      },
      options: [
        {
          key: "rename",
          value: "Rename",
          icon: "pencil",
        },
        {
          key: "remove",
          value: "Remove workspace",
          icon: "remove",
        },
      ],
    };
  };

  const onAddAnalyses = (workspace: Workspace) => {
    setWorkspace(workspace);
    setShowWorkspace(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const removeWorkspaceAnalyses = async (analysisId: string, workspaceId: string) => {
    const [response] = await WorkspaceInteractor.removeWorkspaceAnalysis(workspaceId, analysisId);
    if (!response) {
      const updatedWorkspaceList = workspaceList?.map((workspace) => {
        if (workspace.workspaceId === workspaceId) {
          const updatedAnalysis = workspace?.analysis?.filter(
            (analysis) => analysis.analysisId !== analysisId
          );
          return {
            ...workspace,
            analysis: updatedAnalysis,
          };
        }
        return workspace;
      });
      setWorkspaceList(updatedWorkspaceList ?? []);
    }
  };

  const WorkspaceView = (workspace: Workspace) => {
    setShowWorkspace(true);
    setWorkspace(workspace);
  };

  return (
    <>
      {workspaceList?.map((workspace) => (
        <WorkspaceCard
          {...workspace}
          analyses={workspace.analysis ?? []}
          title={workspace.name}
          workspaceId={workspace.workspaceId ?? ""}
          key={workspace.workspaceId}
          currency={{
            flag: workspace?.baseCurrency?.countryName as Flag,
            symbol: workspace?.baseCurrency?.code ?? "",
          }}
          menu={menu(workspace)}
          onAdd={() => onAddAnalyses(workspace)}
          onRemove={removeWorkspaceAnalyses}
          onView={() => WorkspaceView(workspace)}
        />
      ))}
      {showRenameModal && workspace && (
        <RenameWorkspaceModal workspace={workspace} onDismiss={() => setShowRenameModal(false)} />
      )}

      {showDeleteModal && workspace && (
        <DeleteWorkspaceModal workspace={workspace} onDismiss={() => setShowDeleteModal(false)} />
      )}
    </>
  );
};
