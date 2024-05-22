"use client";

import { type PropsWithChildren } from "react";
import styled from "styled-components";
import { Button, ButtonSize, ButtonType } from "ui/components";
import { Color, Typography } from "ui/styles";
import { ButtonGroup } from "./shared";

export type ReviewStepProps = {
  previousStep: () => void;
  save: () => void;
};

export function ReviewStep({ children, previousStep, save }: PropsWithChildren<ReviewStepProps>) {
  return (
    <>
      <TitleContainer>
        <Title>Preview of your data table</Title>
        <Subtitle>
          Review your data below. Edit the table as necessary to ensure accuracy before proceeding.
        </Subtitle>
      </TitleContainer>

      {children}

      <ButtonGroup>
        <Button
          label="Pick a Different File"
          resizeMode="fit"
          size={ButtonSize.LARGE}
          type={ButtonType.OUTLINE}
          onClick={previousStep}
        />
        <Button label="Confirm" resizeMode="fit" size={ButtonSize.LARGE} onClick={save} />
      </ButtonGroup>
    </>
  );
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.span`
  ${Typography.SUBHEAD_2}
`;

const Subtitle = styled.span`
  ${Typography.BODY_3}
  color: ${Color.NEUTRAL_700};
`;
