"use client";

import React from "react";
import styled from "styled-components";
import { StrategyReceiver } from "./components/StrategyReceiver";
import { Button, ButtonType } from "ui/components";
import { useStrategyBuilderStore } from "../../store";
import { useQueryParams } from "@/app/hooks";
import { BuildStep } from "../..";
import { Color, Typography } from "ui/styles";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

export const StrategyStep: React.FunctionComponent<Props> = ({ onComplete, onCancel }) => {
  const { editMode, strategies, completeStep } = useStrategyBuilderStore();
  const { update } = useQueryParams();

  const onBack = () => (editMode ? onCancel() : update("step", BuildStep.ENVIRONMENT));
  const onNext = () => {
    completeStep(BuildStep.STRATEGY);
    onComplete();
  };

  return (
    <Container>
      <Content>
        <TitleSection>
          <Title>Select strategies</Title>
          <Description>
            You can either select up to 4 strategies at once for comparison or create a custom one
          </Description>
        </TitleSection>
        <StrategyReceiver />
      </Content>

      <Row>
        <Button
          label={editMode ? "Cancel" : "Back"}
          type={ButtonType.OUTLINE}
          resizeMode="fit"
          onClick={onBack}
        />
        <Button
          label={editMode ? "Save Parameter" : "Next"}
          resizeMode="fit"
          onClick={onNext}
          disabled={strategies.length === 0}
        />
      </Row>
    </Container>
  );
};

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 24px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.div`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;
