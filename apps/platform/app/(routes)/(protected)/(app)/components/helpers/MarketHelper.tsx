import { useHelperBlockStore } from "@/app/store";
import React from "react";
import { HelperBlock } from "ui/components";

export const MarketHelper: React.FunctionComponent = () => {
  const { setVisible } = useHelperBlockStore();

  return <HelperBlock title={"Need help?"} onClose={() => setVisible(false)}></HelperBlock>;
};
