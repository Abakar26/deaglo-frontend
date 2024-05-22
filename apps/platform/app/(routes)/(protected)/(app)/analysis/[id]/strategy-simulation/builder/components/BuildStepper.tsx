"use client";

import { useQueryParams } from "@/app/hooks";
import React from "react";
import styled from "styled-components";
import { BuildStep } from "..";
import { Stepper } from "ui/components";
import { Color } from "ui/styles";
import { useStrategyBuilderStore } from "../store";

export const BuildStepper: React.FunctionComponent = () => {
  const { params, update } = useQueryParams();
  const { completedSteps } = useStrategyBuilderStore();
  const step = (params.get("step") ?? BuildStep.NOTIONAL) as BuildStep;

  return (
    <Container>
      <Stepper
        current={step}
        onSelect={(key) => update("step", key)}
        steps={[
          {
            key: BuildStep.NOTIONAL,
            label: "Select time frame and amount",
            complete: completedSteps.includes(BuildStep.NOTIONAL),
          },
          {
            key: BuildStep.ENVIRONMENT,
            label: "Set environment",
            complete: completedSteps.includes(BuildStep.ENVIRONMENT),
          },
          {
            key: BuildStep.STRATEGY,
            label: "Select strategy",
            complete: completedSteps.includes(BuildStep.STRATEGY),
          },
        ]}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${Color.NEUTRAL_150};
`;
