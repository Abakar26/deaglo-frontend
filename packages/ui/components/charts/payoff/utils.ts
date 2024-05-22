import { PayoffLeg } from ".";

export const payoff = (spot: number, value: number, notional: number, leg: PayoffLeg): number => {
  const direction = leg.isBought ? 1 : -1;
  const premium = leg.premium * direction;

  if (leg.isCall === null) {
    const forwardPrice = (1 + leg.strike / 100) * spot;
    const payoff = (value - forwardPrice) * leg.leverage * direction * notional;
    return payoff - premium;
  }

  const strike = (leg.isCall ? 1 - (leg.strike ?? 0) / 100 : 1 + (leg.strike ?? 0) / 100) * spot;
  if (leg.isCall) {
    const payoff = value < strike ? 0 : (value - strike) * leg.leverage * direction * notional;
    return payoff - premium;
  } else {
    const payoff = value > strike ? 0 : (strike - value) * leg.leverage * direction * notional;
    return payoff - premium;
  }
};

export const layeredPayoff = (
  spot: number,
  value: number,
  notional: number,
  legs: Array<PayoffLeg>
): number => {
  return legs.reduce((sum, leg) => {
    return sum + payoff(spot, value, notional, leg);
  }, 0);
};
