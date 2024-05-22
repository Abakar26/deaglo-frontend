"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import { SideModal, Stepper } from "ui/components";
import { ReviewStep } from "./ReviewStep";
import { UploadStep } from "./UploadStep";

const STEPS = [
  {
    key: "upload",
    label: "Upload CSV file",
    complete: false,
  },
  {
    key: "review",
    label: "Repair problems",
    complete: false,
  },
];

type UploadFileProps = {
  type: "trades" | "assets" | "liabilities";
  save: () => void;
  slot: JSX.Element;
};

export function UploadFile({ type, save, slot }: UploadFileProps) {
  const [step, setStep] = useState<string>("upload");
  const [steps, setSteps] = useState(STEPS);

  const width = useRef<number>();

  function toggleStep(key: string, complete: boolean) {
    setSteps((current) => {
      return current.map((step) => (step.key === key ? { ...step, complete } : step));
    });
  }

  function getStepStatus(key: string) {
    const step = steps.find((step) => step.key === key);
    if (!step) return false;
    return step.complete;
  }

  function goToStep(key: string) {
    if (key === step) return;

    setStep(key);
    toggleStep(key, false);
  }

  const capitalize = (word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

  function getStep() {
    if (step === "upload") {
      return (
        <UploadStep
          completed={getStepStatus(step)}
          nextStep={() => goToStep("review")}
          toggleStep={(complete) => toggleStep(step, complete)}
        />
      );
    }

    if (step === "review") {
      return (
        <ReviewStep previousStep={() => goToStep("upload")} save={save}>
          {slot}
        </ReviewStep>
      );
    }
  }

  if (typeof window !== "undefined") {
    width.current = document.body.clientWidth * (step === "review" ? 0.8 : 0.5);
  }

  return (
    <SideModal
      title={`Upload Your ${capitalize(type)} with CSV File`}
      description="Select as many foward scenarios that you prefer."
      width={width.current}
    >
      <ContentContainer>
        <Stepper steps={steps} current={step} onSelect={goToStep} />

        {getStep()}
      </ContentContainer>
    </SideModal>
  );
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  margin-top: 24px;
`;
