"use client";

import { MarketInteractor } from "@/app/interactors";
import { addYears, format } from "date-fns";
import { useEffect, useState } from "react";
import { useAnalysisCurrencies } from ".";
import { useNotionalStore } from "../steps/notional/store/useNotionalStore";
import { useStrategyBuilderStore } from "../store";

export const useStrategyMarket = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { notional, market, setMarket } = useStrategyBuilderStore();
  const { notional: formNotional } = useNotionalStore();
  const { currencies } = useAnalysisCurrencies();

  useEffect(() => {
    const startDate = formNotional.startDate ?? notional?.startDate ?? new Date();
    const endDate = formNotional.endDate ?? notional?.endDate ?? addYears(startDate, 1);
    const isBaseSold = formNotional.isBaseSold ?? notional?.isBaseSold ?? false;
    (async () => {
      if (currencies) {
        setLoading(true);
        const [fwd] = await MarketInteractor.pricing.getForwardRate({
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
          baseCurrency: currencies.base.code,
          foreignCurrency: currencies.foreign.code,
          isBaseSold,
        });
        const [spot] = await MarketInteractor.pricing.getSpotRate({
          startDate: format(startDate, "yyyy-MM-dd"),
          baseCurrency: currencies.base.code,
          foreignCurrency: currencies.foreign.code,
          isBaseSold,
        });
        spot && fwd && setMarket({ spot: spot.spotRate, fwd: fwd.forwardRate });
        setLoading(false);
      }
    })().catch((err) => console.error(err));
    // eslint-disable-next-line
  }, [
    notional?.endDate,
    notional?.startDate,
    notional?.isBaseSold,
    formNotional.startDate,
    formNotional.endDate,
    formNotional.isBaseSold,
    currencies,
  ]);

  return {
    market,
    loading,
  };
};
