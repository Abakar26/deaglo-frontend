"use client";

import React, { useEffect, type PropsWithChildren } from "react";
import styled from "styled-components";
import { Color, Typography } from "ui/styles";
import type { Workspace } from "../page";
import { useAnalysisStore } from "../store/AnalysisStore";
import { AddWorkspace } from "./AddWorkspace";
import { WorkspaceList } from "./WorkspaceList";

interface Props {
  count: number;
  workspaces: Array<Workspace>;
}

export const WorkspaceGrid: React.FunctionComponent<PropsWithChildren & Props> = ({
  count,
  workspaces,
}) => {
  const { setWorkspaceCount } = useAnalysisStore();

  useEffect(() => {
    if (count) {
      setWorkspaceCount(count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaces]);

  return (
    <Container>
      Workspaces
      <Grid>
        <WorkspaceList workspaces={workspaces ?? []} />
        <AddWorkspace />
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  ${Typography.SUBHEAD_3};
  color: ${Color.NEUTRAL_700};
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(528px, 1fr));
  grid-auto-rows: 1fr;
`;
