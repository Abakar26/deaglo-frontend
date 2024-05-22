import { AnalysisInteractor, MarketInteractor } from "@/app/interactors";
import { AnalysisList, CreateAnalysis } from "../analysis/(root)/components";
import { FWDEfficiency, SpotHistory } from "../market/components";

const DashboardPage = async () => {
  const [defaultMarket] = await MarketInteractor.defaultMarket.get();
  const [fwdRate] = await MarketInteractor.pricing.getForwardRate({
    baseCurrency: defaultMarket?.fwdEfficiency.baseCurrency.code ?? "",
    foreignCurrency: defaultMarket?.fwdEfficiency.foreignCurrency.code ?? "",
    endDate: new Date().toISOString(),
    isBaseSold: false,
  });

  const [response] = await AnalysisInteractor.getPaginatedData(1, {} as URLSearchParams);
  const analyses = response?.results;

  return (
    <>
      {analyses?.length ? (
        <AnalysisList
          showLoadMoreBtn={false}
          analyses={analyses.slice(0, 6)}
          count={6}
          searchParams={{} as URLSearchParams}
        />
      ) : (
        <CreateAnalysis />
      )}
      <div style={{ display: "flex", gap: 24, width: "100%", marginTop: 24 }}>
        <SpotHistory spotHistory={defaultMarket?.spotHistory} />
        <FWDEfficiency
          fwdEfficiency={defaultMarket?.fwdEfficiency}
          fwdRate={fwdRate?.forwardRate}
        />
      </div>
    </>
  );
};

export default DashboardPage;
