"use client";

import { BarGraph, type Bar } from "ui/components";
import { formatPercent } from "@/utilities/format";

type NIMCascadeChartProps = {
  data: Bar[];
};

export function NIMCascadeChart({ data }: NIMCascadeChartProps) {
  return <BarGraph data={data} options={{ max: 1, yFormatter: formatPercent }} />;
}
