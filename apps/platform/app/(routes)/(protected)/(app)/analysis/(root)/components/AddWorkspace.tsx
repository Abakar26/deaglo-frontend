"use client";

import React from "react";
import styled from "styled-components";
import { InsertArea } from "ui/components";
import { useAnalysisStore } from "../store/AnalysisStore";

export const AddWorkspace: React.FunctionComponent = () => {
  const { setCreateWorkspace } = useAnalysisStore();
  return (
    <Container>
      <InsertArea icon="plus" label="Create Workspace" onClick={() => setCreateWorkspace(true)} />
    </Container>
  );
};

const Container = styled.div`
  min-height: 324px;
`;
