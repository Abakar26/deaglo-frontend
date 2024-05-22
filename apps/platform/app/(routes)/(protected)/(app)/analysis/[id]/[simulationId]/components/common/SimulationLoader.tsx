"use client";

import React from "react";
import styled from "styled-components";
import { SuspenseBlock } from "ui/components";

export const SimulationLoader: React.FunctionComponent = () => {
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
