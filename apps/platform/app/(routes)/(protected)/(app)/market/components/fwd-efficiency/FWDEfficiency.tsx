"use client";

import { type FWDEffeciency as FWDEfficiencyData } from "@/app/interface";
import React, { useMemo } from "react";
import styled from "styled-components";
import { CurrencySegment, FWDEfficiencyGraph, Segment, SegmentedContentBlock } from "ui/components";
import { useInsights } from "ui/components/charts/hooks";
import { formatDuration } from "..";
import { MarketCard } from "../common";

interface Props {
  fwdEfficiency?: FWDEfficiencyData;
  fwdRate?: number;
}

export const FWDEfficiency: React.FunctionComponent<Props> = ({ fwdEfficiency, fwdRate }) => {
  const spotRate = fwdEfficiency?.spotHistoryData.at(0)?.rate;
  const volatility = useMemo(() => {
    const spotRates = fwdEfficiency?.spotHistoryData.map(({ rate }) => rate) ?? [];
    const { mean } = useInsights(spotRates);
    const sqrDiff = spotRates.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
    return Math.sqrt(sqrDiff / spotRates.length);
  }, [fwdEfficiency?.spotHistoryData]);

  return (
    <MarketCard
      title={fwdEfficiency?.name ?? "Forward Efficiency"}
      onView={() => null}
      loading={!fwdEfficiency || !fwdRate}
    >
      {fwdEfficiency && fwdRate && spotRate && (
        <>
          <SegmentedContentBlock separated equalized>
            <CurrencySegment
              label="Currency pair"
              baseCurrency={fwdEfficiency.baseCurrency.code}
              baseFlag={fwdEfficiency.baseCurrency.countryName}
              foreignCurrency={fwdEfficiency.foreignCurrency.code}
              foreignFlag={fwdEfficiency.foreignCurrency.countryName}
            />
            <Segment label="Timeframe">{formatDuration(fwdEfficiency.durationMonths)}</Segment>
            <Segment label="Spot Rate">{spotRate.toFixed(3)}</Segment>
            <Segment label="Forward Rate">{fwdRate.toFixed(3)}</Segment>
            <Segment label="Volatility">{(volatility * 100).toFixed(1)}%</Segment>
          </SegmentedContentBlock>
          <GraphContainer>
            <FWDEfficiencyGraph spot={spotRate} fwdRate={fwdRate} volatility={volatility} />
          </GraphContainer>
        </>
      )}
    </MarketCard>
  );
};

const GraphContainer = styled.div`
  width: 100%;
  height: 312px;
`;
