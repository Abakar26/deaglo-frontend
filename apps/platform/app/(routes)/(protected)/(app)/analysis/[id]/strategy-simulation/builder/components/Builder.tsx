"use client";

import { useQueryParams } from "@/app/hooks";
import React from "react";
import styled from "styled-components";
import { BuildStep } from "..";
import { EnvironmentStep, NotionalStep, StrategyStep } from "../steps";
import { MarketDisplay } from "./MarketDisplay";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

export const Builder: React.FunctionComponent<Props> = ({ onComplete, onCancel }) => {
  const { params } = useQueryParams();

  const getBuildStep = (step: string): React.ReactNode => {
    switch (step as BuildStep) {
      case BuildStep.NOTIONAL:
        return <NotionalStep onComplete={onComplete} onCancel={onCancel} />;
      case BuildStep.ENVIRONMENT:
        return <EnvironmentStep onComplete={onComplete} onCancel={onCancel} />;
      case BuildStep.STRATEGY:
        return <StrategyStep onComplete={onComplete} onCancel={onCancel} />;
      default:
        return <NotionalStep onComplete={onComplete} onCancel={onCancel} />;
    }
  };

  return (
    <Container>
      <MarketContainer>
        <MarketDisplay />
      </MarketContainer>
      {getBuildStep(params.get("step") ?? BuildStep.NOTIONAL)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  min-height: inherit;
  position: relative;
`;

const MarketContainer = styled.div`
  position: absolute;
  z-index: 100;
  top: 20px;
  right: 20px;
`;
