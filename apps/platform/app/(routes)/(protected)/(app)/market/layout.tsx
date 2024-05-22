"use client";

import styled from "styled-components";
import { FWDEfficiency, FXHeatMap, SpotHistory } from "./components";
import { type PropsWithChildren, Suspense } from "react";

const MarketLayout: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Suspense
        fallback={
          <>
            <SpotHistory />
            <FXHeatMap />
            <FWDEfficiency />
          </>
        }
      >
        {children}
      </Suspense>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
`;

export default MarketLayout;
