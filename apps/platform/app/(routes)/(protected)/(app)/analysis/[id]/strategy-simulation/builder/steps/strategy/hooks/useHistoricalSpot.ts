"use client";

import { useEffect, useState } from "react";
import { useStrategyBuilderStore } from "../../../store";
import { HistoricalSpot } from "@/app/interface";
import { useAnalysisCurrencies } from "../../../hooks";
import { MarketInteractor } from "@/app/interactors";
import { format, subYears } from "date-fns";

export const useHistoricalSpot = () => {
  const { notional } = useStrategyBuilderStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [spotHistoryData, setSpotHistoryData] = useState<HistoricalSpot>();
  const { currencies } = useAnalysisCurrencies();

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (notional && currencies) {
        const { isBaseSold, startDate } = notional;
        const { base, foreign } = currencies;
        const [spotData, _] = await MarketInteractor.spotHistory.getHistorical({
          startDate: format(subYears(startDate, 1), "yyyy-MM-dd"),
          endDate: format(startDate, "yyyy-MM-dd"),
          baseCurrency: base,
          foreignCurrency: foreign,
          isBaseSold,
        });
        setSpotHistoryData(spotData?.spotHistoryData);
      }
      setLoading(false);
    })();
  }, [notional, currencies]);

  return {
    loading,
    spotHistoryData,
  };
};
