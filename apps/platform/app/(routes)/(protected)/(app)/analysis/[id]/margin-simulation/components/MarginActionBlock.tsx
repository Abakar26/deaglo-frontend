"use client";

import React from "react";
import { ContentBlock, ContentIconColor } from "ui/components";

interface Props {
  hasSimulations: boolean;
}

export const MarginActionBlock: React.FunctionComponent<Props> = ({ hasSimulations }) => {
  return hasSimulations ? undefined : (
    // <ContentBlock
    //   title="Get more advanced results with running IM, VM and MTM tool"
    //   description="Hedge Efficiency will enhance the understanding of Mark to Market data and show its potential effect on your assets and liabilities"
    //   color={ContentColor.NEUTRAL_00}
    //   icon={{
    //     icon: "mark-to-market",
    //     color: ContentIconColor.BRAND_100,
    //   }}
    //   action={{
    //     label: "Run Portfolio Stress Test",
    //     onClick: () => null,
    //   }}
    // />
    <ContentBlock
      title="Margin Simulations are based on Strategy Simulations"
      description="Please create a Strategy Simulation to get started."
      action={{
        label: "Run Strategy Simulation",
        onClick: () => null,
      }}
      icon={{
        icon: "strategy",
        color: ContentIconColor.NEUTRAL_00,
      }}
    />
  );
};
