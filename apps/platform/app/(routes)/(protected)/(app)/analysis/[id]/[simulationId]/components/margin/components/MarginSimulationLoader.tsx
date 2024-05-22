"use client";

import React from "react";
import styled from "styled-components";
import { SuspenseBlock } from "ui/components";
import { Color, Typography } from "ui/styles";

export const MarginSimulationLoader: React.FunctionComponent = () => {
  return (
    <Container>
      <Row>
        <SuspenseBlock width={"434px"} height={"48px"} />
        <RowSection>
          <SuspenseBlock width={"240px"} height={"48px"} />
          <SuspenseBlock width={"164px"} height={"40px"} />
        </RowSection>
      </Row>
      <SuspenseBlock height={"194px"} />
      <Content>
        <Title>Margin Simulation</Title>
        <Description>
          Derivative use often requires the posting of margin. Closed end funds in particular need
          to set aside funds so as to avoid future cash calls. Holding too much reduces returns,
          holding too litle may require an investor cash call. Simulation of margin calls helps the
          fund set aside the optimum amount.
        </Description>
      </Content>
      <SuspenseBlock height={"400px"} />
      <SuspenseBlock height={"376px"} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RowSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Title = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
