"use client";

import { useQueryParams } from "@/app/hooks/useQueryParams";
import { WorkspaceInteractor } from "@/app/interactors";
import React from "react";
import styled from "styled-components";
import { Button, ButtonType } from "ui/components";
import { Typography } from "ui/styles";
import { useAnalysisStore } from "../store/AnalysisStore";

export const AnalysisTabBar: React.FunctionComponent = () => {
  const { params } = useQueryParams();
  const {
    workspace,
    showWorkspace,
    setWorkspace,
    setShowWorkspace,
    workspaceCount,
    analysisCount,
    setCreateAnalysis,
  } = useAnalysisStore();
  const showCreateButton =
    (params.get("status") === "LIVE" && analysisCount > 0) || analysisCount > 0;

  const updateWorkspace = async () => {
    const promises = workspace?.analysis?.map(async (analysis) => {
      const [response, error] = await WorkspaceInteractor.addWorkspaceAnalysis(
        workspace?.workspaceId ?? "",
        analysis.analysisId ?? ""
      );
      if (error) {
        console.error("Error adding analysis to workspace:", error);
        return;
      }
      return response;
    });

    await Promise.all(promises ?? []);
  };

  const setWorkspaceModal = async () => {
    const [response] = await WorkspaceInteractor.get(workspace?.workspaceId ?? "");
    if (response) {
      setWorkspace(response);
    }
  };

  return (
    <Row>
      <Title>
        {analysisCount} {analysisCount === 1 ? "Analysis" : "Analyses"} • {workspaceCount}{" "}
        {workspaceCount === 1 ? "Workspace" : "Workspaces"}
      </Title>
      {workspace && !showWorkspace ? (
        <RowSection>
          <Button
            label={"Cancel"}
            type={ButtonType.OUTLINE}
            resizeMode="fit"
            onClick={() => setWorkspace(undefined)}
          />
          <Button
            label={"Add to workspace"}
            resizeMode="fit"
            onClick={() => {
              updateWorkspace().catch(console.error);
              setWorkspaceModal().catch(console.error);
              setShowWorkspace(true);
            }}
          />
        </RowSection>
      ) : (
        showCreateButton && (
          <Button
            label="Create Analysis"
            onClick={() => setCreateAnalysis(true)}
            resizeMode="fit"
          />
        )
      )}
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 32px 0;
`;

const RowSection = styled.div`
  display: flex;
  gap: 24px;
`;

const Title = styled.p`
  ${Typography.HEADER_2}
`;
