"use client";

import type { ReportItem, ReportsType } from "./_mocks";

import { useState } from "react";
import styled from "styled-components";
import { DataTable, TableEntry, TableHeader, TableRow, type SortDescriptor } from "ui/components";
import { Color } from "ui/styles";
import { formatAccounting } from "@/utilities/format";
import { EditableTableCell, EditableTableRow } from "./EditableTableCell";
import { useReportsStore } from "./store";
import { groupItems } from "./utilities";

type ReportsTableProps = {
  type: ReportsType;
};

function sortAmounts(data: ReportItem[], sort: SortDescriptor | undefined) {
  if (!sort) return data;

  type SortKey = "thisYearAmount" | "lastYearAmount";

  const sorting = data.toSorted((a, b) => a[sort.key as SortKey] - b[sort.key as SortKey]);
  return sort.direction === "ascending" ? sorting : sorting.reverse();
}

export function ReportsTable({ type }: ReportsTableProps) {
  const data = useReportsStore((state) => state.reports[type]);

  const [sort, setSort] = useState<SortDescriptor>();

  const sortedItems = sortAmounts(data, sort);
  const { totals, categories } = groupItems(sortedItems);

  const capitalize = (word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

  return (
    <DataTable>
      <thead>
        <TableRow>
          <TableHeader>{capitalize(type)}</TableHeader>
          <TableHeader align="end" sortKey="thisYearAmount" sort={sort} onSort={setSort}>
            This Year
          </TableHeader>
          <TableHeader align="end" sortKey="lastYearAmount" sort={sort} onSort={setSort}>
            Last Year
          </TableHeader>
        </TableRow>
      </thead>
      <tbody>
        <TableRow>
          <TableEntry primary>
            <TotalRowCell>Total {capitalize(type)}</TotalRowCell>
          </TableEntry>
          <TableEntry align="end" primary>
            <TotalRowCell>{formatAccounting(totals.thisYear)}</TotalRowCell>
          </TableEntry>
          <TableEntry align="end" primary>
            <TotalRowCell>{formatAccounting(totals.lastYear)}</TotalRowCell>
          </TableEntry>
        </TableRow>

        {Object.entries(categories).map(([category, { items, totals }]) => (
          <>
            <TableRow key={category}>
              <TableEntry primary>{category}</TableEntry>
              <TableEntry align="end" primary>
                <CategoryValueCell>{formatAccounting(totals.thisYear)}</CategoryValueCell>
              </TableEntry>
              <TableEntry align="end" primary>
                <CategoryValueCell>{formatAccounting(totals.lastYear)}</CategoryValueCell>
              </TableEntry>
            </TableRow>
            {items.map((item) => (
              <EditableTableRow key={item.name}>
                <EditableTableCell type={type} report={item} />
                <TableEntry align="end">{formatAccounting(item.thisYearAmount)}</TableEntry>
                <TableEntry align="end">{formatAccounting(item.lastYearAmount)}</TableEntry>
              </EditableTableRow>
            ))}
          </>
        ))}
      </tbody>
    </DataTable>
  );
}

const TotalRowCell = styled.span`
  color: ${Color.PURPLE_700};
`;

const CategoryValueCell = styled.span`
  color: ${Color.BRAND_900};
`;
