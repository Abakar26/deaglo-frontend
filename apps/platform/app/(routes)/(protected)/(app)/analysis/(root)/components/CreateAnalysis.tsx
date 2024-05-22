"use client";

import React from "react";
import styled from "styled-components";
import { Button, ContentIcon, ContentIconColor } from "ui/components";
import { Color, Shadow, Typography } from "ui/styles";
import { useAnalysisStore } from "../store/AnalysisStore";

export const CreateAnalysis: React.FunctionComponent = () => {
  const { setCreateAnalysis } = useAnalysisStore();

  return (
    <Container>
      <ContentIcon color={ContentIconColor.BRAND_100} icon="analysis" />
      <Header>Create Analysis to get started</Header>
      <Subheader>Create Analysis to get started</Subheader>
      <Button label={"Create Analysis"} onClick={() => setCreateAnalysis(true)} resizeMode="fit" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 353px;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${Color.NEUTRAL_00};
  border-radius: 8px;
  ${Shadow.CARD};
`;

const Header = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
  margin-top: 20px;
`;

const Subheader = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
  margin-bottom: 20px;
`;
