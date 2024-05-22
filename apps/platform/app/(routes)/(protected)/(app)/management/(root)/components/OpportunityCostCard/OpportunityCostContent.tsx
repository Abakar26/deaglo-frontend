"use client";

import { Segment, SegmentedContentBlock } from "ui/components";
import { formatPercent, formatShortDate } from "@/utilities/format";
import { SegmentDescription } from "../shared";

type OpportunityCostContentProps = {
  change: number;
  date: Date;
};

export function OpportunityCostContent({ change, date }: OpportunityCostContentProps) {
  return (
    <SegmentedContentBlock>
      <Segment label={formatShortDate(date)}>
        {formatPercent(change)} <SegmentDescription>cashflow stress</SegmentDescription>
      </Segment>
    </SegmentedContentBlock>
  );
}
