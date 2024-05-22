"use client";

import type { Analysis, Strategy } from "@/app/interface";
import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  EditStrategyCard,
  InsertArea,
  SideModal,
  type Leg,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { useStrategyBuilderStore } from "../../../store";
import { usePremiumPricing } from "../hooks";
import { strategyLegAdaptor } from "./CustomStrategyModal";

interface Props {
  strategy: Strategy;
  analysis: Analysis;
  onDismiss: () => void;
}

export const ConfigureStrategyModal: React.FunctionComponent<Props> = ({
  strategy,
  analysis,
  onDismiss,
}) => {
  const { strategies: currentStrategies, setStrategies: setCurrentStrategies } =
    useStrategyBuilderStore();

  const exisitngStrategies = currentStrategies.filter(
    ({ strategyId }) => strategyId === strategy.strategyId
  );

  const [strategies, setStrategies] = useState<Array<Strategy>>(
    exisitngStrategies.length > 0 ? exisitngStrategies : [strategy]
  );

  const { refresh, getPremium, premiumsValid } = usePremiumPricing(strategies);

  const availableSlots =
    4 - currentStrategies.length - (strategies.length - exisitngStrategies.length);

  const onSave = () => {
    const _strategies = currentStrategies.filter((strat) => strat.name !== strategy.name);
    const updated = strategies.map((strategy, strategyIndex) => ({
      ...strategy,
      legs: strategy.legs.map((leg, legIndex) => {
        const premiumData = getPremium(
          leg.strategyLegId,
          legIndex,
          strategy.strategyId,
          strategyIndex
        );

        return {
          ...leg,
          premium: premiumData?.amount ?? 0,
          premiumCurrency: premiumData?.currency ?? "",
        };
      }),
    }));
    setCurrentStrategies([..._strategies, ...updated]);
    onDismiss();
  };

  const onDelete = (index: number) => {
    setStrategies([...strategies.slice(0, index), ...strategies.slice(index + 1)]);
  };

  const onChange = (legId: string, strategy: Strategy, legs: Array<Leg>, index: number) => {
    const legIndex = legs.findIndex((leg) => leg.id === legId);

    const updatedLeg = strategyLegAdaptor(legs).at(legIndex);
    updatedLeg &&
      isLegValid(updatedLeg) &&
      refresh(updatedLeg, legIndex, strategy.strategyId, index).catch((err) => console.error(err));

    setStrategies([
      ...strategies.slice(0, index),
      {
        ...strategy,
        legs: strategyLegAdaptor(legs),
      },
      ...strategies.slice(index + 1),
    ]);
  };

  return (
    <SideModal
      onDismiss={onDismiss}
      title={strategy.name}
      description="System optimized the values for best results"
    >
      <Container>
        {strategies.map((_strategy, index) => (
          <EditStrategyCard
            key={_strategy.strategyId}
            title={`${_strategy.name}-${index + 1}`}
            strategy={_strategy.legs.map((leg, legIndex) => {
              const premiumData = getPremium(
                leg.strategyLegId,
                legIndex,
                _strategy.strategyId,
                index
              );

              return {
                ...leg,
                id: leg.strategyLegId,
                premium: premiumData?.amount,
                premiumCurrency: premiumData?.currency,
                action: leg.isBought ? "Bought" : "Sold",
                title: `${leg.isCall === null ? "Forward" : leg.isCall ? "Call" : "Put"} (${leg.isBought ? "Bought" : "Sold"})`,
              };
            })}
            onChange={(legId, legs) => onChange(legId, _strategy, legs, index)}
            onDelete={() => onDelete(index)}
          />
        ))}
        {availableSlots > 0 && (
          <AddContainer>
            <Label>
              You can add {availableSlots} more product{availableSlots > 1 ? "s" : ""}
            </Label>
            <InsertArea
              label={`Add another ${strategy.name}`}
              icon="plus"
              onClick={() => setStrategies([...strategies, strategy])}
            />
          </AddContainer>
        )}
        <Row>
          <Button label="Cancel" type={ButtonType.OUTLINE} resizeMode="fit" onClick={onDismiss} />
          <Button
            label="Save"
            resizeMode="fit"
            onClick={onSave}
            disabled={
              !premiumsValid() ||
              (availableSlots < 0 && exisitngStrategies.length === 0) ||
              strategies.some((strategy) => strategy.legs.some((leg) => !isLegValid(leg)))
            }
          />
        </Row>
      </Container>
    </SideModal>
  );
};

const isLegValid = (leg: Leg) => {
  if (leg.leverage !== undefined && leg.strike !== undefined) {
    return leg.leverage >= 0 && leg.leverage <= 1 && leg.strike >= -100 && leg.strike <= 100;
  }
  return false;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
  height: 100%;
`;

const AddContainer = styled.div`
  width: 100%;
  min-height: 96px;
  height: 96px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 24px;
  padding-bottom: 24px;
`;

const Label = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;
