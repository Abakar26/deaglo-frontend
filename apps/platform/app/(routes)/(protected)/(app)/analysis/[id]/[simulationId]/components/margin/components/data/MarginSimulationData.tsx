"use client";

import { type MarginSimulation } from "@/app/interface";
import React from "react";
import styled from "styled-components";
import { Color, Typography } from "ui/styles";
import { DistributionDataTable } from "../../..";
import { MarginGraph } from "./MarginGraph";

interface Props {
  marginSimulation: MarginSimulation;
}

export const MarginSimulationData: React.FunctionComponent<Props> = ({ marginSimulation }) => {
  return (
    <Container>
      <Title>Margin Simulation</Title>
      <Description>
        Derivative use often requires the posting of margin. Closed end funds in particular need to
        set aside funds so as to avoid future cash calls. Holding too much reduces returns, holding
        too litle may require an investor cash call. Simulation of margin calls helps the fund set
        aside the optimum amount.
      </Description>
      {marginSimulation.results && <MarginGraph results={marginSimulation.results} />}
      {marginSimulation.results?.summary && (
        <DistributionDataTable data={marginSimulation.results.summary ?? {}} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-top: 4px;
`;

const Title = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
  margin-bottom: 12px;
`;
