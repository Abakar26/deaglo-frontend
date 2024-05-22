import { HeaderSpacer, SectionContainer, SectionTitle } from "../../components/shared";
import DownloadAsCsv from "../components/DownloadAsCsv";
import { ExposureFilters } from "../components/ExposureFilters";
import { ExposuresTable } from "../components/ExposuresTable";

export default function AssetsPage() {
  return (
    <SectionContainer>
      <HeaderSpacer>
        <SectionTitle>Assets</SectionTitle>
        <DownloadAsCsv />
      </HeaderSpacer>

      <ExposureFilters />

      <ExposuresTable type="assets" />
    </SectionContainer>
  );
}
