"use client";

import styled from "styled-components";
import { Button, ButtonType } from "ui/components";
import { Color, Typography } from "ui/styles";
import { useTradesStore } from "../store";

export function EditTradesBar() {
  const checkAllTradesSelected = useTradesStore((state) => state.checkAllTradesSelected);
  const clearSelectedTrades = useTradesStore((state) => state.clearSelectedTrades);
  const selectedTradeIds = useTradesStore((state) => state.selectedTradeIds);

  function onEditTrade() {
    // TODO: Add feature when implemented
    return alert("TODO");
  }

  return (
    <Container>
      <Button label="Edit Trades" onClick={onEditTrade} resizeMode="fit" />
      <Button
        type={ButtonType.OUTLINE}
        label="Clear"
        onClick={clearSelectedTrades}
        resizeMode="fit"
      />

      <Description>
        <Counter>
          {checkAllTradesSelected() ? "All " : ""}
          {selectedTradeIds.length}
        </Counter>{" "}
        selected in this page
      </Description>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

const Description = styled.span`
  ${Typography.BODY_1};
  color: ${Color.NEUTRAL_700};
`;

const Counter = styled.b`
  ${Typography.SUBHEAD_1};
`;
