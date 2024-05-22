"use client";

import {
  PercentChangeSegment,
  Segment,
  SegmentedContentBlock,
  SegmentedContentSize,
} from "ui/components";
import { formatCurrency, formatPercent } from "@/utilities/format";

type GeneralDashboardContentProps = {
  hedgeAssetRatio: number;
  hedgeLiabilityRatio: number;
  hedged: number;
  rateOfReturn: {
    change: number;
    data: number[];
    period: string;
  };
  tradesOpened: number;
  unhedged: number;
};

export function GeneralDashboardContent({
  hedgeAssetRatio,
  hedgeLiabilityRatio,
  hedged,
  rateOfReturn,
  tradesOpened,
  unhedged,
}: GeneralDashboardContentProps) {
  return (
    <SegmentedContentBlock separated size={SegmentedContentSize.LARGE}>
      <Segment label="Hedged">{formatCurrency(hedged, 0)}</Segment>
      <Segment label="Unhedged">{formatCurrency(unhedged, 0)}</Segment>
      <PercentChangeSegment
        change={rateOfReturn.change}
        data={rateOfReturn.data}
        description={`from ${rateOfReturn.period}`}
        label="Rate of return"
      />
      <Segment label="Hedge/Asset ratio">{formatPercent(hedgeAssetRatio)}</Segment>
      <Segment label="Hedge/Liability ratio">{formatPercent(hedgeLiabilityRatio)}</Segment>
      <Segment label="Trades Opened">{tradesOpened}</Segment>
    </SegmentedContentBlock>
  );
}
