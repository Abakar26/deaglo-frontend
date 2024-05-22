"use client";
import React from "react";
import { styled } from "styled-components";
import { Button, ButtonType, ContentIconColor, Modal } from "ui/components";
import { type ConfirmationModalProps } from "../../../../modals";
import { useStrategyBuilderStore } from "../builder/store";
import { OverviewControls } from "../components";

export const LeaveStrategySimulationModal: React.FunctionComponent<ConfirmationModalProps> = ({
  onCancel,
  onConfirm,
}) => {
  const { deinitialize } = useStrategyBuilderStore();

  return (
    <>
      <Modal
        title="Are you sure you want to leave Strategy Simulation?"
        description="You have an unsaved Strategy Simulation. All changes will be lost unless you run the simulation."
        icon={{
          color: ContentIconColor.BROWN_100,
          icon: "info",
        }}
        onDismiss={() => null}
      >
        <ButtonsContainer>
          <OverviewControls>
            <Button
              label="Leave Simulation"
              type={ButtonType.OUTLINE}
              resizeMode="fit"
              onClick={() => {
                deinitialize();
                onConfirm();
              }}
            />
            <Button label="Continue Simulation" resizeMode="fit" onClick={onCancel} />
          </OverviewControls>
        </ButtonsContainer>
      </Modal>
    </>
  );
};

const ButtonsContainer = styled.div`
  margin-top: 2.5rem;
`;
