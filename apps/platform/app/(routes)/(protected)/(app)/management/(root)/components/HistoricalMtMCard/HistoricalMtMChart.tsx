import { ValueGraph } from "ui/components";

import MOCKS from "../_mocks";

export async function HistoricalMtMChart() {
  const data = await MOCKS.getHistoricalMtM();

  return <ValueGraph lines={data.lines} areas={data.areas} options={{ valueMin: 0 }} />;
}
