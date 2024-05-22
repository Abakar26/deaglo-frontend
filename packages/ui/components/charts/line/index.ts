export * from "./Line";
export * from "./LineGraph";

export type LinearAxisOptions = {
  label?: string;
  min?: number;
  max?: number;
  formatter?: (value: number) => string;
};

export type LinearGraphOptions = {
  xAxis?: LinearAxisOptions;
  yAxis?: LinearAxisOptions;
  hideLegend?: boolean;
};
