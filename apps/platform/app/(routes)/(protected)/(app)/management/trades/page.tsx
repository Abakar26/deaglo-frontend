import DownloadAsCsv from "./components/DownloadAsCsv";
import { TradesFilters } from "./components/TradesFilters";
import { TradesTable } from "./components/TradesTable";
import { HeaderSpacer, SectionContainer, SectionTitle } from "./components/shared";

export default function TradesPage() {
  return (
    <SectionContainer>
      <HeaderSpacer>
        <SectionTitle>Trades</SectionTitle>
        <DownloadAsCsv />
      </HeaderSpacer>

      <TradesFilters />

      <TradesTable editable expandable selectable />
    </SectionContainer>
  );
}
