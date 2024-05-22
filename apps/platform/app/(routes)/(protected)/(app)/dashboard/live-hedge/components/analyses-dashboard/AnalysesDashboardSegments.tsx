"use client";

import {
  PercentChangeSegment,
  Segment,
  SegmentedContentBlock,
  SegmentedContentSize,
} from "ui/components";
import { formatCurrency, formatPercent } from "@/utilities/format";

type AnalysesDashboardProps = {
  hedged: number;
  hedgingEfficiency: {
    change: number;
    data: number[];
    period: string;
    value: number;
  };
  marginChanges: {
    change: number;
    data: number[];
    period: string;
  };
  rateOfReturn: {
    change: number;
    data: number[];
    period: string;
  };
  unhedged: number;
};

export function AnalysesDashboardSegments({
  hedged,
  hedgingEfficiency,
  marginChanges,
  rateOfReturn,
  unhedged,
}: AnalysesDashboardProps) {
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
      <PercentChangeSegment
        change={hedgingEfficiency.change}
        data={hedgingEfficiency.data}
        description={`from ${hedgingEfficiency.period}`}
        label="Hedging efficiency"
        title={formatPercent(hedgingEfficiency.value)}
      />
      <PercentChangeSegment
        change={marginChanges.change}
        data={marginChanges.data}
        description={`from ${marginChanges.period}`}
        label="Margin Changes"
      />
    </SegmentedContentBlock>
  );
}
