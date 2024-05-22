"use client";

import React, { Suspense } from "react";
import styled from "styled-components";
import { Card } from "ui/components";
import { Color, Typography } from "ui/styles";
import { MarginLoader } from "./components";

export default function CreateMarginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Card>
        <Title>Parameters</Title>
        <Description>
          Margin Simulation assists in forecasting the Expected Value of margin calls, enabling you
          to set aside the optimal cash reserve. This tool functions as an integral component of
          Strategy Simulation, requiring you to select a pre-existing Strategy Simulation as its
          foundation. Utilize Margin Simulation to enhance your financial strategy by accurately
          estimating future collateral requirements.
        </Description>
        <Suspense fallback={<MarginLoader />}>{children}</Suspense>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 8px;
`;

const Title = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;
