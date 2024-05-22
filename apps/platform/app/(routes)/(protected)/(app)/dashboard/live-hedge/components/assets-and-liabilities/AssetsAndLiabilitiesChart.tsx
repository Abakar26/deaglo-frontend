import { BarGraph } from "ui/components";
import MOCKS from "../_mocks";

export async function AssetsAndLiabilitiesChart() {
  const { chart } = await MOCKS.getAssetsAndLiabilities();

  return <BarGraph data={chart} direction="horizontal" options={{ legend: true }} />;
}
