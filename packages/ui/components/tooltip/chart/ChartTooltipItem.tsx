import React from "react";
import styled from "styled-components";
import { Color, Typography } from "../../../styles";

export interface TooltipItemProps {
  label?: string;
  value?: string | number;
  icon?: React.ReactNode;
}

export const ChartTooltipItem: React.FunctionComponent<TooltipItemProps> = ({
  label,
  value,
  icon,
}) => {
  return (
    <Container>
      {icon}
      {value && <Value>{value}</Value>}
      {label && <Label>{label}</Label>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4px;
`;

const Value = styled.span`
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_00};
`;

const Label = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_500};
`;
