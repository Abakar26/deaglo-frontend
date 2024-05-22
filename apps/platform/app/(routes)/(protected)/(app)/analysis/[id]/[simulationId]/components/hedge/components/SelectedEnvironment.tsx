"use client";
import { type SimulationEnvironment } from "@/app/interface";
import React from "react";
import styled from "styled-components";
import { Color, Typography } from "ui/styles";
import { Summary } from "../../strategy/components/market/Summary";

interface Props {
  environment: SimulationEnvironment;
  edit: boolean;
}

export const SelectedEnvironment: React.FunctionComponent<Props> = ({ environment, edit }) => {
  return (
    <>
      {!edit && (
        <>
          <Heading>Selected Environment</Heading>
        </>
      )}
      <SummaryContainer>
        <Summary
          name={environment.name}
          segments={[
            {
              label: "Volatility Model",
              value: "GBM",
            },
            {
              label: "Historical Volatility",
              value: `${(environment.volatility * 100).toFixed(2)}%`,
            },
            {
              label: "Skew",
              value: `${environment.skew}%`,
            },
            {
              label: "Appreciation / Depreciation",
              value: `${(environment.appreciationPercent * 100).toFixed(2)}%`,
            },
          ]}
        />
      </SummaryContainer>
    </>
  );
};

const Heading = styled.h1`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const SummaryContainer = styled.div`
  max-width: 840px;
`;
