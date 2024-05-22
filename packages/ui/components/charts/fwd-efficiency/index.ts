export * from "./FWDEfficiencyGraph";

export const gaussian = (x: number, mean: number, stdDev: number) => {
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const power = -0.5 * Math.pow((x - mean) / stdDev, 2);
  return coefficient * Math.pow(Math.E, power);
};
