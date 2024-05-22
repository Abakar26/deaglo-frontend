"use client";

import { useQueryParams } from "@/app/hooks";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, SideModal } from "ui/components";
import { Color, Typography } from "ui/styles";
import { BuildStep } from "../../..";
import { useHedgeBuilderStore } from "../../../../store";
import { HarvestTable } from "../components";
import { useCSVParser } from "../hooks";
import { usePartialHarvestStore } from "../store";
import { parseDate } from "./ManualHavestModal";

interface Props {
  onComplete: () => void;
}

export const HarvestModal: React.FunctionComponent<Props> = ({ onComplete }) => {
  const {
    setFileName,
    setHarvest: saveHarvest,
    harvest: savedHarvest,
    completeStep,
    editMode,
    name,
  } = useHedgeBuilderStore();
  const { harvest, setHarvest, setEditHarvest } = usePartialHarvestStore();
  const [harvestForm, setHarvestForm] = useState<Array<{ date?: Date; amount?: number }>>(
    harvest.map(parseDate)
  );
  const [errors, setErrors] = useState<Array<string>>([]);
  const { update } = useQueryParams();
  const input = useRef<HTMLInputElement>(null);
  const uploadFile = () => input.current?.click();
  const { parse } = useCSVParser<[string, string]>();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      parse(file, (data, errors) => {
        if (errors.length) {
          setErrors(["Invalid csv format, please select a different file"]);
        } else {
          setErrors([]);
          setFileName(file.name);
          setHarvest(data.map(([date, amount]) => ({ date, amount: parseFloat(amount) })));
        }
      });
    }
  };

  useEffect(() => {
    const data = harvestForm;
    setHarvestForm(data);
    const negative = data.some((entry) => (entry.amount ?? 0) < 0);
    const positive = data.some((entry) => (entry.amount ?? 0) > 0);
    const valid = !data.some(({ date }) => date === undefined);
    if (!negative) {
      setErrors((e) => [...e, "Harvest Data must contain at least 1 negative value"]);
    }
    if (!positive) {
      setErrors((e) => [...e, "Harvest Data must contain at least 1 positive value"]);
    }
    if (!valid) {
      setErrors((e) => [...e, "Date format should be YYYY-MM-DD"]);
    }
    if (negative && positive && valid) {
      setErrors([]);
    }
  }, [harvestForm]);

  useEffect(() => setHarvestForm(harvest.map(parseDate)), [harvest]);
  // useEffect(() => { savedHarvest.length && setHarvest(savedHarvest.map(([date, amount]) => ({ date, amount }))) }, [savedHarvest]);

  const onNext = () => {
    if (name) {
      const _harvest: Array<[string, number]> = harvestForm.map(({ date, amount }) => [
        format(date!, "yyyy-MM-dd"),
        amount!,
      ]);
      saveHarvest(_harvest);
      completeStep(BuildStep.HARVEST);
      editMode ? onComplete() : update("step", BuildStep.ENVIRONMENT);
      setTimeout(() => setHarvest([]), 300);
    } else {
      setEditHarvest(false);
    }
  };

  return (
    <SideModal width={700} title="Edit Your CSV File" onDismiss={() => setEditHarvest(false)}>
      <TableContainer>
        <Section>
          <Title>Preview of your data</Title>
          <Description>
            Review your data below. Edit the table as necessary to ensure accuracy before
            proceeding.
          </Description>
        </Section>
        <HarvestTable data={harvestForm} onChange={setHarvestForm} />
      </TableContainer>
      <Section>
        {!errors.length ? (
          <Success>All entries are formatted correctly</Success>
        ) : (
          <>
            <Error bold>{`${errors.length} error${errors.length > 1 ? "s" : ""} occurred`}</Error>
            {errors.map((error, index) => (
              <Error key={index}>{error}</Error>
            ))}
          </>
        )}
      </Section>
      <Row>
        <Button
          label="Pick a different file"
          onClick={uploadFile}
          type={ButtonType.OUTLINE}
          resizeMode="fit"
        />
        <Button label="Cancel" onClick={() => setEditHarvest(false)} resizeMode="fit" />
        <Button disabled={!!errors.length} label={"Next"} onClick={onNext} resizeMode="fit" />
      </Row>
      <FileInput ref={input} type="file" accept=".csv" multiple={false} onChange={onFile} />
    </SideModal>
  );
};

const Title = styled.span`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 24px;
  margin-top: 16px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${Color.NEUTRAL_400};
  border-radius: 8px;
  margin-top: 24px;
  margin-bottom: 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Success = styled.span`
  ${Typography.LABEL_3};
  color: ${Color.SUCCESS_700};
`;

const Error = styled.span<{ bold?: boolean }>`
  color: ${Color.DANGER_700};
  ${(props) => (props.bold ? Typography.LABEL_3 : Typography.LABEL_4)};
`;

const FileInput = styled.input`
  display: none;
`;
