"use client";

import { TabBar, TabBarSize } from "ui/components";
import { useQueryParams } from "@/app/hooks/useQueryParams";

export function SummaryTabBar() {
  const { params, update } = useQueryParams();

  return (
    <TabBar
      current={params.get("period") ?? "5D"}
      onChange={(value) => update("period", value)}
      size={TabBarSize.SMALL}
      tabs={[
        { key: "1D", label: "1D" },
        { key: "5D", label: "5D" },
        { key: "1M", label: "1M" },
        { key: "1Y", label: "1Y" },
        { key: "MAX", label: "MAX" },
      ]}
    />
  );
}
