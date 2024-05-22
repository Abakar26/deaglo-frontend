"use client";

import { type ValueData, ValueGraph } from "ui/components";
import { formatPercent } from "@/utilities/format";

type MarginChangesChartProps = {
  chart: { lines: ValueData; areas: ValueData };
};

export function MarginChangesChart({ chart }: MarginChangesChartProps) {
  return (
    <ValueGraph lines={chart.lines} areas={chart.areas} options={{ yFormatter: formatPercent }} />
  );
}
