"use client";
import { useConfirmationStore } from "@/app/(routes)/(protected)/(app)/store";
import { SimulationInteractor } from "@/app/interactors";
import { type PartialStrategySimulation } from "@/app/interface";
import { format, parseISO } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { styled } from "styled-components";
import { Button, ButtonSize, ButtonType, SmallButton } from "ui/components";
import { Color, Typography } from "ui/styles";
import { BuildStep } from "../../builder";
import {
  OverviewAmount,
  OverviewControls,
  OverviewEnvironment,
  OverviewStrategies,
} from "../index";

interface Props {
  strategy: PartialStrategySimulation;
  onEdit: (step: BuildStep) => void;
}

export const StrategyOverview: React.FunctionComponent<Props> = ({ strategy, onEdit }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const pathname = usePathname();
  const router = useRouter();
  const { unregisterModal } = useConfirmationStore();

  const runSimulation = async () => {
    setLoading(true);
    unregisterModal("/strategy-simulation");
    const analysisId = pathname.split("/").at(-2) ?? "";
    const [success, error] = await SimulationInteractor.strategy.create(analysisId, strategy);
    success && router.push(`/analysis/${analysisId}/STRATEGY_${success.id}`);
    if (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <MainHeader>Overview</MainHeader>
      <Para>Review the details below and apply any necessary changes.</Para>

      <HeadingContainer>
        <SubHeading2>Name</SubHeading2>
        <SmallButton
          label="Edit"
          leadingIcon="pencil"
          size={ButtonSize.SMALL}
          onClick={() => onEdit(BuildStep.NOTIONAL)}
        ></SmallButton>
      </HeadingContainer>
      <SubHeading3>{strategy.name}</SubHeading3>

      <HeadingContainer>
        <SubHeading2>Time frame</SubHeading2>
        <SmallButton
          label="Edit"
          leadingIcon="pencil"
          size={ButtonSize.SMALL}
          onClick={() => onEdit(BuildStep.NOTIONAL)}
        ></SmallButton>
      </HeadingContainer>
      <SubHeading3>
        {format(parseISO(strategy.startDate), "MMMM d, yyyy")} -{" "}
        {format(parseISO(strategy.endDate), "MMMM d, yyyy")}
      </SubHeading3>

      <HeadingContainer>
        <SubHeading2>Amount</SubHeading2>
        <SmallButton
          label="Edit"
          leadingIcon="pencil"
          size={ButtonSize.SMALL}
          onClick={() => onEdit(BuildStep.NOTIONAL)}
        ></SmallButton>
      </HeadingContainer>
      <ItemContainer>
        <OverviewAmount amount={strategy.notional} />
      </ItemContainer>

      <HeadingContainer>
        <SubHeading2>Selected Environment</SubHeading2>
        <SmallButton
          label="Edit"
          leadingIcon="pencil"
          size={ButtonSize.SMALL}
          onClick={() => onEdit(BuildStep.ENVIRONMENT)}
        ></SmallButton>
      </HeadingContainer>
      <ItemContainer>
        {/* <SubHeading2>{strategy.simulationEnvironment.name}</SubHeading2> */}
        <OverviewEnvironment environment={strategy.simulationEnvironment} />
      </ItemContainer>

      <HeadingContainer>
        <SubHeading2>Strategies</SubHeading2>
        <SmallButton
          label="Edit"
          leadingIcon="pencil"
          size={ButtonSize.SMALL}
          onClick={() => onEdit(BuildStep.STRATEGY)}
        ></SmallButton>
      </HeadingContainer>
      <OverviewStrategies strategy={strategy} />

      <OverviewControls>
        <ParaContainer>
          <Para>Running a strategy simulation can take up to 1 minute</Para>
        </ParaContainer>
        <Button
          label="Back"
          type={ButtonType.OUTLINE}
          resizeMode="fit"
          onClick={() => onEdit(BuildStep.STRATEGY)}
        />
        <Button
          label="Simulate"
          resizeMode="fit"
          onClick={() => void runSimulation()}
          loading={loading}
        />
      </OverviewControls>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MainHeader = styled.h2`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Para = styled.span`
  ${Typography.BODY_3}
  color: ${Color.NEUTRAL_700};
  text-align: end;
  width: min-content;
  white-space: nowrap;
`;

const SubHeading2 = styled.h3`
  ${Typography.SUBHEAD_1}
  color: ${Color.NEUTRAL_900};
`;

const SubHeading3 = styled.h3`
  ${Typography.SUBHEAD_3}
  color: ${Color.NEUTRAL_900};
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-self: stretch;
  margin-top: 24px;
  margin-bottom: 16px;
  gap: 16px;
`;

const ItemContainer = styled.div`
  width: max-content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  background: ${Color.NEUTRAL_00};
`;

const ParaContainer = styled.div`
  margin: auto 0;
`;
