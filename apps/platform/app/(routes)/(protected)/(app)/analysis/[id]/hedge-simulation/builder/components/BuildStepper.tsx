"use client";

import { useQueryParams } from "@/app/hooks";
import React from "react";
import styled from "styled-components";
import { BuildStep } from "..";
import { Stepper } from "ui/components";
import { useHedgeBuilderStore } from "../../store";
import { Color } from "ui/styles";

export const BuildStepper: React.FunctionComponent = () => {
  const { params, update } = useQueryParams();
  const { completedSteps } = useHedgeBuilderStore();
  const step = (params.get("step") ?? BuildStep.HARVEST) as BuildStep;

  return (
    <Container>
      <Stepper
        current={step}
        onSelect={(key) => update("step", key)}
        steps={[
          {
            key: BuildStep.HARVEST,
            label: "Upload Investments",
            complete: completedSteps.includes(BuildStep.HARVEST),
          },
          {
            key: BuildStep.ENVIRONMENT,
            label: "Choose Best Environment",
            complete: completedSteps.includes(BuildStep.ENVIRONMENT),
          },
          {
            key: BuildStep.FWD_RATES,
            label: "Scenario Setting",
            complete: completedSteps.includes(BuildStep.FWD_RATES),
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
