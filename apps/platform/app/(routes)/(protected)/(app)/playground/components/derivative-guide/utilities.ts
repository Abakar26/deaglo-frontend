import type { Leg, Strategy } from "@/app/interface";
import type { ComponentProps } from "react";
import type { PayoffGraph, Selectable } from "ui/components";

export const DEFAULT_LEVERAGE = 1;
export const DEFAULT_NOTIONAL = 1_000_000;
export const DEFAULT_PREMIUM = 10; // %
export const DEFAULT_SPOT = 5;

export function overrideStrategyDefaults(strategy: Strategy): Strategy {
  return {
    ...strategy,
    legs: strategy.legs.map((leg) => ({
      ...leg,
      leverage: DEFAULT_LEVERAGE,
      premium: DEFAULT_PREMIUM,
    })),
  };
}

export function getPayoffGraphProps(legs: Leg[]): ComponentProps<typeof PayoffGraph> {
  const computePremium = (premium: number) => (premium / 100) * DEFAULT_NOTIONAL;

  return {
    legs: legs.map((leg) => ({
      ...leg,
      premium: leg.isCall === null ? 0 : computePremium(leg.premium),
    })),
    notional: DEFAULT_NOTIONAL,
    spot: DEFAULT_SPOT,
    options: {
      xAxis: { label: "Spot" },
      yAxis: { label: "Investment, Term currency" },
      hideLegend: true,
    },
  };
}

export type ExposureDirection = "bought" | "sold";

export const exposureDirectionOptions: Selectable<ExposureDirection>[] = [
  { key: "bought", value: "Buying base currency" },
  { key: "sold", value: "Selling base currency" },
];

export function applyStrategyFlipLogic(
  strategy: Strategy,
  direction: ExposureDirection | undefined
): Strategy {
  if (direction === "sold" || strategy.isCustom) return strategy;

  const flip = (leg: Leg) => ({ ...leg, isCall: !leg.isCall });
  return { ...strategy, legs: strategy.legs.map(flip) };
}
