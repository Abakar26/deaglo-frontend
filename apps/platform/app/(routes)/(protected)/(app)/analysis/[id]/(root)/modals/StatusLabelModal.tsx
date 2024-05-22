"use client";

import React, { useState } from "react";
import { styled } from "styled-components";
import {
  Button,
  ButtonType,
  ListOption,
  Modal,
  SimulationStatus,
  StatusLabel,
} from "ui/components";
import { type Simulation } from "../data";
import { useAnalysisDetailStore } from "../store";

type StatusLabelProps = {
  simulation: Simulation;
  onDismiss: () => void;
};

export const StatusLabelModal: React.FunctionComponent<StatusLabelProps> = ({
  simulation,
  onDismiss,
}) => {
  const { addStatusOverride } = useAnalysisDetailStore();
  const [selected, setSelected] = useState<SimulationStatus>(simulation.status);

  const statusOptions = [
    SimulationStatus.READY,
    SimulationStatus.CONFIRMED,
    SimulationStatus.ON_HOLD,
    SimulationStatus.IN_PROGRESS,
    SimulationStatus.NEED_REVIEW,
  ];

  const updateStatus = () => {
    addStatusOverride(simulation.id, selected);
    // TODO: PATCH API
    onDismiss();
  };

  return (
    <Modal
      description="Select status from the list"
      onDismiss={onDismiss}
      title={`Change status in ${simulation.title}`}
    >
      <OptionContainer>
        {statusOptions.map((status) => (
          <ListOption
            key={status}
            label={<StatusLabel status={status} />}
            active={selected === status}
            onClick={() => setSelected(status)}
          />
        ))}
      </OptionContainer>

      <ModalButtonsContainer>
        <Button label="Cancel" type={ButtonType.OUTLINE} onClick={onDismiss} resizeMode="fit" />
        <Button label="Select" onClick={updateStatus} resizeMode="fit" />
      </ModalButtonsContainer>
    </Modal>
  );
};

const ModalButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 24px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;
