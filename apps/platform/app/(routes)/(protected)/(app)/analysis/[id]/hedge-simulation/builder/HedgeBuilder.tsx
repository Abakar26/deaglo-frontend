"use client";

import { type PartialHedgeSimulation } from "@/app/interface";
import React, { useEffect } from "react";
import styled from "styled-components";
import { BuildStepper, Builder } from "./components";
import { useQueryParams } from "@/app/hooks";
import { useHedgeBuilderStore } from "../store";

interface Props {
  simulation?: PartialHedgeSimulation;
  onSave: (simulation: PartialHedgeSimulation) => void;
  onAbort?: () => void;
}

export const HedgeBuilder: React.FunctionComponent<Props> = ({ simulation, onSave, onAbort }) => {
  const { initialize, deinitialize } = useHedgeBuilderStore();
  const { remove } = useQueryParams();

  useEffect(() => {
    initialize(simulation);
  }, []);

  const onComplete = () => {
    console.log('calling this function')
    console.log('this is simulation', simulation)
    const _simulation = deinitialize(simulation);
    console.log('calling this function with simulation, )', _simulation)

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
