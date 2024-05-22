"use client";

import { type MarginSimulationResults } from "@/app/interface";
import React from "react";
import styled from "styled-components";
import { ViolinColor, ViolinGraph } from "ui/components";
import { DataSection } from "../../..";

interface Props {
  results: MarginSimulationResults;
}

export const MarginGraph: React.FunctionComponent<Props> = ({ results }) => {
  return (
    <DataSection>
      <Row>Simulation Comparison</Row>
      <GraphContainer>
        <ViolinGraph
          data={Object.entries(results.violin_plot).map(([name, data], index) => ({
            id: `${index}`,
            name: name,
            color: ViolinColor.BROWN_200,
            data,
          }))}
        />
      </GraphContainer>
    </DataSection>
  );
};
const GraphContainer = styled.div`
  width: 100%;
  height: 304px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;
