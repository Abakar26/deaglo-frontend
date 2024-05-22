"use client";

import React from "react";
import styled from "styled-components";
import { Leg } from "ui/components";
import { Color, Typography } from "ui/styles";
import { getBarrierName } from "./StrikeGraph";

interface Props {
  index: number;
  leg: Leg;
}

export const BarrierLabel: React.FunctionComponent<Props> = ({ leg, index }) => {
  return (
    <Container>
      <Name>Barrier (Leg {index + 1})</Name>
      <Label>Barrier Level: {leg.barrierLevel?.toFixed(3) ?? 0}%</Label>
      <Label>Barrier Type: {leg.barrierType ? getBarrierName(leg.barrierType) : ""}</Label>
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
