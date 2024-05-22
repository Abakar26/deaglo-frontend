"use client";

import { useQueryParams } from "@/app/hooks";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  DateInput,
  Draggable,
  InsertArea,
  NumberInput,
  SideModal,
} from "ui/components";
import { BuildStep } from "../../..";
import { useHedgeBuilderStore } from "../../../../store";
import { type HarvestEntry } from "../components";
import { usePartialHarvestStore } from "../store";

interface Props {
  onComplete: () => void;
}

export const ManualHarvestModal: React.FunctionComponent<Props> = ({ onComplete }) => {
  const {
    completeStep,
    editMode,
    setHarvest: saveHarvest,
    harvest: savedHarvest,
  } = useHedgeBuilderStore();
  const { harvest, setHarvest, setEditHarvest } = usePartialHarvestStore();
  const { update } = useQueryParams();
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [rows, setRows] = useState<Array<{ date?: Date; amount?: number }>>(
    harvest.length > 0
      ? harvest.map(parseDate)
      : [
        {
          date: undefined,
          amount: undefined,
        },
      ]
  );

  const handleDrop = () => {
    const startEntry = rows.at(start);
    const endEntry = rows.at(end);
    if (startEntry && endEntry) {
      if (start < end) {
        setRows([
          ...rows.slice(0, start),
          endEntry,
          ...rows.slice(start + 1, end),
          startEntry,
          ...rows.slice(end + 1),
        ]);
      } else {
        setRows([
          ...rows.slice(0, end),
          startEntry,
          ...rows.slice(end + 1, start),
          endEntry,
          ...rows.slice(start + 1),
        ]);
      }
    }
  };

  const handleDate = (index: number, date?: Date) => {
    setRows([
      ...rows.slice(0, index),
      { date, amount: rows.at(index)?.amount },
      ...rows.slice(index + 1),
    ]);
  };

  const handleAmount = (index: number, amount?: number) => {
    setRows([
      ...rows.slice(0, index),
      { amount, date: rows.at(index)?.date },
      ...rows.slice(index + 1),
    ]);
  };

  const onCancel = () => {
    setEditHarvest(false);
    const _rows = rows.filter((row) => row.date !== undefined && row.amount !== undefined);
    setHarvest(
      _rows.map(({ date, amount }) => ({ date: format(date!, "yyyy-MM-dd"), amount: amount! }))
    );
  };

  const onNext = () => {
    const _harvest: Array<[string, number]> = rows.map(({ date, amount }) => [
      format(date!, "yyyy-MM-dd"),
      amount!,
    ]);
    saveHarvest(_harvest);
    setHarvest([]);
    completeStep(BuildStep.HARVEST);
    editMode ? onComplete() : update("step", BuildStep.ENVIRONMENT);
  };

  const filled = rows.every((row) => row.date !== undefined || row.amount !== undefined);
  const negative = rows.some((row) => (row.amount ?? 0) < 0);
  const positive = rows.some((row) => (row.amount ?? 0) > 0);

  useEffect(() => setRows(harvest?.map(parseDate)), [harvest]);
  useEffect(
    () => setHarvest(savedHarvest?.map(([date, amount]) => ({ date, amount }))),
    [savedHarvest]
  );

  return (
    <SideModal
      width={700}
      title="Add data manually"
      description={"Input dates and amounts of your investments"}
      onDismiss={() => setEditHarvest(false)}
    >
      <DraggableContainer>
        {rows.map((row, index) => (
          <Draggable key={index} onDrag={() => setStart(index)} onDrop={handleDrop}>
            <DateInput width={350} date={row.date} onChange={(date) => handleDate(index, date)} />
            <NumberInput
              label={"Amount"}
              value={row.amount}
              onChange={(amount) => handleAmount(index, amount)}
            />
            <Button
              leadingIcon="trash"
              onClick={() => setRows([...rows.slice(0, index), ...rows.slice(index + 1)])}
              type={ButtonType.OUTLINE}
              resizeMode="fit"
              disabled={rows.length === 1}
            />
          </Draggable>
        ))}
      </DraggableContainer>
      <InsertContainer>
        <InsertArea
          icon="plus"
          label="Add more rows"
          onClick={() => setRows((r) => [...r, { date: undefined, amount: undefined }])}
        />
      </InsertContainer>
      <Row>
        <Button label="Cancel" onClick={onCancel} type={ButtonType.OUTLINE} resizeMode="fit" />
        <Button
          label={editMode ? "Save Changes" : "Next"}
          onClick={onNext}
          resizeMode="fit"
          disabled={!(filled && negative && positive)}
        />
      </Row>
    </SideModal>
  );
};

export const parseDate = ({ date, amount }: HarvestEntry): { date?: Date; amount?: number } => {
  const parsedAmount = !isNaN(Number(amount)) ? amount : undefined;

  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
  const parsedDate = isValidDate ? new Date(date) : undefined;

  if (parsedDate && !isNaN(parsedDate.getTime())) {
    parsedDate.setUTCHours(12, 0, 0, 0);
  } else {
    return { date: undefined, amount: parsedAmount };
  }

  return {
    date: parsedDate,
    amount: parsedAmount,
  };
};

const DraggableContainer = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const InsertContainer = styled.div`
  display: flex;
  width: calc(100% - 40px);
  margin: 0 20px;
  min-height: 48px;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 24px;
`;
