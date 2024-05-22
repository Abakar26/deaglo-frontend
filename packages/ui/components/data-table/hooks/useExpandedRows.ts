import { useState } from "react";

export function useExpandedRows() {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const isExpandedRow = (rowId: string) => expandedRows.includes(rowId);

  function toggleExpand(rowId: string) {
    setExpandedRows((current) => {
      return isExpandedRow(rowId) ? current.filter((row) => row !== rowId) : [...current, rowId];
    });
  }

  function resetExpandedRows() {
    setExpandedRows([]);
  }

  return {
    isExpandedRow,
    toggleExpand,
    resetExpandedRows,
  };
}
