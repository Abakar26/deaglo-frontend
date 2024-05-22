"use client";

import { type SimulationEnvironment } from "@/app/interface";
import React from "react";
import styled from "styled-components";
import { Segment, SegmentedContentBlock, SmallButton } from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  environment: SimulationEnvironment;
  onChange: () => void;
}

export const EnvironmentDisplay: React.FunctionComponent<Props> = ({ environment, onChange }) => {
  return (
    <Container>
      <Row>
        {environment.name}
        <SmallButton onClick={onChange} label={"Change"} />
      </Row>
      <SegmentedContentBlock equalized>
        <Segment label="Volatility Model">GBM</Segment>
        <Segment label="Historical volatility">{environment.volatility.toFixed(2)}%</Segment>
        <Segment label="Skew">{environment.skew}%</Segment>
        <Segment label="Appreciation / Depreciation">
          {environment.appreciationPercent.toFixed(2)}%
        </Segment>
      </SegmentedContentBlock>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  width: max-content;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_900};
`;
