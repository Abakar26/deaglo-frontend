"use client";

import { Segment, SegmentedContentBlock, SegmentedContentSize } from "ui/components";
import { type Currency } from "@/app/store/CurrencyStates";
import { formatAccounting } from "@/utilities/format";

type MarkToMarketSegmentsProps = {
  generalMtM: number;
  optionsMtM: number;
  fwdMtM: number;
  liveFXRates: {
    localCurrency: Currency;
    foreignCurrency: Currency;
    rate: number;
  };
};

export function MarkToMarketSegments({
  generalMtM,
  optionsMtM,
  fwdMtM,
  liveFXRates,
}: MarkToMarketSegmentsProps) {
  return (
    <SegmentedContentBlock separated size={SegmentedContentSize.MEDIUM}>
      <Segment label="General MtM">{formatAccounting(generalMtM)}</Segment>
      <Segment label="Options MtM">{formatAccounting(optionsMtM)}</Segment>
      <Segment label="Fwd MtM">{formatAccounting(fwdMtM)}</Segment>
      <Segment label="Live FX Rates">
        {liveFXRates.localCurrency.code}-{liveFXRates.foreignCurrency.code}{" "}
        {formatAccounting(liveFXRates.rate, 4)}
      </Segment>
    </SegmentedContentBlock>
  );
}
