import { MarkToMarketSegments } from "./MarkToMarketSegments";

import MOCKS from "../_mocks";

export async function MarkToMarketWrapper() {
  const { segments } = await MOCKS.getMarkToMarket();

  return (
    <MarkToMarketSegments
      fwdMtM={segments.fwdMtM}
      generalMtM={segments.generalMtM}
      liveFXRates={segments.liveFXRates}
      optionsMtM={segments.optionsMtM}
    />
  );
}
