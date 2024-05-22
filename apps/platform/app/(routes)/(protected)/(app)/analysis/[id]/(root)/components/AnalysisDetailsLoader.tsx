"use client";

import React from "react";
import { AnalysisGrid } from "../../../(root)/components";
import { SuspenseBlock } from "ui/components";
import { styled } from "styled-components";

interface Props {
  count: number;
}

export const AnalysisDetailsLoader: React.FunctionComponent<Props> = ({ count }) => {
  return (
    <>
      <AnalysisDetails>
        <SuspenseBlock height="68px" width="35vw" />
        <SuspenseBlock height="40px" width="175px" />
      </AnalysisDetails>
      <SimulationToolkit>
        <SuspenseBlock height="288px" width="100%" />
      </SimulationToolkit>
      <AnalysisGrid>
        {Array(count)
          .fill(null)
          .map((_, index) => (
            <SuspenseBlock key={index} height="270px" />
          ))}
      </AnalysisGrid>
    </>
  );
};

const AnalysisDetails = styled.div`
  padding: 12px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SimulationToolkit = styled.div`
  margin-bottom: 40px;
`;
