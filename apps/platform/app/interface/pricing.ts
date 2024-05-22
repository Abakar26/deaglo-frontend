//
// Spot rate
//

export interface SpotRateRequest {
  baseCurrency: string;
  foreignCurrency: string;
  isBaseSold: boolean;
  startDate?: string;
}

export interface SpotRateResponse {
  baseCurrency: string;
  foreignCurrency: string;
  spotRate: number;
  timestamp: string;
}

//
// Forward rate
//

export interface ForwardRateRequest {
  baseCurrency: string;
  foreignCurrency: string;
  isBaseSold: boolean;
  startDate?: string; // defaults to today
  endDate: string;
  spotOverride?: number;
}

export interface ForwardRateResponse {
  baseCurrency: string;
  foreignCurrency: string;
  spotRate: number;
  forwardRate: number;
  expiry: ExpiryDetail;
  timestamp: string;
}

export interface ExpiryDetail {
  date: string;
  days: number;
}

//
// Option Price
//

export interface OptionPriceRequest {
  baseCurrency: string;
  foreignCurrency: string;
  isBaseSold: boolean;
  isCall: boolean;
  notional: number;
  strike: number;
  endDate: string;
  optionStyle?: "european" | "american";
  startDate?: string;
  barrierType?: "up-in" | "up-out" | "down-in" | "down-out";
  barrierLevel?: number;
  spotOverride?: number;
  forwardOverride?: number;
}

export interface OptionPriceResponse {
  baseCurrency: string;
  foreignCurrency: string;
  isCall: boolean;
  strike: number;
  spotRate: number;
  forwardRate: number;
  expiry: string;
  premium: PremiumDetail;
  timestamp: string;
  greeks?: Greeks;
}

export interface PremiumDetail {
  type: string;
  percentage: string;
  amount: string;
  currency: string;
  counterAmount: string;
  counterCurrency: string;
  timestamp: string;
}

export interface Greeks {
  delta: GreekDetail & {
    volatilityAdjustedValue: number;
    volatilityAdjustedPercentage: number;
    amount: number;
    counterAmount: number;
    counterPercentageAmount: number;
  };
  gamma: GreekSimpleDetail & {
    amount: number;
  };
  vega: GreekDetail & {
    counterValue: number;
    counterAmount: number;
  };
  dVegaDVol: GreekDetail & {
    amount?: number;
    percentageAmount: number;
  };
  phi: GreekDetail;
  theta: GreekDetail;
  rho: GreekDetail;
  vanna: GreekSimpleDetail & {
    amount: number;
  };
}

interface GreekDetail {
  value: number;
  percentage: number;
}

interface GreekSimpleDetail {
  value: number;
}
