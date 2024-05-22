import { AssetsAndLiabilitiesSegments } from "./AssetsAndLiabilitiesSegments";

import MOCKS from "../_mocks";

export async function AssetsAndLiabilitiesWrapper() {
  const { segments } = await MOCKS.getAssetsAndLiabilities();

  return (
    <AssetsAndLiabilitiesSegments
      hedgeAssetRatio={segments.hedgeAssetRatio}
      hedgeLiabilityRatio={segments.hedgeLiabilityRatio}
      totalAssets={segments.totalAssets}
      totalLiabilities={segments.totalLiabilities}
    />
  );
}
