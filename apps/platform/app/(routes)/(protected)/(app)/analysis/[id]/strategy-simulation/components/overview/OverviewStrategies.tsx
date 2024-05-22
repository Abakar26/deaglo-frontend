"use client";
import { type PartialStrategySimulation } from "@/app/interface";
import { instanceToLegs } from "@/app/interface/utils";
import React from "react";
import { styled } from "styled-components";
import { InsertArea, StrategyCard } from "ui/components";

interface Props {
  strategy: PartialStrategySimulation;
}

export const OverviewStrategies: React.FunctionComponent<Props> = ({ strategy }) => {
  // const { getPremium } = usePremiumPricing(strategy.strategyInstance.map(strategy => ({ ...strategy, legs: instanceToLegs(strategy.legs) })));

  return (
    <StrategiesContainer>
      {strategy.strategyInstance.map((strategy, i) => (
        <div key={i}>
          <StrategyCard
            title={strategy.name}
            isPremium={false}
            strategy={instanceToLegs(strategy.legs).map((leg) => ({
              ...leg,
              title: `${leg.isCall === null ? "Forward" : leg.isCall ? "Call" : "Put"} (${leg.isBought ? "Bought" : "Sold"})`,
            }))}
          ></StrategyCard>
        </div>
      ))}
    </StrategiesContainer>
  );
};

const StrategiesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 425px);
  grid-auto-rows: minmax(min-content, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const Chart = styled.div`
  width: 100%;
  min-width: 270px;
  height: 138px;
`;
