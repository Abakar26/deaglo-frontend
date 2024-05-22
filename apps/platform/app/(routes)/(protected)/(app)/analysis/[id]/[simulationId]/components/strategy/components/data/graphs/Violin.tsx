"use client";

import type { Analysis, StrategySimulationResults } from "@/app/interface";
import { abbreviateNumber } from "@/utilities";
import React from "react";
import styled, { keyframes } from "styled-components";
import { ViolinColor, ViolinGraph } from "ui/components";

interface Props {
  analysis: Analysis;
  results: StrategySimulationResults;
}

export const Violin: React.FunctionComponent<Props> = ({ analysis, results }) => {
  return (
    <Container>
      <ViolinGraph
        data={[
          {
            id: "exposure",
            name: "exposure",
            color: ViolinColor.NEUTRAL_400,
            data: results.violin_plot.exposure ?? [],
          },
          ...Object.entries(results.violin_plot)
            .filter(([name]) => name !== "exposure")
            .map(([name, data], index) => ({
              id: `${index}`,
              name: name,
              color: ViolinColor.BRAND_300,
              data,
            })),
        ]}
        options={{
          yFormatter: (val) => abbreviateNumber(val) + " " + analysis.baseCurrency.code,
        }}
      />
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
