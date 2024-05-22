"use client";
import { abbreviateNumber } from "@/utilities/conversions";
import React from "react";
import {
  CurrencySegment,
  Segment,
  SegmentedContentBlock,
  SegmentedContentSize,
} from "ui/components";
import { useAnalysisCurrencies } from "../../builder/hooks";

interface Props {
  amount: number;
}

export const OverviewAmount: React.FunctionComponent<Props> = ({ amount }) => {
  const { loading, error, currencies } = useAnalysisCurrencies();
  return currencies ? (
    <SegmentedContentBlock size={SegmentedContentSize.MEDIUM} separated>
      <CurrencySegment
        size={SegmentedContentSize.MEDIUM}
        baseFlag={currencies.base.countryName}
        label="Sold to Bought"
        foreignFlag={currencies.foreign.countryName}
        baseCurrency={currencies.base.code}
        foreignCurrency={currencies.foreign.code}
      />

      <Segment label="Amount" size={SegmentedContentSize.MEDIUM}>
        <p>
          {abbreviateNumber(amount)} {currencies.base.code}
        </p>
      </Segment>
    </SegmentedContentBlock>
  ) : null;
};
