import { AnalysesDashboardSegments } from "./AnalysesDashboardSegments";

import MOCKS from "../_mocks";

export async function AnalysesDashboardWrapper() {
  const { hedged, hedgingEfficiency, marginChanges, rateOfReturn, unhedged } =
    await MOCKS.getAnalysesDashboard();

  return (
    <AnalysesDashboardSegments
      hedged={hedged}
      hedgingEfficiency={hedgingEfficiency}
      marginChanges={marginChanges}
      rateOfReturn={rateOfReturn}
      unhedged={unhedged}
    />
  );
}
