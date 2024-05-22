"use client";

import { Suspense } from "react";
import { SimulationLoader } from "./components";
import { Card } from "ui/components";
import styled from "styled-components";

export default function SimulationLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Card>
        <Suspense fallback={<SimulationLoader />}>{children}</Suspense>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 8px;
`;
