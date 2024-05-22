"use client";

import { AnalysisInteractor } from "@/app/interactors";
import type { Analysis } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { styled } from "styled-components";
import {
  Button,
  ButtonType,
  ButtonVariant,
  ContentIconColor,
  Modal,
  SnackbarLevel,
} from "ui/components";

type StatusLabelProps = {
  analysis: Analysis;
  onDismiss: () => void;
};

export const DeleteAnalysisModal: React.FunctionComponent<StatusLabelProps> = ({
  onDismiss,
  analysis,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setSnack } = useSnackbarStore();

  const handleDeleteAnalysis = async () => {
    setLoading(true);
    const [response, error] = await AnalysisInteractor.del(analysis.analysisId);

    setLoading(false);
    if (error) {
      console.error(error);
      setSnack({
        message: "Couldn't delete analysis.",
        icon: "x",
        duration: 5,
      });
    }

    if (response === false) {
      router.refresh();
      router.push("/analysis");
      setSnack({
        message: "Analysis deleted successfully.",
        level: SnackbarLevel.SUCCESS,
        icon: "circle-check",
        duration: 5,
      });
    }
  };

  return (
    <Modal
      icon={{
        color: ContentIconColor.DANGER_100,
        icon: "trash",
      }}
      onDismiss={onDismiss}
      title={`Delete ${analysis.name}`}
      description="Are you sure you want to delete this analysis?"
    >
      <ModalButtonsContainer>
        <Button label="Cancel" type={ButtonType.OUTLINE} onClick={onDismiss} resizeMode="fit" />
        <Button
          variant={ButtonVariant.DANGER}
          loading={loading}
          label="Delete"
          onClick={() => void handleDeleteAnalysis()}
          resizeMode="fit"
        />
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
