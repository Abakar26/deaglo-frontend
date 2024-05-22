"use client";

import React, { useMemo } from "react";
import { TabBar } from "ui/components";
import { useStrategyBuilderStore } from "../../../store";

export enum StrategyTab {
  VANILLA = "VANILLA",
  COMPOSITE = "COMPOSITE",
  CUSTOM = "CUSTOM",
}

interface Props {
  vanillaCount: number;
  compositeCount: number;
  customCount: number;
  changeTab: (tab: StrategyTab) => void;
  tab: StrategyTab;
}

export const StrategyTabs: React.FunctionComponent<Props> = ({
  vanillaCount,
  compositeCount,
  customCount,
  changeTab,
  tab,
}) => {
  const { strategies } = useStrategyBuilderStore();

  const selected = useMemo(
    () => ({
      vanillaCount: strategies.filter(
        (strategy) => !strategy.isCustom && strategy.legs.length === 1
      ).length,
      compositeCount: strategies.filter(
        (strategy) => !strategy.isCustom && strategy.legs.length > 1
      ).length,
      customCount: strategies.filter((strategy) => strategy.isCustom).length,
    }),
    [strategies]
  );

  return (
    <TabBar
      onChange={(key) => changeTab(key as StrategyTab)}
      current={tab}
      tabs={[
        {
          key: StrategyTab.VANILLA,
          label: "Vanilla Strategies",
          amount: vanillaCount,
          selected: selected.vanillaCount > 0 ? selected.vanillaCount : undefined,
        },
        {
          key: StrategyTab.COMPOSITE,
          label: "Composite Strategies",
          amount: compositeCount,
          selected: selected.compositeCount > 0 ? selected.compositeCount : undefined,
        },
        {
          key: StrategyTab.CUSTOM,
          label: "Custom Strategies",
          amount: customCount,
          selected: selected.customCount > 0 ? selected.customCount : undefined,
        },
      ]}
    />
  );
};
