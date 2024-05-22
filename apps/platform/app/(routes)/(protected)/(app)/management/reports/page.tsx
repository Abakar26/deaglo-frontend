import { Suspense } from "react";
import { ReportsBar } from "./components/ReportsBar";
import { ReportsTableGroup } from "./components/ReportsTableGroup";
import { SectionContainer, SectionTitle } from "./components/shared";

export default function ReportsPage() {
  return (
    <SectionContainer>
      <SectionTitle>Balance sheet</SectionTitle>

      <ReportsBar />

      <Suspense fallback={null}>
        <ReportsTableGroup />
      </Suspense>
    </SectionContainer>
  );
}
