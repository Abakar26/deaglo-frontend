"use client";

import { StrategyInteractor } from "@/app/interactors";
import { type Analysis, type Strategy } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { InsertArea, SnackbarLevel, StrategyCard } from "ui/components";
import { useStrategyBuilderStore } from "../../../store";
import { usePremiumPricing } from "../hooks";
import { ConfigureStrategyModal } from "../modals/ConfigureStrategyModal";
import { CustomStrategyModal } from "../modals/CustomStrategyModal";
import { StrategyTab, StrategyTabs } from "./StrategyTabs";

interface Props {
  analysis: Analysis;
  vanilla: Array<Strategy>;
  composite: Array<Strategy>;
  custom: Array<Strategy>;
}

export const StrategyList: React.FunctionComponent<Props> = ({
  analysis,
  vanilla,
  composite,
  custom: _custom,
}) => {
  const [tab, setTab] = useState<StrategyTab>(StrategyTab.VANILLA);
  const { strategies, setStrategies } = useStrategyBuilderStore();
  const [custom, setCustom] = useState<Array<Strategy>>(_custom);
  const [strategyInstance, setStrategyInstance] = useState<Strategy>();
  const [createStrategy, setCreateStrategy] = useState<boolean>(false);
  const [customStrategy, setCustomStrategy] = useState<Strategy>();
  const { getPremium } = usePremiumPricing(custom);
  const { setSnack } = useSnackbarStore();

  const getStrategies = useCallback(
    (tab: StrategyTab) => {
      switch (tab) {
        case StrategyTab.VANILLA:
          return vanilla;
        case StrategyTab.COMPOSITE:
          return composite;
        case StrategyTab.CUSTOM:
          return custom;
      }
    },
    [vanilla, composite, custom]
  );

  const calculateAdded = (strategy: Strategy): number | undefined => {
    const added = strategies.filter(
      (_strategy) => _strategy.strategyId === strategy.strategyId
    ).length;
    return added > 0 ? added : undefined;
  };

  const upsertStrategy = (strategy: Strategy) => {
    const index = custom.findIndex(
      (customStrategy) => customStrategy.strategyId === strategy.strategyId
    );
    if (index !== -1) {
      setCustom([...custom.slice(0, index), strategy, ...custom.slice(index + 1)]);
    } else {
      setCustom([...custom, strategy]);
    }
    setStrategies(
      strategies.map((current) => {
        if (current.strategyId === strategy.strategyId) {
          return {
            ...current,
            legs: [
              ...current.legs.filter((leg) =>
                strategy.legs.some((_leg) => _leg.strategyLegId === leg.strategyLegId)
              ),
              ...strategy.legs.filter(
                (leg) => !current.legs.some((_leg) => _leg.strategyLegId === leg.strategyLegId)
              ),
            ],
          };
        }
        return current;
      })
    );
  };

  const deleteCustomStrategy = (strategy: Strategy) => {
    StrategyInteractor.del(strategy.strategyId)
      .then(() => {
        setCustom((prev) => prev.filter((item) => item.strategyId !== strategy.strategyId));
        setStrategies(strategies.filter((item) => item.strategyId !== strategy.strategyId));

        setSnack({
          message: "Successfully deleted custom strategy",
          icon: "circle-check",
          duration: 5,
          level: SnackbarLevel.SUCCESS,
        });
      })
      .catch((err) => {
        console.error(err);
        setSnack({
          message: "Couldn't delete custom strategy",
          icon: "x",
          duration: 5,
          level: SnackbarLevel.ERROR,
        });
      });
  };

  return (
    <Container>
      <StrategyTabs
        vanillaCount={vanilla.length}
        compositeCount={composite.length}
        customCount={custom.length}
        changeTab={setTab}
        tab={tab}
      />
      <StrategyGrid custom={tab === StrategyTab.CUSTOM}>
        {getStrategies(tab).map((strategy, strategyIndex) => (
          <StrategyCard
            key={strategy.strategyId}
            title={strategy.name}
            added={calculateAdded(strategy)}
            onAdd={() => setStrategyInstance(strategy)}
            onEdit={tab === StrategyTab.CUSTOM ? () => setCustomStrategy(strategy) : undefined}
            onDelete={tab === StrategyTab.CUSTOM ? () => deleteCustomStrategy(strategy) : undefined}
            strategy={strategy.legs.map((leg, legIndex) => {
              const premiumData = getPremium(
                leg.strategyLegId,
                legIndex,
                strategy.strategyId,
                strategyIndex
              );
              return {
                ...leg,
                premium: premiumData?.amount,
                premiumCurrency: premiumData?.currency,
                action: leg.isBought ? "Bought" : "Sold",
                option: leg.isCall === null ? "Forward" : leg.isCall ? "Call" : "Put",
                title: `${leg.isCall === null ? "Forward" : leg.isCall ? "Call" : "Put"} (${leg.isBought ? "Bought" : "Sold"})`,
              };
            })}
            description={strategy.description}
            overview={tab === StrategyTab.CUSTOM}
          />
        ))}
        {tab == StrategyTab.CUSTOM && (
          <InsertArea
            icon="plus"
            label="Create Custom Strategy"
            onClick={() => setCreateStrategy(true)}
          />
        )}
      </StrategyGrid>
      {strategyInstance && (
        <ConfigureStrategyModal
          strategy={strategyInstance}
          analysis={analysis}
          onDismiss={() => setStrategyInstance(undefined)}
        />
      )}
      {(customStrategy ?? createStrategy) && (
        <CustomStrategyModal
          strategy={customStrategy}
          onDismiss={() => {
            setCustomStrategy(undefined);
            setCreateStrategy(false);
          }}
          onUpsert={upsertStrategy}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StrategyGrid = styled.div<{ custom: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${(props) => (props.custom ? "475px" : "310px")});
  grid-template-rows: minmax(max-content, 310px);
  grid-auto-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  & > * {
    min-height: 240px;
  }
`;
