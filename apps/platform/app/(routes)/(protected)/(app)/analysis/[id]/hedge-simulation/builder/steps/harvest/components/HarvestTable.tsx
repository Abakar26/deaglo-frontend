"use client";

import { formatAccounting } from "@/utilities";
import React from "react";
import styled from "styled-components";
import { DataTable, TableDateInput, TableHeader, TableNumber, TableRow } from "ui/components";
import { Color } from "ui/styles";

interface Props {
  data: Array<{ date?: Date; amount?: number }>;
  onChange: (data: Array<{ date?: Date; amount?: number }>) => void;
}

export const HarvestTable: React.FunctionComponent<Props> = ({ data, onChange }) => {
  const onDateChange = (index: number, date?: Date) => {
    onChange([
      ...data.slice(0, index),
      { date, amount: data.at(index)?.amount },
      ...data.slice(index + 1),
    ]);
  };

  const onAmountChange = (index: number, amount?: number) => {
    onChange([
      ...data.slice(0, index),
      { amount, date: data.at(index)?.date },
      ...data.slice(index + 1),
    ]);
  };

  return (
    <>
      <Border>
        <DataTable>
          <thead>
            <TableRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>Amount</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {data.map(({ date, amount }, index) => (
              <TableRow key={`${date?.toString()}-${index}`}>
                <TableDateInput
                  date={date}
                  onChange={(date) => onDateChange(index, date)}
                  error={date === undefined}
                />
                <TableNumber
                  value={amount}
                  onChange={(amount) => onAmountChange(index, amount)}
                  error={amount === undefined}
                  formatter={(val) => formatAccounting(val, 0)}
                />
              </TableRow>
            ))}
          </tbody>
        </DataTable>
      </Border>
    </>
  );
};

const Border = styled.div`
  border: 1px solid ${Color.NEUTRAL_300};
`;
