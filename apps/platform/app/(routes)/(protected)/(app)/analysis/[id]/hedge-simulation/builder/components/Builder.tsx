"use client";

import { useQueryParams } from "@/app/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { BuildStep } from "..";
import { EnvironmentStep, FWDRatesStep, HarvestStep } from "../steps";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

export const Builder: React.FunctionComponent<Props> = ({ onComplete, onCancel }) => {
  const { params } = useQueryParams();
  const router = useRouter();

  const getBuildStep = (step: string): React.ReactNode => {
    switch (step as BuildStep) {
      case BuildStep.HARVEST:
        return <HarvestStep onComplete={onComplete} onCancel={() => router.back()} />;
      case BuildStep.ENVIRONMENT:
        return <EnvironmentStep onComplete={onComplete} onCancel={onCancel} />;
      case BuildStep.FWD_RATES:
        return <FWDRatesStep onComplete={onComplete} onCancel={onCancel} />;
    }
  };

  return <Container>{getBuildStep(params.get("step") ?? BuildStep.HARVEST)}</Container>;
};

const Container = styled.div`
  padding: 20px;
`;
