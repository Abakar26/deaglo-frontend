export * from "./fwd-efficiency";
export * from "./fx-heatmap";
export * from "./spot-history";

export const formatDuration = (months: number): string => {
  return months < 12
    ? `${months} Months`
    : `${(months / 12).toFixed(months % 12 === 0 ? 0 : 1)} Years`;
};
