"use client";

import { type ValueData, ValueGraph } from "ui/components";
import { formatPercent } from "@/utilities/format";

type OpportunityCostChartProps = {
  chart: { lines: ValueData; areas: ValueData };
};

export function OpportunityCostChart({ chart }: OpportunityCostChartProps) {
  return (
    <ValueGraph
      lines={chart.lines}
      areas={chart.areas}
      options={{ valueMin: -1, valueMax: 1, yFormatter: formatPercent }}
    />
  );
}
