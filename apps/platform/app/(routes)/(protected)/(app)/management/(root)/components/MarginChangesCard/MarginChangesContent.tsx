"use client";

import { Segment, SegmentedContentBlock } from "ui/components";
import { formatPercent, formatShortDate } from "@/utilities/format";
import { SegmentDescription } from "../shared";

type MarginChangesContentProps = {
  change: number;
  date: Date;
};

export function MarginChangesContent({ change, date }: MarginChangesContentProps) {
  return (
    <SegmentedContentBlock>
      <Segment label={formatShortDate(date)}>
        {formatPercent(change)} <SegmentDescription>Margin changes</SegmentDescription>
      </Segment>
    </SegmentedContentBlock>
  );
}
