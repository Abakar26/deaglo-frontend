"use client";

import React, { Suspense } from "react";
import styled from "styled-components";
import { Icon, SideModal } from "ui/components";
import { Color, Typography } from "ui/styles";
import { EditMarginSimulation, EditMarginSimulationLoader } from "../components";

export const EditMarginSimulationModal: React.FunctionComponent = () => {
  return (
    <SideModal title="Edit Simulation Parameters">
      <Warning>
        <Icon name="info" color={Color.BROWN_800} size={20} />
        <WarningBody>
          Changing parameters will start a new simulation and previous results will be lost
        </WarningBody>
      </Warning>
      <EditMarginSimulation />
    </SideModal>
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
