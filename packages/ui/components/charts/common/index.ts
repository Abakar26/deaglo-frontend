export * from "./DiscreteGraph";
export * from "./DateGraph";
export * from "./Graph";
export * from "./Legend";

export type GraphDirection = "horizontal" | "vertical";
export interface GraphProps<T, K> {
  height: number;
  width: number;
  direction?: GraphDirection;
  xTickStyle?: string;
  yTickStyle?: string;
  xFormatter?: (value: T) => string;
  yFormatter?: (value: K) => string;
  yAxisLabel?: string;
  xAxisLabel?: string;
  withAxis?: boolean;
  withLabels?: boolean;
}
