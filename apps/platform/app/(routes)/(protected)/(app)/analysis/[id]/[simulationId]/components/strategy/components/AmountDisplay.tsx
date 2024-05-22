"use client";

import React from "react";
import styled from "styled-components";
import { type Flag, Icon } from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  baseAmount: number;
  quoteAmount: number;
  baseFlag: Flag;
  quoteFlag: Flag;
  baseCurrency: string;
  quoteCurrency: string;
}

export const AmountDisplay: React.FunctionComponent<Props> = ({
  baseAmount,
  quoteAmount,
  baseFlag,
  quoteFlag,
  baseCurrency,
  quoteCurrency,
}) => {
  const baseFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: baseCurrency,
    currencyDisplay: "narrowSymbol",
  }).format.bind(new Intl.NumberFormat("en-US"));

  const quoteFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: quoteCurrency,
    currencyDisplay: "narrowSymbol",
  }).format.bind(new Intl.NumberFormat("en-US"));

  return (
    <Container>
      <Column>
        Sold
        <Row>
          <Icon name={baseFlag} size={20} defaultSize={26} />
          {baseFormat(baseAmount)} {baseCurrency}
        </Row>
      </Column>
      <IconContainer>
        <Icon name="arrow-right" size={20} color={Color.NEUTRAL_700} />
      </IconContainer>

      <Column>
        Bought
        <Row>
          <Icon name={quoteFlag} size={20} defaultSize={26} />
          {quoteFormat(quoteAmount)} {quoteCurrency}
        </Row>
      </Column>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: end;
  height: min-content;
  width: max-content;
  gap: 12px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  ${Typography.SUBHEAD_3};
  color: ${Color.NEUTRAL_900};
`;

const IconContainer = styled.div`
  margin-bottom: 2px;
`;
