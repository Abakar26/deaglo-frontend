"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { ContentBlock, ContentColor, ContentIconColor, SmallButton } from "ui/components";

interface Props {
  marginId: string;
}

export const MarginSection: React.FunctionComponent<Props> = ({}) => {
  const router = useRouter();
  return (
    <ContentBlock
      title="Consider running Margin Simulation to have a bigger FX strategy picture"
      description="Margin Simulation assists in forecasting the Expected Value of margin calls, enabling you to set aside the optimal cash reserve. This tool functions as an integral component of Strategy Simulation, requiring you to select a pre-existing Strategy Simulation as its foundation. Utilize Margin Simulation to enhance your financial strategy by accurately estimating future collateral requirements."
      icon={{
        icon: "info",
        color: ContentIconColor.BRAND_100,
      }}
      color={ContentColor.NEUTRAL_00}
    >
      <Row>
        <SmallButton
          label="Go to Margin Simulation"
          onClick={() => router.push(`margin-simulation`)}
        />
      </Row>
    </ContentBlock>
  );
};

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
