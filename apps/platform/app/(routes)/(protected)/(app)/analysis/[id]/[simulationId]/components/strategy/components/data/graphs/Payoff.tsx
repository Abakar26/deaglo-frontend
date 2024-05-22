"use client";

import type { Analysis, StrategySimulation } from "@/app/interface";
import { instanceToLegs } from "@/app/interface/utils";
import { abbreviateNumber } from "@/utilities";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { PayoffGraph, SmallButton } from "ui/components";
import { StrategyLeg } from "ui/components/card/strategy/StrategyLeg";
import { Color, Typography } from "ui/styles";

interface Props {
  simulation: StrategySimulation;
  analysis: Analysis;
}

export const Payoff: React.FunctionComponent<Props> = ({ analysis, simulation }) => {
  const [hidden, setHidden] = useState<Array<{ name: string; strategyId: string; index: number }>>(
    []
  );

  return (
    <Container>
      <Row>
        {hidden.map(({ name, strategyId, index }) => (
          <SmallButton
            label={`Show ${name}`}
            leadingIcon="show"
            onClick={() =>
              setHidden((h) => h.filter((h) => h.strategyId !== strategyId || h.index !== index))
            }
            key={strategyId + "_" + index}
          />
        ))}
      </Row>
      <StrategyContainer>
        {simulation.strategyInstance
          .filter(({ strategyId }) => !hidden.some((h) => h.strategyId === strategyId))
          .map((strategy, index) => (
            <PayoffContainer key={strategy.strategyId}>
              <Row wide>
                <Title>{strategy.name}</Title>
                <SmallButton
                  leadingIcon="hide"
                  label="Hide"
                  onClick={() => setHidden((h) => [...h, { ...strategy, index }])}
                  disabled={hidden.length === simulation.strategyInstance.length - 1}
                />
              </Row>

              <GraphContainer>
                <PayoffGraph
                  notional={simulation.notional}
                  spot={simulation.initialSpotRate}
                  legs={strategy.legs.map((leg) => ({
                    ...leg.hiddenStrategyLeg!,
                    notional: simulation.notional,
                    strike:
                      (leg.hiddenStrategyLeg?.isCall
                        ? 1 - leg.strikeOverride / 100
                        : 1 + leg.strikeOverride / 100) * simulation.initialSpotRate,
                    premium: Math.abs(leg.premiumOverride),
                    leverage: leg.leverageOverride,
                  }))}
                  options={{
                    yFormatter: (val) => abbreviateNumber(val) + " " + analysis.baseCurrency.code,
                  }}
                />
              </GraphContainer>
              <LegContainer>
                {instanceToLegs(strategy.legs).map((leg, i) => (
                  <StrategyLeg
                    parameters={{ ...leg, premiumCurrency: analysis.baseCurrency.code, title: "" }}
                    key={leg.strategyLegId + "_" + i}
                  />
                ))}
              </LegContainer>
            </PayoffContainer>
          ))}
      </StrategyContainer>
    </Container>
  );
};
const appear = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
`;

const StrategyContainer = styled.div`
  width: 100%;
  height: 100%;
  animation: ${appear} 1.2s ease;
  display: flex;
  align-items: start;
  gap: 20px;
`;

const PayoffContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${Color.NEUTRAL_00};
  border: 1px solid ${Color.NEUTRAL_400};
`;

const LegContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  color: ${Color.NEUTRAL_900};
  ${Typography.SUBHEAD_2};
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const Row = styled.div<{ wide?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.wide ? "space-between" : "start")};
  gap: 8px;
`;
