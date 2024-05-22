"use client";

import React from "react";
import { Label, LabelColor, LabelType } from "..";

export enum SimulationStatus {
  ENQUEUED = "ENQUEUED",
  IN_PROGRESS = "IN PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

interface Props {
  status: SimulationStatus;
  outline?: boolean;
}

export const StatusLabel: React.FunctionComponent<Props> = ({ status, outline = false }) => {
  return <Label {...getStatusLabel(status)} {...(outline ? { type: LabelType.OUTLINE } : {})} />;
};

const getStatusLabel = (
  status: SimulationStatus
): { color: LabelColor; label: string; type: LabelType } => {
  switch (status) {
    case SimulationStatus.COMPLETED:
      return {
        label: "Completed",
        color: LabelColor.SUCCESS,
        type: LabelType.FILL,
      };
    case SimulationStatus.IN_PROGRESS:
      return {
        label: "In progress",
        color: LabelColor.BROWN,
        type: LabelType.BLANK,
      };
    case SimulationStatus.ENQUEUED:
      return {
        label: "Enqueued",
        color: LabelColor.NEUTRAL,
        type: LabelType.BLANK,
      };
    case SimulationStatus.FAILED:
      return {
        label: "Failed",
        color: LabelColor.DANGER,
        type: LabelType.FILL,
      };
  }
};
