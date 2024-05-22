"use client";

import { useUrl } from "@/app/hooks";
import { type SimulationInstance } from "@/app/interface";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  ContentIcon,
  ContentIconColor,
  Progressbar,
  SimulationType,
  type IconName,
} from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  simulation: SimulationInstance;
}

const progressSpeed: Record<SimulationType, { refetch: number; progress: number }> = {
  [SimulationType.STRATEGY]: { refetch: 10000, progress: 100 },
  [SimulationType.MARGIN]: { refetch: 100000, progress: 1000 },
  [SimulationType.HEDGE]: { refetch: 20000, progress: 200 },
};

export const ProgressDisplay: React.FunctionComponent<Props> = ({ simulation }) => {
  const { backtrack, replace } = useUrl();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    Array(100)
      .fill(null)
      .map((_, index) => {
        setTimeout(() => {
          setProgress((progress) => progress + 0.01);
        }, index * progressSpeed[simulation.type].progress);
      });
    setTimeout(() => location.reload(), progressSpeed[simulation.type].refetch);
  }, []);

  return (
    <Container>
      <ContentIcon {...getContentIcon(simulation.type as SimulationType)} />
      <TitleSection>
        <Title>{simulation.name} is in progress</Title>
        <Description>
          {simulation.type.toLowerCase()} simulations can take up to{" "}
          {getSimulationTime(simulation.type as SimulationType)}
        </Description>
      </TitleSection>
      <ProgressContainer>
        <Progressbar progress={progress} label="Calculating paths..." />
      </ProgressContainer>

      <Row>
        <Button
          type={ButtonType.OUTLINE}
          label="Back to Analysis"
          resizeMode="fit"
          onClick={backtrack}
        />
        <Button
          label="Check your hedge efficiency"
          resizeMode="fit"
          onClick={() => replace("hedge-simulation")}
        />
      </Row>
    </Container>
  );
};

const getContentIcon = (type: SimulationType): { color: ContentIconColor; icon: IconName } => {
  switch (type) {
    case SimulationType.STRATEGY:
      return {
        color: ContentIconColor.BRAND_100,
        icon: "strategy",
      };
    case SimulationType.MARGIN:
      return {
        color: ContentIconColor.BROWN_100,
        icon: "margin",
      };
    case SimulationType.HEDGE:
      return {
        color: ContentIconColor.SUCCESS_100,
        icon: "hedge",
      };
  }
};

const getSimulationTime = (type: SimulationType): string => {
  switch (type) {
    case SimulationType.STRATEGY:
      return "1 minute";
    case SimulationType.MARGIN:
      return "2 minutes";
    case SimulationType.HEDGE:
      return "1 minute";
  }
};

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 40px;
  overflow-y: hidden;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const Title = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};

  &::first-letter {
    text-transform: uppercase;
  }
`;

const ProgressContainer = styled.div`
  width: 200px;
`;

const Row = styled.div`
  display: flex;
  gap: 24px;
  width: max-content;
  margin-top: 24px;
  margin-bottom: 56px;
`;
