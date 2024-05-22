"use client";

import MOCKS, { type Derivative, type Leg, type Trade } from "./_mocks";

import { useQueryParams } from "@/app/hooks";
import { useEffect, useState } from "react";
import { DataTable, SuspenseBlock, useExpandedRows, type SortDescriptor } from "ui/components";
import { useTradesStore } from "../store";
import { EditTradesBar } from "./EditTradesBar";
import { RenameTradeBar } from "./RenameTradeBar";
import { TradesTableHeader } from "./TradesTableHeader";
import { TradesTableRow } from "./TradesTableRow";

type TradesTableProps = {
  editable?: boolean;
  expandable?: boolean;
  hideBar?: boolean;
  hideCharts?: boolean;
  rows?: number;
  selectable?: boolean;
};

export function TradesTable({
  editable = false,
  expandable = false,
  hideBar = false,
  hideCharts = false,
  rows,
  selectable = false,
}: TradesTableProps) {
  const { params, update } = useQueryParams();

  const page = parseInt(params.get("page") ?? "1", 10);

  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>();

  const [editableTradeId, setEditableTradeId] = useState("");
  const [editingTrade, setEditingTrade] = useState<Trade>();

  const { isExpandedRow, toggleExpand, resetExpandedRows } = useExpandedRows();

  const clearSelectedTrades = useTradesStore((state) => state.clearSelectedTrades);
  const selectedTradeIds = useTradesStore((state) => state.selectedTradeIds);
  const setTrades = useTradesStore((state) => state.setTrades);
  const trades = useTradesStore((state) => state.trades);

  function getSortDescriptor() {
    const sortString = params.get("sort");
    if (sortString === null) return undefined;

    const [key, direction] = sortString.split(" ");
    return { key, direction } as SortDescriptor;
  }

  function handleSorting(descriptor: SortDescriptor) {
    // TODO: Missing server-side implementation, should fetch when `sort` changes
    const sortString = `${descriptor.key}+${descriptor.direction}`;
    update("sort", sortString);
  }

  function editTrade(field: keyof Trade) {
    return function (value: string) {
      setEditingTrade((current) => {
        if (current === undefined) return current;
        return { ...current, [field]: value };
      });
    };
  }

  function saveEditedTrade() {
    if (!editingTrade) return;

    // TODO: Placeholder, missing server-side implementation
    const existingId = trades.some((trade) => trade.trade_id === editingTrade.trade_id);

    if (!existingId) {
      setTrades(trades.map((trade) => (trade.id === editingTrade.id ? editingTrade : trade)));
    }

    resetEditingTrade();
  }

  function resetEditingTrade() {
    setEditingTrade(undefined);
    setEditableTradeId("");
  }

  function changePage(page: number) {
    setLoading(true);

    clearSelectedTrades();
    resetExpandedRows();

    update("page", page.toString());
    const args = Object.fromEntries(params.entries());

    MOCKS.getTrades(args)
      .then(({ trades }) => setTrades(trades))
      .catch(() => setTrades([]));
  }

  useEffect(() => {
    setLoading(true);

    const args = Object.fromEntries(params.entries());

    MOCKS.getTrades(args)
      .then(({ trades, totalPages }) => {
        setTrades(trades);
        setTotalPages(totalPages);
        setLoading(false);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params, setTrades]);

  const isSubRow = (trade: Trade | Leg): trade is Leg => (trade as Leg).leg_id !== undefined;
  const isExpandableRow = (trade: Trade | Derivative): trade is Derivative =>
    (trade as Derivative).legs !== undefined && (trade as Derivative).legs.length > 0;

  const expandedTrades = trades
    .slice(0, rows)
    .map((trade) => (isExpandableRow(trade) ? [trade, ...trade.legs] : trade))
    .flat();

  function renderBar() {
    if (hideBar) return null;

    if (selectable && selectedTradeIds.length > 0) {
      return <EditTradesBar />;
    }

    if (editable && editingTrade) {
      return <RenameTradeBar onSave={saveEditedTrade} onCancel={resetEditingTrade} />;
    }

    return null;
  }

  return !loading && trades.length > 0 ? (
    <>
      {renderBar()}
      <DataTable
        page={page}
        totalPages={rows ? 1 : totalPages}
        setPage={changePage}
        sticky={[selectable ? 2 : 1, 1]}
      >
        <thead>
          <TradesTableHeader
            onSort={handleSorting}
            selectable={selectable}
            sort={getSortDescriptor()}
          />
        </thead>
        <tbody>
          {expandedTrades.map((trade) => (
            <TradesTableRow
              key={isSubRow(trade) ? trade.leg_id : trade.trade_id}
              editable={editable}
              editableTradeId={editableTradeId}
              editingTrade={editingTrade}
              editTrade={editTrade}
              expandable={expandable && isExpandableRow(trade)}
              expanded={isExpandedRow(trade.trade_id)}
              hideCharts={hideCharts}
              selectable={selectable}
              setEditableTradeId={setEditableTradeId}
              setEditingTrade={setEditingTrade}
              toggleExpand={() => toggleExpand(trade.trade_id)}
              trade={trade}
            />
          ))}
        </tbody>
      </DataTable>
    </>
  ) : (
    <SuspenseBlock height="480px" />
  );
}
