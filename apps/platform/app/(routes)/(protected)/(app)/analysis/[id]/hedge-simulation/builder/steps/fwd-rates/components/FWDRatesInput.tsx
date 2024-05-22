"use client";

import React from "react";
import styled from "styled-components";
import { FWDRatesGraph, NumberInput } from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  index: number;
  rates: Array<number | undefined>;
  onChange: (index: number, value?: number) => void;
}

export const FWDRatesInput: React.FunctionComponent<Props> = ({ index, rates, onChange }) => {
  return (
    <Container>
      <Title>Scenario {index + 1}</Title>
      <InputContainer>
        <Label>Forward points</Label>
        {Array(3)
          .fill(null)
          .map((_, rateIndex) => (
            <NumberInput
              label={`Day ${rateIndex * 365} points`}
              placeholder={`Forward Rate points on day ${rateIndex * 365}`}
              value={rates.at(rateIndex)}
              onChange={(value) => onChange(rateIndex, value)}
              error={
                (rates.at(rateIndex) ?? 0) > 10000 || (rates.at(rateIndex) ?? 0) < -10000
                  ? " "
                  : undefined
              }
              key={rateIndex}
            />
          ))}
        <Error show={rates.some((point) => (point ?? 0) > 10000 || (point ?? 0) < -10000)}>
          FWD rates must be between -10,000 and 10,000
        </Error>
      </InputContainer>

      <GraphContainer>
        <FWDRatesGraph rates={[rates.at(0) ?? 0, rates.at(1) ?? 0, rates.at(2) ?? 0]} />
      </GraphContainer>
    </Container>
  );
};

const Container = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  padding: 20px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.span`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

const Label = styled.span`
  ${Typography.BODY_1};
  color: ${Color.NEUTRAL_900};
`;

const GraphContainer = styled.div`
  height: 190px;
`;

const Error = styled.span<{ show: boolean }>`
  ${Typography.LABEL_4};
  color: ${Color.DANGER_700};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 0.15s ease opacity;
  margin: -8px 0;
`;
