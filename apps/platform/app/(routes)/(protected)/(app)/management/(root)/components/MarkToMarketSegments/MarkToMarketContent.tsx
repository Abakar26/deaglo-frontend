"use client";

import { Segment, SegmentedContentBlock, SegmentedContentSize } from "ui/components";
import { formatAccounting } from "@/utilities/format";

type MarkToMarketContentProps = {
  generalMtM: number;
  optionsMtM: number;
  fwdMtM: number;
  liveFXRates: {
    currencies: string[];
    value: number;
  };
};

export function MarkToMarketContent({
  generalMtM,
  optionsMtM,
  fwdMtM,
  liveFXRates,
}: MarkToMarketContentProps) {
  return (
    <SegmentedContentBlock separated size={SegmentedContentSize.MEDIUM}>
      <Segment label="General MtM">{formatAccounting(generalMtM)}</Segment>
      <Segment label="Options MtM">{formatAccounting(optionsMtM)}</Segment>
      <Segment label="Fwd MtM">{formatAccounting(fwdMtM)}</Segment>
      <Segment label="Live FX Rates">
        {liveFXRates.currencies[0]}-{liveFXRates.currencies[1]}{" "}
        {formatAccounting(liveFXRates.value, 4)}
      </Segment>
    </SegmentedContentBlock>
  );
}
