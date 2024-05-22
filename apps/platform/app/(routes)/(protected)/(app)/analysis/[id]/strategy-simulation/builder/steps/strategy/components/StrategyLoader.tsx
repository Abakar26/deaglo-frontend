"use client";

import React from "react";
import styled from "styled-components";
import { SuspenseBlock } from "ui/components";

export const StrategyLoader: React.FunctionComponent = () => {
  return (
    <Container>
      <Row>
        <SuspenseBlock width={"175px"} height={"44px"} />
        <SuspenseBlock width={"175px"} height={"44px"} />
        <SuspenseBlock width={"175px"} height={"44px"} />
      </Row>
      <Grid>
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <SuspenseBlock key={index} height={"310px"} width={"310px"} />
          ))}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 310px);
  grid-auto-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;
