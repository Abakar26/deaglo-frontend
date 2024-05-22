import { GeneralDashboardContent } from "./GeneralDashboardContent";

import MOCKS from "../_mocks";

export async function GeneralDashboardSegments() {
  const { hedgeAssetRatio, hedgeLiabilityRatio, hedged, rateOfReturn, tradesOpened, unhedged } =
    await MOCKS.getGeneralDashboardContent();

  return (
    <GeneralDashboardContent
      hedgeAssetRatio={hedgeAssetRatio}
      hedgeLiabilityRatio={hedgeLiabilityRatio}
      hedged={hedged}
      rateOfReturn={rateOfReturn}
      tradesOpened={tradesOpened}
      unhedged={unhedged}
    />
  );
}
