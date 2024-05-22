import { Color } from "../../../styles";

export * from "./HeatMapGraph";

export const HEAT_COLORS = [
  Color.DANGER_400,
  Color.DANGER_300,
  Color.DANGER_100,
  Color.NEUTRAL_150,
  Color.BRAND_100,
  Color.BRAND_300,
  Color.BRAND_400,
];

export interface HeatEntry {
  group: string;
  entry: string;
  value: number;
}
