import { BarGraph } from "ui/components";
import MOCKS from "../_mocks";

export async function HedgesMtMChart() {
  const { chart } = await MOCKS.getMarkToMarket();

  return <BarGraph data={chart} options={{ label: "Value", legend: true }} />;
}
