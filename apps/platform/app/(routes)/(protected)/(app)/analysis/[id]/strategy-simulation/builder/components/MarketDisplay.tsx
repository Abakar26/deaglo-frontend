"use client";

import React from "react";
import styled from "styled-components";
import { SuspenseBlock } from "ui/components";
import { Color, Typography } from "ui/styles";
import { useStrategyMarket } from "../hooks";

export const MarketDisplay: React.FunctionComponent = () => {
  const { loading, market } = useStrategyMarket();

  return loading || !market ? (
    <SuspenseBlock width="282px" height="54px" />
  ) : (
    <Container>
      <Section>
        <Label>Spot Rate</Label>
        <Value>{market.spot.toFixed(2)}</Value>
      </Section>
      <Section>
        <Label>Forward Rate</Label>
        <Value>{market.fwd.toFixed(2)}</Value>
      </Section>
      <Section>
        <Label>Forward Cost</Label>
        <Value>{(((market.fwd - market.spot) * 100) / market.fwd).toFixed(2)}%</Value>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid ${Color.NEUTRAL_300};
  border-radius: 4px;
  padding: 0 8px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Label = styled.span`
  ${Typography.LABEL_4};
  color: ${Color.NEUTRAL_700};
  white-space: nowrap;
`;

const Value = styled.span`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_900};
  white-space: nowrap;
`;
