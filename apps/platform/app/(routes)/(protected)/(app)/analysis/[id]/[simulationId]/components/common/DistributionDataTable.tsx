"use client";

import { type ResultsSummary } from "@/app/interface";
import { capitalizeFirstLetter } from "@/utilities";
import { toAccountingFormat } from "@/utilities/conversions";
import React from "react";
import { DataTable, TableEntry, TableHeader, TableNumber, TableRow } from "ui/components";
import { DataSection } from ".";

interface Props {
  data: Record<string, ResultsSummary>;
}

type ResultsKey = "median" | "average" | "qt25" | "qt75" | "qt90" | "qt95";

const fieldNames: Record<ResultsKey, string> = {
  average: "Mean",
  median: "Median",
  qt25: "25th qt",
  qt75: "75th qt",
  qt90: "90th qt",
  qt95: "95th qt",
};

export const DistributionDataTable: React.FunctionComponent<Props> = ({ data }) => {
  return (
    <DataSection>
      <DataTable>
        <thead>
          <TableRow>
            <TableHeader />
            {Object.keys(data).map((name) => (
              <TableHeader key={name} align="end">
                {capitalizeFirstLetter(name)}
              </TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {Object.entries(fieldNames).map(([key, row]) => (
            <TableRow key={key}>
              <TableEntry>{row}</TableEntry>
              {Object.values(data).map((value, index) => (
                <TableNumber
                  formatter={toAccountingFormat}
                  disabled
                  key={index}
                  value={value[key as ResultsKey]}
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
