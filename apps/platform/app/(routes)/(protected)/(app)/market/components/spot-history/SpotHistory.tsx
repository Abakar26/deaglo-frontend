"use client";

import { type SpotHistory as SpotHistoryData } from "@/app/interface";
import React, { useMemo } from "react";
import { CurrencySegment, Segment, SegmentedContentBlock } from "ui/components";
import { useInsights } from "ui/components/charts/hooks";
import { formatDuration } from "..";
import { MarketCard } from "../common";
import { SpotHistoryGraph } from "./SpotHistoryGraph";

interface Props {
  spotHistory?: SpotHistoryData;
}

export const SpotHistory: React.FunctionComponent<Props> = ({ spotHistory }) => {
  const volatility = useMemo(() => {
    const spotRates = spotHistory?.spotHistoryData.map(({ rate }) => rate) ?? [];
    const { mean } = useInsights(spotRates);
    const sqrDiff = spotRates.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
    return Math.sqrt(sqrDiff / spotRates.length);
  }, [spotHistory?.spotHistoryData]);

  return (
    <MarketCard
      title={spotHistory?.name ?? "Spot History"}
      onView={() => null}
      loading={!spotHistory}
    >
      {spotHistory && (
        <>
          <SegmentedContentBlock separated equalized>
            <CurrencySegment
              label="Currency pair"
              baseCurrency={spotHistory.baseCurrency.code}
              baseFlag={spotHistory.baseCurrency.countryName}
              foreignCurrency={spotHistory.foreignCurrency.code}
              foreignFlag={spotHistory.foreignCurrency.countryName}
            />
            <Segment label="Timeframe">{formatDuration(spotHistory.durationMonths)}</Segment>
            {/* <Segment label="Hedging cost">{spotHistory.hedgingCost}%</Segment> */}
            <Segment label="Live FX rate">
              {spotHistory.spotHistoryData.at(0)?.rate.toFixed(3)}
            </Segment>
            {/* <PercentChangeSegment label="Annual Volatility" change={0} /> */}
            <Segment label="Volatility">{(volatility * 100).toFixed(1)}%</Segment>
          </SegmentedContentBlock>
          <SpotHistoryGraph spot={spotHistory.spotHistoryData} hedge={[]} volatility={volatility} />
        </>
      )}
    </MarketCard>
  );
};
