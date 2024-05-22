import { type ReactNode } from "react";
import { DashboardHelper } from "./DashboardHelper";
import { AnalysesHelper } from "./AnalysesHelper";
import { ManagementHelper } from "./ManagementHelper";
import { MarketHelper } from "./MarketHelper";
import { PaymentsHelper } from "./PaymentsHelper";
import { PremiumHelper } from "./PremiumHelper";

export enum HelperBlockType {
  DASHBOARD,
  MARKET,
  ANAYLSES,
  PAYMENTS,
  MANAGEMENT,
  PEMIUM,
}

export const getHelperBlock = (type: HelperBlockType): ReactNode => {
  switch (type) {
    case HelperBlockType.DASHBOARD:
      return <DashboardHelper />;
    case HelperBlockType.ANAYLSES:
      return <AnalysesHelper />;
    case HelperBlockType.MANAGEMENT:
      return <ManagementHelper />;
    case HelperBlockType.MARKET:
      return <MarketHelper />;
    case HelperBlockType.PAYMENTS:
      return <PaymentsHelper />;
    case HelperBlockType.PEMIUM:
      return <PremiumHelper />;
  }
};
