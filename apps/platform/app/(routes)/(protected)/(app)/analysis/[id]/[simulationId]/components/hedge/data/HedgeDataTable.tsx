"use client";
import React, { useMemo } from "react";
import { DataSection } from "../../common/DataSection";
import {
  DataTable,
  TableEntry,
  TableHeader,
  TableRow,
  TableInput,
  TableNumber,
} from "ui/components";
import { HedgeResultsKeys, type HedgeResultsSummary } from "@/app/interface";
import { toAccountingFormat } from "@/utilities/conversions";

interface Props {
  data: Record<string, HedgeResultsSummary>;
}

interface TableRows {
  median: Array<number>;
  q1: Array<number>;
  q3: Array<number>;
  min: Array<number>;
  max: Array<number>;
}

const fieldNames: Record<string, string> = {
  median: "Median",
  q1: "Q1",
  q3: "Q3",
  min: "Min",
  max: "Max",
};

export const HedgeDataTable: React.FunctionComponent<Props> = ({ data }) => {
  const rows: TableRows = useMemo(() => {
    return Object.values(data).reduce(
      (prev: TableRows, current: HedgeResultsSummary): TableRows => {
        return {
          median: [...prev.median, current.median],
          q1: [...prev.q1, current.qt25],
          q3: [...prev.q3, current.qt75],
          min: [...prev.min, current.min],
          max: [...prev.max, current.max],
        };
      },
      { median: [], q1: [], q3: [], min: [], max: [] }
    );
  }, [data]);

  return (
    <DataSection>
      <DataTable>
        <thead>
          <TableRow>
            <TableHeader />
            {Object.keys(data).map((distribution) => (
              <TableHeader key={distribution} align="end">
                {distribution}
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {Object.entries(rows).map(([key, row]: [string, Array<number>]) => (
            <TableRow key={key}>
              <TableEntry>{fieldNames[key]}</TableEntry>
              {row.map((value, index) => (
                <TableInput
                  disabled
                  key={index}
                  value={toAccountingFormat(value)}
                  align="end"
                  onChange={() => null}
                />
              ))}
            </TableRow>
          ))}
        </tbody>
      </DataTable>
    </DataSection>
  );
};
