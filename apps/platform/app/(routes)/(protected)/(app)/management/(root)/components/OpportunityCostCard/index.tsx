import { Suspense } from "react";
import { SuspenseBlock } from "ui/components";
import { Card, CardHeader, CardSubtitle, CardTitle, SmallGeneralDashboardChart } from "../shared";
import { ContentBlockSkeleton } from "../skeletons";
import { OpportunityCostChart } from "./OpportunityCostChart";
import { OpportunityCostContent } from "./OpportunityCostContent";

import MOCKS from "../_mocks";

export function OpportunityCostCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunity Cost</CardTitle>
        <CardSubtitle>Actual result compare stressed result</CardSubtitle>
      </CardHeader>

      <Suspense fallback={<ContentBlockSkeleton />}>
        <OpportunityCostContentWrapper />
      </Suspense>

      <SmallGeneralDashboardChart>
        <Suspense fallback={<SuspenseBlock />}>
          <OpportunityCostChartWrapper />
        </Suspense>
      </SmallGeneralDashboardChart>
    </Card>
  );
}

async function OpportunityCostContentWrapper() {
  const { change, date } = await MOCKS.getOpportunityCost();

  return <OpportunityCostContent change={change} date={date} />;
}

async function OpportunityCostChartWrapper() {
  const { chart } = await MOCKS.getOpportunityCost();

  return <OpportunityCostChart chart={chart} />;
}
