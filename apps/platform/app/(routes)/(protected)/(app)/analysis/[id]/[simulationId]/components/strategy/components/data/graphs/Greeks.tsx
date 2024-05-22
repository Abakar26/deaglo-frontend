"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { InsertArea } from "ui/components";
import { type StrategySimulationResults } from "@/app/interface";

interface Props {
  results: StrategySimulationResults;
}

export const Greeks: React.FunctionComponent<Props> = ({}) => {
  return (
    <Container>
      <InsertArea label={"Greeks Graph"} />
    </Container>
  );
};
const appear = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Container = styled.div`
  width: 100%;
  height: 400px;
  animation: ${appear} 1.2s ease;
`;
