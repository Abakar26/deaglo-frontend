"use client";

import { useRouter } from "next/navigation";
import { Button, ButtonSize, ButtonType } from "ui/components";
import { TradesTable } from "../../../components/TradesTable";
import { useTradesStore } from "../../../store";
import { ButtonGroup, Subtitle, Title } from "../../components/shared";

type SelectTradesStepProps = {
  nextStep: () => void;
};

export function SelectTradesStep({ nextStep }: SelectTradesStepProps) {
  const router = useRouter();

  const clearSelectedTrades = useTradesStore((state) => state.clearSelectedTrades);
  const selectedTradeIds = useTradesStore((state) => state.selectedTradeIds);
  const selectTradesToRoll = useTradesStore((state) => state.selectTradesToRoll);

  function back() {
    clearSelectedTrades();
    return router.back();
  }

  function next() {
    selectTradesToRoll(selectedTradeIds);
    nextStep();
  }

  return (
    <>
      <div>
        <Title>Trades list</Title>
        <Subtitle>Select trades to roll</Subtitle>
      </div>

      <TradesTable hideBar selectable />

      <ButtonGroup>
        <Button
          label="Back"
          onClick={back}
          resizeMode="fit"
          size={ButtonSize.LARGE}
          type={ButtonType.OUTLINE}
        />
        <Button
          disabled={selectedTradeIds.length === 0}
          label="Next"
          onClick={next}
          resizeMode="fit"
          size={ButtonSize.LARGE}
        />
      </ButtonGroup>
    </>
  );
}
