import { Suspense } from "react";
import { SuspenseBlock } from "ui/components";
import { SegmentedContentSkeleton } from "../SegmentedContentSkeleton";
import { Card, CardTitle, ChartContainer, SectionContainer, SectionTitle } from "../shared";
import { AssetsAndLiabilitiesChart } from "./AssetsAndLiabilitiesChart";
import { AssetsAndLiabilitiesWrapper } from "./AssetsAndLiabilitiesWrapper";

export function AssetsAndLiabilitiesSection() {
  return (
    <SectionContainer marginTop="32px">
      <SectionTitle>Assets and Liabilities</SectionTitle>

      <Suspense fallback={<SegmentedContentSkeleton />}>
        <AssetsAndLiabilitiesWrapper />
      </Suspense>

      <Card>
        <header>
          <CardTitle>All Assets and Liabilities</CardTitle>
        </header>

        <ChartContainer height="304px">
          <Suspense fallback={<SuspenseBlock />}>
            <AssetsAndLiabilitiesChart />
          </Suspense>
        </ChartContainer>
      </Card>
    </SectionContainer>
  );
}
