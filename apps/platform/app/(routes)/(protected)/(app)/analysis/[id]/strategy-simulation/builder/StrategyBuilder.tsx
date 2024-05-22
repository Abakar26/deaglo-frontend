"use client";

import { useQueryParams } from "@/app/hooks";
import { type PartialStrategySimulation } from "@/app/interface";
import React, { useEffect } from "react";
import styled from "styled-components";
import { BuildStepper, Builder } from "./components";
import { useStrategyBuilderStore } from "./store";

interface Props {
  simulation?: PartialStrategySimulation;
  onSave: (simulation: PartialStrategySimulation) => void;
  onAbort?: () => void;
}

export const StrategyBuilder: React.FunctionComponent<Props> = ({
  simulation,
  onSave,
  onAbort,
}) => {
  const { initialize, deinitialize } = useStrategyBuilderStore();
  const { remove } = useQueryParams();

  useEffect(() => {
    initialize(simulation);
  }, []);

  const onComplete = () => {
    const _simulation = deinitialize(simulation);
    if (_simulation) {
      onSave(_simulation);
      remove("step");
      remove("edit");
    }
  };

  const onCancel = () => {
    onAbort?.();
    deinitialize();
  };

  return (
    <Container>
      <BuildStepper />
      <Builder onComplete={onComplete} onCancel={onCancel} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: inherit;
  width: 100%;
`;
