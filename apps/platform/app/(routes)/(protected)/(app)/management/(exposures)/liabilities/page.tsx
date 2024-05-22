import { HeaderSpacer, SectionContainer, SectionTitle } from "../../components/shared";
import DownloadAsCsv from "../components/DownloadAsCsv";
import { ExposureFilters } from "../components/ExposureFilters";
import { ExposuresTable } from "../components/ExposuresTable";

export default function LiabilitiesPage() {
  return (
    <SectionContainer>
      <HeaderSpacer>
        <SectionTitle>Liabilities</SectionTitle>
        <DownloadAsCsv />
      </HeaderSpacer>

      <ExposureFilters />

      <ExposuresTable type="liabilities" />
    </SectionContainer>
  );
}
