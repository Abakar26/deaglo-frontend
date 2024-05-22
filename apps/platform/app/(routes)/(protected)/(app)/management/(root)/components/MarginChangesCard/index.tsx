import { Suspense } from "react";
import { SuspenseBlock } from "ui/components";
import { Card, CardHeader, CardSubtitle, CardTitle, SmallGeneralDashboardChart } from "../shared";
import { ContentBlockSkeleton } from "../skeletons";
import { MarginChangesChart } from "./MarginChangesChart";
import { MarginChangesContent } from "./MarginChangesContent";

import MOCKS from "../_mocks";

export function MarginChangesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Margin Changes</CardTitle>
        <CardSubtitle>Margin changes</CardSubtitle>
      </CardHeader>

      <Suspense fallback={<ContentBlockSkeleton />}>
        <MarginChangesContentWrapper />
      </Suspense>

      <SmallGeneralDashboardChart>
        <Suspense fallback={<SuspenseBlock />}>
          <MarginChangesChartWrapper />
        </Suspense>
      </SmallGeneralDashboardChart>
    </Card>
  );
}

async function MarginChangesContentWrapper() {
  const { change, date } = await MOCKS.getMarginChanges();

  return <MarginChangesContent change={change} date={date} />;
}

async function MarginChangesChartWrapper() {
  const { chart } = await MOCKS.getMarginChanges();

  return <MarginChangesChart chart={chart} />;
}
