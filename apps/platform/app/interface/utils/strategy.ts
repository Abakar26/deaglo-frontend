import { type Leg, type LegInstance, type Strategy, type StrategyInstance } from "..";

export const instanceToStrategy = (instance: StrategyInstance): Strategy => {
  return {
    ...instance,
    legs: instanceToLegs(instance.legs),
  };
};

export const strategyToInstance = (strategy: Strategy): StrategyInstance => {
  return {
    ...strategy,
    legs: legsToInstance(strategy.legs),
  };
};

export const instanceToLegs = (instances: Array<LegInstance>): Array<Leg> => {
  return instances
    .filter((leg) => leg.hiddenStrategyLeg)
    .map((leg) => ({
      ...leg.hiddenStrategyLeg!,
      title: `${leg.hiddenStrategyLeg?.isCall === null ? "Forward" : leg.hiddenStrategyLeg?.isCall ? "Call" : "Put"} (${
        leg.hiddenStrategyLeg?.isBought ? "Bought" : "Sold"
      })`,
      option:
        leg.hiddenStrategyLeg?.isCall === null
          ? "Forward"
          : leg.hiddenStrategyLeg?.isCall
            ? "Call"
            : "Put",
      action: leg.hiddenStrategyLeg?.isBought ? "Bought" : "Sold",
      premium: leg.premiumOverride,
      leverage: leg.leverageOverride,
      strike: leg.strikeOverride ?? leg.hiddenStrategyLeg?.strike,
    }));
};

export const legsToInstance = (legs: Array<Leg>): Array<LegInstance> => {
  return legs.map((leg) => ({
    ...leg,
    hiddenStrategyLeg: leg,
    premiumOverride: leg.premium,
    leverageOverride: leg.leverage,
    strikeOverride: leg.strike,
  }));
};
