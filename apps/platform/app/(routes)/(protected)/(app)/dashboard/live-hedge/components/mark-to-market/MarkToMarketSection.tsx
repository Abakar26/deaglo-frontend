import { Suspense } from "react";
import { SuspenseBlock } from "ui/components";
import { SegmentedContentSkeleton } from "../SegmentedContentSkeleton";
import { Card, CardTitle, ChartContainer, SectionContainer, SectionTitle } from "../shared";
import { HedgesMtMChart } from "./HedgesMtMChart";
import { MarkToMarketWrapper } from "./MarkToMarketWrapper";

export function MarkToMarketSection() {
  return (
    <SectionContainer marginTop="32px">
      <SectionTitle>Mark to Market</SectionTitle>

      <Suspense fallback={<SegmentedContentSkeleton />}>
        <MarkToMarketWrapper />
      </Suspense>

      <Card>
        <header>
          <CardTitle>Hedges MtM</CardTitle>
        </header>

        <ChartContainer height="276px">
          <Suspense fallback={<SuspenseBlock />}>
            <HedgesMtMChart />
          </Suspense>
        </ChartContainer>
      </Card>
    </SectionContainer>
  );
}
