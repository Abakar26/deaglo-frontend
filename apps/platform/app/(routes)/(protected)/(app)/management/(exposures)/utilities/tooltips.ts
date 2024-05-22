import type { TooltipProps } from "ui/components";
import type { Exposure } from "@/app/interface/management";
import { type ExposuresType } from "./keys";

type TooltipMap = Record<keyof Exposure, TooltipProps>;

// TODO: Add missing tooltip body and label
const sharedTooltips: TooltipMap = {
  id: { label: "" },
  exposureId: { body: "TODO", icon: "info", label: "What's Exposure ID?" },
  foreignCurrency: { body: "TODO", icon: "info", label: "Foreign Currency?" },
  exposureType: { body: "TODO", icon: "info", label: "What's Exposure Type?" },
  realizedInterestPayment: { body: "TODO", icon: "info", label: "TODO" },
  realizedPaymentDate: { body: "TODO", icon: "info", label: "TODO" },
  realizedPrincipalPayment: { body: "TODO", icon: "info", label: "TODO" },
  theoreticalInterestPayment: { body: "TODO", icon: "info", label: "TODO" },
  theoreticalPaymentDate: { body: "TODO", icon: "info", label: "TODO" },
  theoreticalPrincipalPayment: { body: "TODO", icon: "info", label: "TODO" },
};

// TODO: Add missing tooltip body and label
export const tooltips: Record<ExposuresType, TooltipMap> = {
  assets: {
    ...sharedTooltips,
    exposureType: { body: "TODO", icon: "info", label: "What's Asset Type?" },
  },
  liabilities: {
    ...sharedTooltips,
    exposureType: { body: "TODO", icon: "info", label: "What's Liability Type?" },
  },
};
