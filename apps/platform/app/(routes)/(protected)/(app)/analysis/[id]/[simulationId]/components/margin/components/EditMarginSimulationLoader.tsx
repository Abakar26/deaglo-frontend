"use client";

import React from "react";
import styled from "styled-components";
import { SuspenseBlock } from "ui/components";

export const EditMarginSimulationLoader: React.FunctionComponent = () => {
  return (
    <Container>
      <InputContainer>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <SuspenseBlock key={index} width={"390px"} height="48px" />
          ))}
      </InputContainer>
      <Row>
        <SuspenseBlock height="40px" width="96px" />
        <SuspenseBlock height="40px" width="82px" />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin-top: 48px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: end;
  margin-top: 24px;
`;
