import { Suspense } from "react";
import { SuspenseBlock } from "ui/components";
import { Card, CardTitle, SmallMarkToMarketChart } from "../shared";
import { HistoricalMtMChart } from "./HistoricalMtMChart";

export function HistoricalMtMCard() {
  return (
    <Card>
      <header>
        <CardTitle>Historical MtM</CardTitle>
      </header>

      <SmallMarkToMarketChart>
        <Suspense fallback={<SuspenseBlock />}>
          <HistoricalMtMChart />
        </Suspense>
      </SmallMarkToMarketChart>
    </Card>
  );
}
