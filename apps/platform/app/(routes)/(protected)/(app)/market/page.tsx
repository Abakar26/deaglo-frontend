import styled from "styled-components";
import { FWDEfficiency, FXHeatMap, SpotHistory } from "./components";
import { MarketInteractor } from "@/app/interactors";
import { ErrorDispatcher } from "@/app/components";

const MarketPage = async () => {
  const [defaultMarket, error] = await MarketInteractor.defaultMarket.get();
  const [fwdRate, _error] = await MarketInteractor.pricing.getForwardRate({
    baseCurrency: defaultMarket?.fwdEfficiency.baseCurrency.code ?? "",
    foreignCurrency: defaultMarket?.fwdEfficiency.foreignCurrency.code ?? "",
    endDate: new Date().toISOString(),
    isBaseSold: false,
  });

  return (
    <>
      <SpotHistory spotHistory={defaultMarket?.spotHistory} />
      <FXHeatMap fxMovement={defaultMarket?.fxMovement} />
      <FWDEfficiency fwdEfficiency={defaultMarket?.fwdEfficiency} fwdRate={fwdRate?.forwardRate} />
      <ErrorDispatcher errors={[error, _error]} />
    </>
  );
};

export default MarketPage;
