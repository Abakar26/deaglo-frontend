import type { Currency } from "../store/CurrencyStates";

export interface Exposure {
  id: string;
  exposureId: number;
  foreignCurrency: Currency;
  exposureType: string;
  realizedInterestPayment: number;
  realizedPaymentDate: Date;
  realizedPrincipalPayment: number;
  theoreticalInterestPayment: number;
  theoreticalPaymentDate: Date;
  theoreticalPrincipalPayment: number;
}
