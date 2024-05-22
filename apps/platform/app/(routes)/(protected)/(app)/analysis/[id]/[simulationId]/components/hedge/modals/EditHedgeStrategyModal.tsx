"use client";

import React from "react";
import { Icon, SideModal } from "ui/components";
import { styled } from "styled-components";
import { Color, Typography } from "ui/styles";
import { useHedgeSimulationStore } from "../store";
import { type HedgeSimulation } from "../../../interface";
import { EditEnvironment, EditInvestments, EditScenarios } from "../components";

interface Props {
  simulation: HedgeSimulation;
}

export const EditHedgeStrategyModal: React.FunctionComponent<Props> = ({ simulation }) => {
  const { setEditHedge } = useHedgeSimulationStore();

  return (
    <>
      <SideModal
        title="Editing simulation parameters"
        onDismiss={() => setEditHedge(undefined)}
        width={1070}
      >
        <Warning>
          <Icon name="info" color={Color.BROWN_800} size={20} />
          <WarningBody>
            Changing parameters will start a new simulation and previous results will be lost
          </WarningBody>
        </Warning>
        <EditInvestments startDate={simulation.start} endDate={simulation.end} />
        <EditEnvironment environment={simulation.environment} />
        <EditScenarios fwdPoints={simulation.fwdRates} />
      </SideModal>
    </>
  );
};

const Warning = styled.div`
  gap: 4px;
  display: flex;
  margin-top: 8px;
`;

const WarningBody = styled.span`
  color: ${Color.BROWN_800};
  ${Typography.BODY_3};
`;
