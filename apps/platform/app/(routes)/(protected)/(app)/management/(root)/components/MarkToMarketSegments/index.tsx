import { MarkToMarketContent } from "./MarkToMarketContent";

import MOCKS from "../_mocks";

export async function MarkToMarketSegments() {
  const { fwdMtM, generalMtM, liveFXRates, optionsMtM } = await MOCKS.getMarkToMarketContent();

  return (
    <MarkToMarketContent
      fwdMtM={fwdMtM}
      generalMtM={generalMtM}
      liveFXRates={liveFXRates}
      optionsMtM={optionsMtM}
    />
  );
}
