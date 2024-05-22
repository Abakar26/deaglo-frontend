import { HeaderSpaceBetween, SectionContainer, SectionTitle } from "../shared";
import { TradesFilters } from "../../../../management/trades/components/TradesFilters";
import { TradesTable } from "../../../../management/trades/components/TradesTable";
import { ViewTradesButton } from "./ViewTradesButton";

export function TradesSection() {
  return (
    <SectionContainer marginTop="32px">
      <HeaderSpaceBetween>
        <SectionTitle>Trades</SectionTitle>
        <ViewTradesButton />
      </HeaderSpaceBetween>

      <TradesFilters />
      <TradesTable hideCharts rows={6} />
    </SectionContainer>
  );
}
