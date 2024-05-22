import { Suspense } from "react";
import { SegmentedContentSkeleton } from "../SegmentedContentSkeleton";
import { HeaderSpaceBetween, SectionContainer, SectionSubtitle, SectionTitle } from "../shared";
import { AnalysesDashboardWrapper } from "./AnalysesDashboardWrapper";
import { ShareSummaryButton } from "./ShareSummaryButton";

export function AnalysesDashboardSection() {
  return (
    <SectionContainer marginTop="24px">
      <HeaderSpaceBetween>
        <header>
          <SectionTitle>Analyses Dashboard</SectionTitle>
          <SectionSubtitle>Todays report on a sum of currency pairs analyses</SectionSubtitle>
        </header>

        <ShareSummaryButton />
      </HeaderSpaceBetween>

      <Suspense fallback={<SegmentedContentSkeleton count={5} large />}>
        <AnalysesDashboardWrapper />
      </Suspense>
    </SectionContainer>
  );
}
