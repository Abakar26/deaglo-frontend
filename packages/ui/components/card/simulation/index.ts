import { CardIconColor, type IconName } from "../../../components";

export * from "./SimulationCard";

export enum SimulationType {
  STRATEGY = "STRATEGY",
  MARGIN = "MARGIN",
  HEDGE = "HEDGE",
}

export const getSimulationIcon = (
  type: SimulationType
): { color: CardIconColor; icon: IconName } => {
  switch (type) {
    case SimulationType.HEDGE:
      return {
        color: CardIconColor.SUCCESS_100,
        icon: "hedge",
      };
    case SimulationType.MARGIN:
      return {
        color: CardIconColor.BROWN_100,
        icon: "margin",
      };
    case SimulationType.STRATEGY:
      return {
        color: CardIconColor.BRAND_100,
        icon: "strategy",
      };
  }
};
