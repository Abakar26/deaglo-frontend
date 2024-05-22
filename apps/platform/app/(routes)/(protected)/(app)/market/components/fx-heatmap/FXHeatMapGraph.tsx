"use client";

import { type HistoricalSpot, type MarketCurrency } from "@/app/interface";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { type HeatEntry, HeatMapGraph, SuspenseBlock } from "ui/components";
import { max, min, eachMonthOfInterval, isSameMonth, format } from "date-fns";

interface Props {
  data: Array<{
    baseCurrency: MarketCurrency;
    foreignCurrency: MarketCurrency;
    spotHistoryData: HistoricalSpot;
  }>;
}

export const FXHeatMapGraph: React.FunctionComponent<Props> = ({ data }) => {
  const [heats, setHeats] = useState<Array<HeatEntry>>();

  useEffect(() => {
    const dates = data.flatMap((entry) => entry.spotHistoryData.map(({ date }) => new Date(date)));
    const minDate = min(dates);
    const maxDate = max(dates);
    const months = eachMonthOfInterval({ start: minDate, end: maxDate });
    const _heats = data.flatMap((heatEntry) => {
      return months.map((month) => {
        const monthRates = heatEntry.spotHistoryData
          .map(({ rate, date }) => ({ value: rate, date: new Date(date) }))
          .filter(({ date }) => isSameMonth(month, date));
        const orderedRates = monthRates.sort((a, b) => (a.date < b.date ? -1 : 1));
        const startRate = orderedRates.at(0);
        const endRate = orderedRates.at(-1);
        return {
          entry: format(month, "MMM yyyy"),
          group: `${heatEntry.baseCurrency.code},${heatEntry.foreignCurrency.code}`,
          value:
            startRate && endRate ? ((endRate.value - startRate.value) / startRate.value) * 100 : 0,
        };
      });
    });
    setHeats(_heats);
  }, [data]);

  return (
    <Container>
      {heats ? <HeatMapGraph heats={heats} /> : <SuspenseBlock width="100%" height="100%" />}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 312px;
`;
