import { useMemo } from "react";

const quantile = (data: number[], q: number): number => {
  if (q >= 1) {
    return data[data.length - 1] ?? 0;
  }
  const position = Math.ceil(q * data.length) - 1;

  return data[position] ?? 0;
};

export const useInsights = (data: Array<number>) => {
  return useMemo(() => {
    const ordered = data.sort();
    return {
      min: Math.min(...data),
      max: Math.max(...data),
      mean: data.reduce((a, b) => a + b, 0) / data.length,
      q1: quantile(ordered, 0.25),
      q3: quantile(ordered, 0.75),
    };
  }, [data]);
};
