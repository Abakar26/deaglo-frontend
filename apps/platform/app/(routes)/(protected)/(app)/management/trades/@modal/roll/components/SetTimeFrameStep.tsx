"use client";

import { Fragment, useState } from "react";
import { Button, ButtonSize, ButtonType, DataTable, TableDateInput, TableRow } from "ui/components";
import { TradesTableHeader } from "../../../components/TradesTableHeader";
import { TradesTableRow } from "../../../components/TradesTableRow";
import { useTradesStore } from "../../../store";
import { ButtonGroup, Subtitle, Title } from "../../components/shared";

type SetTimeFrameStepProps = {
  previousStep: () => void;
};

export function SetTimeFrameStep({ previousStep }: SetTimeFrameStepProps) {
  const clearSelectedTrades = useTradesStore((state) => state.clearSelectedTrades);
  const selectedTradeIds = useTradesStore((state) => state.selectedTradeIds);
  const tradesToRoll = useTradesStore((state) => state.tradesToRoll);

  const [timeFrames, setTimeFrames] = useState<Record<string, Date | undefined>>({});

  function setTimeFrame(tradeId: string) {
    return function (value: Date | undefined) {
      setTimeFrames((current) => ({ ...current, [tradeId]: value }));
    };
  }

  function request() {
    clearSelectedTrades();
    // TODO: Missing implementation
    return alert("TODO");
  }

  return (
    <>
      <div>
        <Title>Set your time frame for trade</Title>
        <Subtitle>Select a time frame to which you would like to roll your positions</Subtitle>
      </div>

      <DataTable sticky={[1, 1]}>
        <thead>
          <TradesTableHeader
            onSort={undefined /* TODO: Sorting for this table is not determined yet. */}
            sort={undefined /* TODO: Sorting for this table is not determined yet. */}
          />
        </thead>
        <tbody>
          {tradesToRoll.map((trade) => (
            <Fragment key={trade.trade_id}>
              <TradesTableRow trade={trade} />
              <TableRow>
                <TableDateInput
                  date={timeFrames[trade.trade_id]}
                  aria-label={`Fixing date for ${trade.trade_id}`}
                  onChange={setTimeFrame(trade.trade_id)}
                />
              </TableRow>
            </Fragment>
          ))}
        </tbody>
      </DataTable>

      <ButtonGroup>
        <Button
          label="Back"
          onClick={previousStep}
          resizeMode="fit"
          size={ButtonSize.LARGE}
          type={ButtonType.OUTLINE}
        />
        <Button
          disabled={selectedTradeIds.length === 0}
          label="Request"
          onClick={request}
          resizeMode="fit"
          size={ButtonSize.LARGE}
        />
      </ButtonGroup>
    </>
  );
}
