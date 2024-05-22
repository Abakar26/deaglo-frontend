"use client";

import { useState } from "react";

export function useRowSelection(rowIds: string[]) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const isSelectedAll = () => rowIds.every((rowId) => selectedRows.includes(rowId));

  const isSelectedRow = (rowId: string) => selectedRows.includes(rowId);

  function selectAll(checked: boolean) {
    if (!checked) return setSelectedRows([]);
    setSelectedRows(rowIds);
  }

  function selectRow(rowId: string, checked: boolean) {
    setSelectedRows((currentSelection) => {
      return checked
        ? [...currentSelection, rowId]
        : currentSelection.filter((selectedId) => selectedId !== rowId);
    });
  }

  function clearSelection() {
    setSelectedRows([]);
  }

  return {
    selectedRows,
    isSelectedAll,
    isSelectedRow,
    selectAll,
    selectRow,
    clearSelection,
  };
}
