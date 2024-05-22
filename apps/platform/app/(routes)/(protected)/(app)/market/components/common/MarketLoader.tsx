"use client";

import React from "react";
import styled from "styled-components";
import { SuspenseBlock } from "ui/components";

export const MarketLoader: React.FunctionComponent = () => {
  return (
    <Container>
      <SuspenseBlock width={"100%"} height={"60px"} />
      <SuspenseBlock width={"100%"} height={"312px"} />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
