import type { CellAlignment } from "ui/components";
import type { Currency } from "@/app/store/CurrencyStates";

type Keys =
  | "counterparty"
  | "currency_bought"
  | "currency_pair"
  | "currency_sold"
  | "execution_date"
  | "exposure_id"
  | "fixing_date"
  | "mtm_day"
  | "notional"
  | "position"
  | "premium"
  | "reference"
  | "spot_ref"
  | "strike_price"
  | "trade_id"
  | "trade_type"
  | "value_date";

export type KeyTypes = {
  counterparty: string;
  currency_bought: Currency;
  currency_sold: Currency;
  execution_date: Date;
  exposure_id: number;
  fixing_date: Date;
  id: string;
  notional: number;
  position: string;
  premium: number;
  spot_ref: number;
  strike_price: number;
  trade_id: string;
  trade_type: string;
  value_date: Date;
};

export const KEY_MAP: Record<Keys, { label: string; align?: CellAlignment }> = {
  counterparty: { label: "Counterparty" },
  currency_bought: { label: "Currency Bought" },
  currency_pair: { label: "Currency Pair" },
  currency_sold: { label: "Currency Sold" },
  execution_date: { label: "Execution Date" },
  exposure_id: { label: "Exposure ID" },
  fixing_date: { label: "Fixing Date" },
  mtm_day: { label: "MtM (day)", align: "end" },
  notional: { label: "Notional", align: "end" },
  position: { label: "Position" },
  premium: { label: "Premium", align: "end" },
  reference: { label: "Reference" },
  spot_ref: { label: "Spot Ref", align: "end" },
  strike_price: { label: "Strike Price", align: "end" },
  trade_id: { label: "Trade ID" },
  trade_type: { label: "Trade Type" },
  value_date: { label: "Value Date" },
};
