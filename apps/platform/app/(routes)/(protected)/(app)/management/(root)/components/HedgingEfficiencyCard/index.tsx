"use client";

import { useEffect, useState } from "react";
import {
  PercentChangeSegment,
  SegmentedContentBlock,
  SegmentedControl,
  SegmentedControlSize,
  SuspenseBlock,
  ValueGraph,
} from "ui/components";
import {
  Card,
  CardHeader,
  CardSubtitle,
  CardTitle,
  HeaderSpacer,
  SmallGeneralDashboardChart,
} from "../shared";
import { ContentBlockSkeleton } from "../skeletons";

import MOCKS, { type HedgingEfficiencyView } from "../_mocks";
import { formatCurrency, formatPercent, formatShortDate } from "@/utilities/format";
type Data = Awaited<ReturnType<typeof MOCKS.getHedgingEfficiency>> | undefined;

export function HedgingEfficiencyCard() {
  const [view, setView] = useState<HedgingEfficiencyView>("value");

  const [data, setData] = useState<Data>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    MOCKS.getHedgingEfficiency(view)
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [view]);

  return (
    <Card>
      <HeaderSpacer>
        <CardHeader>
          <CardTitle>Hedging efficiency</CardTitle>
          <CardSubtitle>
            {view === "value"
              ? "Cost of hedged compare to unhedged"
              : "Cost of strategies compare to previous year"}
          </CardSubtitle>
        </CardHeader>

        <SegmentedControl
          initial={view}
          onChange={(option) => setView(option.key as HedgingEfficiencyView)}
          segments={[
            { label: "%", icon: "percent", key: "percent" },
            { label: "$", icon: "dollar", key: "value" },
          ]}
          size={SegmentedControlSize.SMALL}
        />
      </HeaderSpacer>

      {!loading && data !== undefined ? (
        <SegmentedContentBlock>
          <PercentChangeSegment
            change={data.content.change}
            data={data.content.data}
            description={`from ${data.content.period}`}
            label={formatShortDate(data.date)}
            title={
              view === "value"
                ? formatCurrency(data.content.value, 0)
                : formatPercent(data.content.value)
            }
          />
        </SegmentedContentBlock>
      ) : (
        <ContentBlockSkeleton />
      )}

      <SmallGeneralDashboardChart>
        {!loading && data !== undefined ? (
          <ValueGraph
            lines={data.chart.lines}
            areas={data.chart.areas}
            options={
              view === "percent"
                ? { valueMin: 0, valueMax: 1, yFormatter: formatPercent }
                : { valueMin: 0 }
            }
          />
        ) : (
          <SuspenseBlock />
        )}
      </SmallGeneralDashboardChart>
    </Card>
  );
}
