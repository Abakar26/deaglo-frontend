import { ActionsRequiredSection } from "./components/actions-required";
import { AnalysesDashboardSection } from "./components/analyses-dashboard";
import { AssetsAndLiabilitiesSection } from "./components/assets-and-liabilities";
import { DashboardFilters } from "./components/DashboardFilters";
import { MarkToMarketSection } from "./components/mark-to-market";
import { SimulationSection } from "./components/simulation";
import { TradesSection } from "./components/trades";
import { MainContainer } from "./components/shared";

export default function LiveHedgesDashboardPage() {
  return (
    <MainContainer>
      <ActionsRequiredSection />
      <DashboardFilters />
      <AnalysesDashboardSection />
      <AssetsAndLiabilitiesSection />
      <MarkToMarketSection />
      <TradesSection />
      <SimulationSection />
    </MainContainer>
  );
}
