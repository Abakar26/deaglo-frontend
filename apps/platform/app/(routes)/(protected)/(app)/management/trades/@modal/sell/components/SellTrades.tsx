"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Button, ButtonSize, ButtonType, SideModal } from "ui/components";
import { TradesTable } from "../../../components/TradesTable";
import { useTradesStore } from "../../../store";
import { ButtonGroup, Content, Subtitle, Title } from "../../components/shared";

export function SellTrades() {
  const router = useRouter();

  const clearSelectedTrades = useTradesStore((state) => state.clearSelectedTrades);
  const selectedTradeIds = useTradesStore((state) => state.selectedTradeIds);

  const width = useRef<number>();

  function back() {
    clearSelectedTrades();
    return router.back();
  }

  function request() {
    // TODO: Missing implementation
    return alert("TODO");
  }

  if (typeof window !== "undefined") {
    width.current = document.body.clientWidth * 0.8;
  }

  return (
    <SideModal
      description="Confirm trades to sell. Deaglo team will connect with you later for more details"
      onDismiss={back}
      title="Request Sell Trades Deaglo"
      width={width.current}
    >
      <Content>
        <div>
          <Title>Trades list</Title>
          <Subtitle>Select trades to sell</Subtitle>
        </div>

        <TradesTable hideBar selectable />
      </Content>

      <ButtonGroup>
        <Button
          label="Back"
          resizeMode="fit"
          size={ButtonSize.LARGE}
          type={ButtonType.OUTLINE}
          onClick={back}
        />
        <Button
          disabled={selectedTradeIds.length === 0}
          label="Request"
          onClick={request}
          resizeMode="fit"
          size={ButtonSize.LARGE}
        />
      </ButtonGroup>
    </SideModal>
  );
}
