"use client";
import React from "react";
import { styled } from "styled-components";
import { Button, ButtonType, ContentIconColor, Modal } from "ui/components";
import { type ConfirmationModalProps } from "../../../../modals";
import { useHedgeBuilderStore } from "../store";

export const LeaveHedgeIRRModal: React.FunctionComponent<ConfirmationModalProps> = ({
  onCancel,
  onConfirm,
}) => {
  const { deinitialize } = useHedgeBuilderStore();

  return (
    <>
      <Modal
        title="Are you sure you want to leave Hedge IRR Simulation?"
        description="You have an unsaved Hedge IRR Simulation. All changes will be lost unless you run the simulation."
        icon={{
          color: ContentIconColor.BROWN_100,
          icon: "info",
        }}
        onDismiss={() => null}
      >
        <ButtonsContainer>
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
        </ButtonsContainer>
      </Modal>
    </>
  );
};

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 24px;
  margin-top: 2.5rem;
`;
