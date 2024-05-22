"use client";

import { useQueryParams } from "@/app/hooks";
import React from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  ContentBlock,
  ContentColor,
  ContentIconColor,
  TextInput,
  useValidation,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { BuildStep } from "../..";
import { useHedgeBuilderStore } from "../../../store";
import { HarvestUpload, type HarvestEntry } from "./components";
import { HarvestModal, ManualHarvestModal } from "./modals";
import { usePartialHarvestStore } from "./store";
import { NameObject } from "./validation";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

export const HarvestStep: React.FunctionComponent<Props> = ({ onComplete, onCancel }) => {
  const {
    fileName,
    name,
    setName,
    editMode,
    harvest: savedHarvest,
    completeStep,
  } = useHedgeBuilderStore();
  const { harvest, setHarvest, editHarvest, setEditHarvest } = usePartialHarvestStore();
  const { validate, errors } = useValidation(NameObject);
  const { update } = useQueryParams();

  const onNameChange = (name: string) => {
    validate({ name }, ({ name: validName }) => setName(validName));
  };

  const handleHarvest = (harvest: Array<HarvestEntry>) => {
    setHarvest(harvest);
    setEditHarvest(true);
  };

  const onNext = () => {
    if (savedHarvest) {
      completeStep(BuildStep.HARVEST);
      editMode ? onComplete() : update("step", BuildStep.ENVIRONMENT);
    } else {
      setEditHarvest(true);
    }
  };

  return (
    <Container>
      <Content>
        <Section>
          <Title>Enter a name for this simulation</Title>
          <TextInput
            label={"Name"}
            placeholder={"Simulation Name"}
            value={name}
            onChange={onNameChange}
            error={errors.name}
          />
        </Section>

        <Section>
          <Title>Upload Investment</Title>
          <Body>
            Input deployments (negative values) and harvests (positive values) to run Hedge IRR
            simulation on your cash flows.
          </Body>
        </Section>

        <HarvestUpload onHarvest={handleHarvest} />

        {fileName === undefined && (
          <>
            <Divider>
              <Line />
              <Body>OR</Body>
              <Line />
            </Divider>
            <ContentBlock
              title="Add investments manually"
              description="Input dates and amounts of your investments "
              icon={{
                icon: "pencil",
                color: ContentIconColor.BRAND_100,
              }}
              color={ContentColor.NEUTRAL_00}
              action={{
                label: "Add data",
                onClick: () => setEditHarvest(true),
                asButton: true,
              }}
            />
          </>
        )}

        {editHarvest &&
          (fileName ? (
            <HarvestModal onComplete={onComplete} />
          ) : (
            <ManualHarvestModal onComplete={onComplete} />
          ))}
      </Content>
      <Row>
        <Button
          onClick={onCancel}
          type={ButtonType.OUTLINE}
          label={editMode ? "Cancel" : "Back"}
          // disabled={!editMode}
          resizeMode="fit"
        />
        <Button
          onClick={onNext}
          disabled={!savedHarvest || harvest.length === 0 || !name}
          label={editMode ? "Save Parameter" : "Next"}
          resizeMode="fit"
        />
      </Row>
    </Container>
  );
};

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${Color.NEUTRAL_400};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: calc(100vh - 220px);
  gap: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Body = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  /* width: 485px; */
`;

const Row = styled.div<{ end?: boolean }>`
  display: flex;
  width: 100%;
  gap: 24px;
  justify-content: end;
`;
