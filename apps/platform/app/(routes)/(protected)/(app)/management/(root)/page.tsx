import { Suspense } from "react";
import { AssetsAndLiabilitiesCard } from "./components/AssetsAndLiabilitiesCard";
import { GeneralDashboardSegments } from "./components/GeneralDashboardSegments";
import { HedgingEfficiencyCard } from "./components/HedgingEfficiencyCard";
import { HistoricalMtMCard } from "./components/HistoricalMtMCard";
import { MarginChangesCard } from "./components/MarginChangesCard";
import { MarkToMarketSegments } from "./components/MarkToMarketSegments";
import { NIMCascadeCard } from "./components/NIMCascadeCard";
import { OpportunityCostCard } from "./components/OpportunityCostCard";
import { SummaryFilters } from "./components/SummaryFilters";
import { SummaryTabBar } from "./components/SummaryTabBar";
import { CardGroup, HeaderSpacer, SectionContainer, SectionTitle } from "./components/shared";
import {
  GeneralDashBoardSegmentsSkeleton,
  MarkToMarketSegmentsSkeleton,
} from "./components/skeletons";

export default function ManagementPage() {
  return (
    <>
      <SummaryFilters />

      <SectionContainer $marginTop="24px">
        <HeaderSpacer>
          <SectionTitle>General Dashboard</SectionTitle>
          <SummaryTabBar />
        </HeaderSpacer>

        <Suspense fallback={<GeneralDashBoardSegmentsSkeleton />}>
          <GeneralDashboardSegments />
        </Suspense>

        <CardGroup $columns={3}>
          <HedgingEfficiencyCard />
          <MarginChangesCard />
          <OpportunityCostCard />
          <AssetsAndLiabilitiesCard />
        </CardGroup>
      </SectionContainer>

      <SectionContainer $marginTop="32px">
        <HeaderSpacer>
          <SectionTitle>Mark to Market</SectionTitle>
          <SummaryTabBar />
        </HeaderSpacer>

        <Suspense fallback={<MarkToMarketSegmentsSkeleton />}>
          <MarkToMarketSegments />
        </Suspense>

        <CardGroup $columns={2}>
          <HistoricalMtMCard />
          <NIMCascadeCard />
        </CardGroup>
      </SectionContainer>
    </>
  );
}
