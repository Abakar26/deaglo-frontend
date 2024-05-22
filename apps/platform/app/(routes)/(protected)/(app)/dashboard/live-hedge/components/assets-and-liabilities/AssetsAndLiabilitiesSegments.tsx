"use client";

import {
  PercentChangeSegment,
  Segment,
  SegmentedContentBlock,
  SegmentedContentSize,
} from "ui/components";
import { formatAccounting, formatPercent } from "@/utilities/format";

type AssetsAndLiabilitiesSegmentsProps = {
  hedgeAssetRatio: number;
  hedgeLiabilityRatio: number;
  totalAssets: {
    change: number;
    data: number[];
    value: number;
  };
  totalLiabilities: number;
};

export function AssetsAndLiabilitiesSegments({
  hedgeAssetRatio,
  hedgeLiabilityRatio,
  totalAssets,
  totalLiabilities,
}: AssetsAndLiabilitiesSegmentsProps) {
  return (
    <SegmentedContentBlock equalized={false} separated size={SegmentedContentSize.MEDIUM}>
      <PercentChangeSegment
        change={totalAssets.change}
        data={totalAssets.data}
        description="from Liabilities"
        label="Total Assets"
        title={formatAccounting(totalAssets.value)}
      />
      <Segment label="Total Liabilities">{formatAccounting(totalLiabilities)}</Segment>
      <Segment label="Hedge/Asset ratio">{formatPercent(hedgeAssetRatio)}</Segment>
      <Segment label="Hedge/Liability ratio">{formatPercent(hedgeLiabilityRatio)}</Segment>
    </SegmentedContentBlock>
  );
}
