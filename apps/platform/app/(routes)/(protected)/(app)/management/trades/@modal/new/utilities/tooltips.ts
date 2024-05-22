import type { TooltipProps } from "ui/components";
import type { Fields } from "../components/AddTradeForm";

// TODO: Add tooltip body
export const tooltips: Record<Fields, TooltipProps> = {
  counterparty: { body: "TODO", icon: "info", label: "TODO" },
  trade_id: { body: "TODO", icon: "info", label: "Trade ID?" },
  exposure_id: { body: "TODO", icon: "info", label: "What's Exposure ID?" },
  trade_type: { body: "TODO", icon: "info", label: "What's Trade type?" },
  position: { body: "TODO", icon: "info", label: "Position?" },
  fixing_date: { body: "TODO", icon: "info", label: "What's Fixing date?" },
  execution_date: { body: "TODO", icon: "info", label: "What's Execution date?" },
  value_date: { body: "TODO", icon: "info", label: "What's Value Date?" },
  notional: { body: "TODO", icon: "info", label: "What's Notional?" },
  strike_price: { body: "TODO", icon: "info", label: "What's Strike price?" },
  spot_ref: { body: "TODO", icon: "info", label: "What's Spot Ref?" },
  premium: { body: "TODO", icon: "info", label: "What's Premium?" },
};
