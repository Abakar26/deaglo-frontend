"use client";

import type { Leg, Strategy } from "@/app/interface";
import { useState } from "react";
import styled from "styled-components";
import { DropdownSelect, InsertArea, PayoffGraph, Toggle, type Selectable } from "ui/components";
import { Color, Typography } from "ui/styles";
import {
  Card,
  CardGroup,
  CardTitle,
  DropdownContainer,
  HeaderSpacer,
  LargeChart,
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from "../shared";
import { DerivativeForm } from "./DerivativeForm";
import {
  applyStrategyFlipLogic,
  exposureDirectionOptions,
  getPayoffGraphProps,
  overrideStrategyDefaults,
} from "./utilities";

type StrategiesSectionProps = {
  strategies: Strategy[];
};

const CUSTOM_STRATEGY: Strategy = {
  dateAdded: "",
  description: "",
  isCustom: true,
  legs: [],
  name: "Custom strategy",
  strategyId: crypto.randomUUID(),
};

const DERIVATIVE_LIMIT = 4;

export function StrategiesSection({ strategies }: StrategiesSectionProps) {
  const overriddenStrategies = strategies.map(overrideStrategyDefaults);
  const defaultStrategies = overriddenStrategies.filter((strategy) => strategy.legs.length > 1);
  const initialStrategy = defaultStrategies[0] ?? CUSTOM_STRATEGY;

  const [loadedStrategies, setLoadedStrategies] = useState(
    new Map([[initialStrategy.strategyId, initialStrategy]])
  );
  const [selectedStrategyId, setSelectedStrategyId] = useState(initialStrategy.strategyId);
  const [previousStrategyId, setPreviousStrategyId] = useState(initialStrategy.strategyId);

  const [direction, setDirection] = useState(exposureDirectionOptions[0]);

  const selectedStrategy = applyStrategyFlipLogic(
    loadedStrategies.get(selectedStrategyId) ?? initialStrategy,
    direction?.key
  );

  const isCustom = selectedStrategyId === CUSTOM_STRATEGY.strategyId;
  const canAddDerivatives = isCustom && selectedStrategy.legs.length < DERIVATIVE_LIMIT;
  const remainingDerivatives = DERIVATIVE_LIMIT - selectedStrategy.legs.length;

  const strategyToSelectable = (strategy: Strategy): Selectable => {
    return { key: strategy.strategyId, value: strategy.name };
  };

  function loadStrategy(strategyId: string) {
    const availableStrategies = [...defaultStrategies, CUSTOM_STRATEGY];
    const selectedStrategy = availableStrategies.find((strategy) => {
      return strategy.strategyId === strategyId;
    });
    if (selectedStrategy === undefined) return;

    setSelectedStrategyId((current) => {
      setPreviousStrategyId(current);
      return strategyId;
    });

    setLoadedStrategies((current) => {
      if (current.has(strategyId)) return current;
      return new Map(current).set(strategyId, selectedStrategy);
    });
  }

  function toggleCustom(custom: boolean) {
    const customStrategyId = CUSTOM_STRATEGY.strategyId;
    loadStrategy(custom ? customStrategyId : previousStrategyId);
  }

  function addDerivative(type: "Call" | "Put") {
    const derivative = overriddenStrategies.find((strategy) => strategy.name === type);
    if (derivative === undefined) return;

    setLoadedStrategies((current) => {
      const selectedStrategy = current.get(selectedStrategyId);
      if (selectedStrategy === undefined) return current;

      const addedLegs = derivative.legs.map((leg) => ({
        ...leg,
        strategyLegId: crypto.randomUUID(),
      }));
      const editedStrategy = {
        ...selectedStrategy,
        legs: [...selectedStrategy.legs, ...addedLegs],
      };

      return new Map(current).set(selectedStrategyId, editedStrategy);
    });
  }

  function removeDerivative(strategyLegId: string) {
    setLoadedStrategies((current) => {
      const selectedStrategy = current.get(selectedStrategyId);
      if (selectedStrategy === undefined) return current;

      const remainingLegs = selectedStrategy.legs.filter((leg) => {
        return leg.strategyLegId !== strategyLegId;
      });
      const editedStrategy = { ...selectedStrategy, legs: remainingLegs };

      return new Map(current).set(selectedStrategyId, editedStrategy);
    });
  }

  function onChange(strategyLegId: string) {
    return function (name: keyof Leg, value: unknown) {
      setLoadedStrategies((current) => {
        const selectedStrategy = current.get(selectedStrategyId);
        if (selectedStrategy === undefined) return current;

        const editedLegs = selectedStrategy.legs.map((leg) => {
          return leg.strategyLegId === strategyLegId ? { ...leg, [name]: value } : leg;
        });
        const editedStrategy = { ...selectedStrategy, legs: editedLegs };

        return new Map(current).set(selectedStrategyId, editedStrategy);
      });
    };
  }

  function appendIndex(legs: Leg[]): (Leg & { name: string })[] {
    function toDerivative(isCall: boolean | null) {
      if (isCall === null) return "Forward";
      return isCall ? "Call" : "Put";
    }

    const count = { Call: 0, Put: 0, Forward: 0 };

    return legs.map((leg) => {
      const derivative = toDerivative(leg.isCall);
      count[derivative] += 1;
      return { ...leg, name: `${derivative}-${count[derivative]}` };
    });
  }

  return (
    <SectionContainer>
      <HeaderSpacer>
        <SectionHeader>
          <SectionTitle>Default Strategies - Combining Derivatives</SectionTitle>
          <SectionSubtitle>
            To manage trade-off between protection and cost we combine derivatives.
          </SectionSubtitle>
        </SectionHeader>

        <DropdownContainer>
          <DropdownSelect
            label="Exposure direction"
            onSelect={setDirection}
            options={exposureDirectionOptions}
            selected={direction}
          />
        </DropdownContainer>
      </HeaderSpacer>

      <CardGroup>
        <StrategyCard>
          <HeaderSpacer>
            <header>
              <CardTitle>Pay-off chart</CardTitle>
            </header>

            <HeaderControls>
              {!isCustom ? (
                <DropdownSelect
                  options={defaultStrategies.map(strategyToSelectable)}
                  selected={strategyToSelectable(selectedStrategy)}
                  onSelect={({ key }) => loadStrategy(key)}
                />
              ) : null}

              <Toggle active={isCustom} label="Custom" onClick={toggleCustom} />
            </HeaderControls>
          </HeaderSpacer>

          <LargeChart>
            <PayoffGraph
              direction={direction?.key}
              {...getPayoffGraphProps(selectedStrategy.legs)}
            />
          </LargeChart>
        </StrategyCard>

        <StrategyCard>
          <header>
            <CardTitle>{selectedStrategy.name}</CardTitle>
          </header>

          <form>
            {appendIndex(selectedStrategy.legs).map((strategyLeg, index) => (
              <>
                {index > 0 ? <Separator /> : null}
                <DerivativeForm
                  key={strategyLeg.strategyLegId}
                  strategyLeg={strategyLeg}
                  onChange={onChange(strategyLeg.strategyLegId)}
                  onRemove={
                    isCustom ? () => removeDerivative(strategyLeg.strategyLegId) : undefined
                  }
                />
              </>
            ))}

            {canAddDerivatives ? (
              <>
                {selectedStrategy.legs.length > 0 ? <Separator /> : null}
                <CreateDerivativeContainer>
                  <CreateDerivativeLabel>
                    You can add up to {remainingDerivatives} more derivatives
                  </CreateDerivativeLabel>
                  <CreateDerivativeButtons>
                    <InsertArea icon="plus" label="Call" onClick={() => addDerivative("Call")} />
                    <InsertArea icon="plus" label="Put" onClick={() => addDerivative("Put")} />
                  </CreateDerivativeButtons>
                </CreateDerivativeContainer>
              </>
            ) : null}
          </form>
        </StrategyCard>
      </CardGroup>
    </SectionContainer>
  );
}

const StrategyCard = styled(Card)`
  gap: 24px;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: 32px;
  height: 48px;
`;

const Separator = styled.hr`
  background-color: ${Color.NEUTRAL_400};
  border: 0;
  height: 1px;
  margin: 24px 0;
`;

const CreateDerivativeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CreateDerivativeLabel = styled.span`
  ${Typography.BODY_3}
  align-self: center;
  color: ${Color.NEUTRAL_700};
`;

const CreateDerivativeButtons = styled.div`
  display: flex;
  gap: 12px;
  height: 64px;
`;
