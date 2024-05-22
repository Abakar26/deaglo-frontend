"use client";

import { MarketInteractor } from "@/app/interactors";
import { type Leg, type OptionPriceResponse, type Strategy } from "@/app/interface";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useAnalysisCurrencies } from "../../../hooks";
import { useStrategyBuilderStore } from "../../../store";

export const usePremiumPricing = (strategies: Array<Strategy>) => {
  const [premiums, setPremiums] = useState<
    Record<string, { amount: number; currency: string } | undefined>
  >({});

  const { notional, market } = useStrategyBuilderStore();
  const { currencies } = useAnalysisCurrencies();

  const fetchPremium = async (
    leg: Leg,
    legIndex: number,
    strategyId: string,
    strategyIndex: number
  ): Promise<(OptionPriceResponse & { id: string }) | undefined> => {
    const strike = leg.strike;
    const barrierLevel = leg.barrierLevel;

    if (notional && strike !== undefined && market && currencies && leg.isCall !== null) {
      const { isBaseSold, amount, endDate } = notional;
      const [reply, _] = await MarketInteractor.pricing.getOptionPrice({
        ...leg,
        strike: (leg.isCall ? 1 - strike / 100 : 1 + strike / 100) * market.spot,
        isBaseSold,
        baseCurrency: currencies.base.code,
        foreignCurrency: currencies.foreign.code,
        endDate: format(endDate, "yyyy-MM-dd"),
        notional: amount * leg.leverage,
        barrierLevel: barrierLevel
          ? leg.isCall
            ? 1 - barrierLevel / 100
            : (1 + barrierLevel / 100) * market.spot
          : undefined,
        barrierType: leg.barrierType ?? undefined,
        isCall: leg.isCall,
      });
      if (reply) {
        return {
          id: `${strategyId}:${strategyIndex}:${leg.strategyLegId}:${legIndex}`,
          ...reply,
        };
      }
    }
  };

  useEffect(() => {
    strategies.forEach((strategy, strategyIndex) => {
      strategy.legs.forEach((leg, legIndex) => {
        (async () => {
          setPremiums((p) => ({
            ...p,
            [`${strategy.strategyId}:${strategyIndex}:${leg.strategyLegId}:${legIndex}`]: undefined,
          }));
          const response = await fetchPremium(leg, legIndex, strategy.strategyId, strategyIndex);
          response &&
            setPremiums((p) => ({
              ...p,
              [response.id]: {
                amount: Math.abs(parseFloat(response.premium.amount)),
                currency: response.premium.currency,
              },
            }));
        })().catch((err) => console.error(err));
      });
    });
    // eslint-disable-next-line
  }, [notional, currencies, strategies]);

  const refresh = async (leg: Leg, legIndex: number, strategyId: string, strategyIndex: number) => {
    setPremiums((p) => ({
      ...p,
      [`${strategyId}:${strategyIndex}:${leg.strategyLegId}:${legIndex}`]: undefined,
    }));
    const _premium = await fetchPremium(leg, legIndex, strategyId, strategyIndex);
    if (_premium) {
      const { id, premium } = _premium;
      setPremiums((p) => ({
        ...p,
        [id]: {
          amount: Math.abs(parseFloat(premium.amount)),
          currency: premium.currency,
        },
      }));
    }
  };

  const getPremium = (
    legId: string,
    legIndex: number,
    strategyId: string,
    strategyIndex: number
  ) => {
    const premium = premiums[`${strategyId}:${strategyIndex}:${legId}:${legIndex}`];
    return premium;
  };

  const premiumsValid = () => {
    const forwardStrategyId = strategies.find((value) => value.name == "Forward")?.strategyId;
    const filteredPremiums = Object.entries(premiums).filter(([key]) => {
      const strategyId = key.split(":")[0];
      return strategyId !== (forwardStrategyId ?? "a88cbfc8-12a5-41d0-8151-c869ed39b8b5");
    });
    return !filteredPremiums.some(([_, value]) => value == undefined || Number.isNaN(value.amount));
  };

  return {
    premiums,
    refresh,
    getPremium,
    premiumsValid,
  };
};
