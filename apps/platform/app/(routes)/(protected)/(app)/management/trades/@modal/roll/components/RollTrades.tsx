"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SideModal } from "ui/components";
import { useTradesStore } from "../../../store";
import { Content } from "../../components/shared";
import { SelectTradesStep } from "./SelectTradesStep";
import { SetTimeFrameStep } from "./SetTimeFrameStep";

export function RollTrades() {
  const router = useRouter();

  const clearSelectedTrades = useTradesStore((state) => state.clearSelectedTrades);

  const [step, setStep] = useState(0);

  const width = useRef<number>();

  function close() {
    clearSelectedTrades();
    return router.back();
  }

  function getStep() {
    if (step === 0) {
      const nextStep = () => setStep((step) => step + 1);
      return <SelectTradesStep nextStep={nextStep} />;
    }

    if (step === 1) {
      const previousStep = () => setStep((step) => step - 1);
      return <SetTimeFrameStep previousStep={previousStep} />;
    }

    return null;
  }

  if (typeof window !== "undefined") {
    width.current = document.body.clientWidth * 0.8;
  }

  return (
    <SideModal
      description="Confirm trades to roll. Deaglo team will connect with you later for more details"
      onDismiss={close}
      title="Request Roll Trades Deaglo"
      width={width.current}
    >
      <Content>{getStep()}</Content>
    </SideModal>
  );
}
