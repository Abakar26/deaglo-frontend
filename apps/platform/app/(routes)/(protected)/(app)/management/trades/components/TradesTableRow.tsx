"use client";

import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  TableButton,
  TableButtonCollapsible,
  TableCheckbox,
  TableEntry,
  TableLabel,
  TableRow,
} from "ui/components";
import { formatAccounting, formatNumericDate } from "@/utilities/format";
import { useTradesStore } from "../store";
import { EditableTradeIdCell } from "./EditableTradeIdCell";
import { MarkToMarketChart } from "./MarkToMarketChart";

import { type Derivative, type Leg, type Trade } from "./_mocks";

type TradesTableProps = {
  editable?: boolean;
  editableTradeId?: string;
  editingTrade?: Trade | undefined;
  editTrade?: (field: keyof Trade) => (value: string) => void;
  expandable?: boolean;
  expanded?: boolean;
  hideCharts?: boolean;
  selectable?: boolean;
  setEditableTradeId?: (id: string) => void;
  setEditingTrade?: (trade: Trade) => void;
  toggleExpand?: () => void;
  trade: Trade | Leg | Derivative;
};

export function TradesTableRow({
  editable = false,
  editableTradeId,
  editingTrade,
  editTrade = () => () => undefined,
  expandable = false,
  expanded = false,
  hideCharts = false,
  selectable = false,
  setEditableTradeId = () => undefined,
  setEditingTrade = () => undefined,
  toggleExpand = () => undefined,
  trade,
}: TradesTableProps) {
  const [chartTradeId, setChartTradeId] = useState<string>();
  const [chartAnchor, setChartAnchor] = useState<DOMRect | null>(null);

  const checkSelectedTrades = useTradesStore((state) => state.checkSelectedTrades);
  const selectTrades = useTradesStore((state) => state.selectTrades);

  const selected = checkSelectedTrades([trade.trade_id]);

  function getFixingDateStatus(date: Date) {
    const now = new Date();
    const diff = differenceInCalendarDays(date, now);

    if (diff > 15) return "positive";
    if (diff > 10) return "medium";
    if (diff > 0) return "negative";
    return "expired";
  }

  function openChart(tradeId: string) {
    return function (event: React.MouseEvent<HTMLButtonElement>) {
      const tableCell = (event.target as HTMLButtonElement).closest("td");
      if (tableCell === null) return;

      setChartTradeId(tradeId);
      setChartAnchor(tableCell.getBoundingClientRect());
    };
  }

  const closeChart = () => setChartTradeId(undefined);

  const isSubRow = (trade: Trade | Leg): trade is Leg => (trade as Leg).leg_id !== undefined;

  return (
    <>
      <TableRow
        key={isSubRow(trade) ? trade.leg_id : trade.trade_id}
        $collapsed={isSubRow(trade) && !expanded}
        $level={isSubRow(trade) ? 1 : 0}
        $selected={selectable && selected}
      >
        {selectable ? (
          !isSubRow(trade) ? (
            <TableCheckbox
              active={selected}
              onChange={(checked) => selectTrades([trade.trade_id], checked)}
            />
          ) : (
            <td />
          )
        ) : null}

        {editable && !isSubRow(trade) ? (
          <EditableTradeIdCell
            editable={editingTrade?.id === trade.id}
            hovered={editableTradeId === trade.id}
            label={trade.trade_id}
            value={editingTrade?.trade_id ?? ""}
            onChange={editTrade("trade_id")}
            onClick={() => setEditingTrade(trade)}
            onMouseEnter={() => setEditableTradeId(trade.id)}
            onMouseLeave={() => setEditableTradeId("")}
          />
        ) : (
          <TableEntry primary={!isSubRow(trade)}>
            {isSubRow(trade) ? trade.leg_id : trade.trade_id}
          </TableEntry>
        )}

        {expandable ? (
          <TableButtonCollapsible expanded={expanded} onToggle={toggleExpand}>
            {trade.trade_type}
          </TableButtonCollapsible>
        ) : (
          <TableEntry>{trade.trade_type}</TableEntry>
        )}

        <TableLabel status={getFixingDateStatus(trade.fixing_date)}>
          {formatNumericDate(trade.fixing_date)}
        </TableLabel>

        <TableEntry>{trade.position ?? "N/A"}</TableEntry>

        <TableEntry>{formatNumericDate(trade.execution_date)}</TableEntry>

        <TableEntry>
          {trade.currency_sold.code}-{trade.currency_bought.code}
        </TableEntry>

        <TableEntry>{trade.exposure_id}</TableEntry>

        <TableEntry>{trade.reference ?? "N/A"}</TableEntry>

        <TableEntry>{trade.counterparty}</TableEntry>

        <TableEntry align="end">
          {trade.notional !== null ? formatAccounting(trade.notional) : "N/A"}
        </TableEntry>

        <TableEntry>{formatNumericDate(trade.value_date)}</TableEntry>

        <TableEntry align="end">
          {trade.strike_price !== null ? formatAccounting(trade.strike_price) : "N/A"}
        </TableEntry>

        <TableEntry align="end">
          {trade.spot_ref !== null ? formatAccounting(trade.spot_ref) : "N/A"}
        </TableEntry>

        <TableEntry align="end">
          {trade.premium !== null ? formatAccounting(trade.premium) : "N/A"}
        </TableEntry>

        {!hideCharts ? (
          <TableButton
            align="end"
            icon="chart"
            label={formatAccounting(trade.mtm_day)}
            onClick={openChart(trade.trade_id)}
          />
        ) : (
          <TableEntry align="end">{formatAccounting(trade.mtm_day)}</TableEntry>
        )}
      </TableRow>

      {chartTradeId && chartAnchor !== null
        ? createPortal(
            <MarkToMarketChart anchor={chartAnchor} tradeId={chartTradeId} onClose={closeChart} />,
            document.body
          )
        : null}
    </>
  );
}
