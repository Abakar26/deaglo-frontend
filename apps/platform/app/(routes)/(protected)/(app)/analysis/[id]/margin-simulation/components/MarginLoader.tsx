"use client";

import React from "react";
import styled from "styled-components";
import { SuspenseBlock } from "ui/components";

export const MarginLoader: React.FunctionComponent = () => {
  return (
    <Container>
      <SuspenseBlock width="100%" height={"90px"} />
      <InputContainer>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <SuspenseBlock key={index} width={"390px"} height="48px" />
          ))}
      </InputContainer>

      <Row>
        <SuspenseBlock width={"84px"} height={"40px"} />
        <SuspenseBlock width={"108px"} height={"40px"} />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin-top: 28px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 16px;
`;
