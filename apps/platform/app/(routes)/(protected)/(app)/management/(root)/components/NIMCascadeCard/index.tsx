import { Suspense } from "react";
import { SuspenseBlock } from "ui/components";
import { Card, CardTitle, SmallMarkToMarketChart } from "../shared";
import { NIMCascadeChart } from "./NIMCascadeChart";

import MOCKS from "../_mocks";

export function NIMCascadeCard() {
  return (
    <Card>
      <header>
        <CardTitle>NIM CASCADE</CardTitle>
      </header>

      <SmallMarkToMarketChart>
        <Suspense fallback={<SuspenseBlock />}>
          <NIMCascadeChartWrapper />
        </Suspense>
      </SmallMarkToMarketChart>
    </Card>
  );
}

async function NIMCascadeChartWrapper() {
  const data = await MOCKS.getNIMCascade();

  return <NIMCascadeChart data={data} />;
}
