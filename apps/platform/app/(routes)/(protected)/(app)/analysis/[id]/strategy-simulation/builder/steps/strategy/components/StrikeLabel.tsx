"use client";

import React from "react";
import styled from "styled-components";
import { Leg } from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  index: number;
  leg: Leg;
}

export const StrikeLabel: React.FunctionComponent<Props> = ({ leg, index }) => {
  return (
    <Container>
      <Name>Leg {index + 1}</Name>
      <Label>Strike: {leg.strike?.toFixed(3) ?? 0}%</Label>
      <Label>Leverage: {leg.leverage?.toFixed(3) ?? 0}</Label>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${Color.NEUTRAL_150};
  display: flex;
  gap: 12px;
  padding: 0 4px;
  border-radius: 2px;
  width: min-content;
`;

const Name = styled.span`
  color: ${Color.NEUTRAL_900};
  ${Typography.LABEL_3};
  white-space: nowrap;
`;

const Label = styled.span`
  color: ${Color.NEUTRAL_900};
  ${Typography.LABEL_4};
  white-space: nowrap;
`;
