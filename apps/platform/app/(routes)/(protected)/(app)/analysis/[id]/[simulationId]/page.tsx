import { AnalysisInteractor, SimulationInteractor, type APIResponse } from "@/app/interactors";
import {
  type HedgeSimulation,
  type HedgeSimulationResults,
  type MarginSimulation,
  type MarginSimulationResults,
  type StrategySimulation,
  type StrategySimulationResults,
} from "@/app/interface";
import { type SimulationType } from "ui/components";
import { reloadAnalysisSimulations } from "../(root)/actions";
import { AnalysisError } from "../(root)/components";
import { SimulationPage } from "./components";

interface SimulationPageProps {
  params: {
    id: string;
    simulationId: string;
  };
}

export default async function SimulationRoot({
  params: { simulationId, id },
}: SimulationPageProps) {
  const [type, _simulationId] = getSimulationId(simulationId);
  const [simulation, error] = await getSimulation(type, _simulationId, id);
  const [analysis, _error] = await AnalysisInteractor.get(id);

  void reloadAnalysisSimulations(id);

  return simulation && analysis ? (
    <SimulationPage simulation={simulation} analysis={analysis} />
  ) : !analysis ? (
    <AnalysisError
      title="Analysis Not Found"
      subheading="It seems the analysis you're looking for isn't available. This might be due to an incorrect
      or outdated link."
    />
  ) : (
    <AnalysisError
      title="Simulation Not Found"
      subheading="It seems the simulation you're looking for isn't available. This might be due to an incorrect
      or outdated link."
    />
  );
}

const getSimulationId = (id: string): [SimulationType, string] => {
  const [_type, simulationId] = id.split("_");
  return [_type as SimulationType, simulationId ?? ""];
};

const getSimulation = async (
  type: SimulationType,
  simulationId: string,
  analysisId: string
): Promise<
  APIResponse<StrategySimulation> | APIResponse<MarginSimulation> | APIResponse<HedgeSimulation>
> => {
  switch (type.toString()) {
    case "STRATEGY":
      return await getStrategySimulation(simulationId ?? "", analysisId);
    case "MARGIN":
      return await getMarginSimulation(simulationId ?? "", analysisId);
    case "HEDGE":
      return await getHedgeSimulation(simulationId ?? "", analysisId);
    default:
      return [undefined, "Invalid simulation id"];
  }
};

const getMarginSimulation = async (
  simulationId: string,
  analysisId: string
): Promise<APIResponse<MarginSimulation>> => {
  const [simulation, error] = await SimulationInteractor.margin.get(analysisId, simulationId);
  const [results, resultsError] =
    await SimulationInteractor.results.getResults<MarginSimulationResults>(
      simulationId,
      simulation?.resultId ?? ""
    );
  if (simulation && results) {
    return [{ ...simulation, results }, error ?? resultsError];
  }
  return [simulation, error ?? resultsError];
};

const getStrategySimulation = async (
  simulationId: string,
  analysisId: string
): Promise<APIResponse<StrategySimulation>> => {
  const [simulation, error] = await SimulationInteractor.strategy.get(analysisId, simulationId);
  const [results, resultsError] =
    await SimulationInteractor.results.getResults<StrategySimulationResults>(
      simulationId,
      simulation?.resultId ?? ""
    );
  if (simulation && results) {
    return [{ ...simulation, results }, error ?? resultsError];
  }
  return [simulation, error ?? resultsError];
};

const getHedgeSimulation = async (
  simulationId: string,
  analysisId: string
): Promise<APIResponse<HedgeSimulation>> => {
  const [simulation, error] = await SimulationInteractor.hedge.get(analysisId, simulationId);
  const [harvest, harvestError] = await SimulationInteractor.results.getHedgeHarvestData(
    simulationId,
    simulation?.resultId ?? ""
  );

  const [results, resultsError] =
    await SimulationInteractor.results.getResults<HedgeSimulationResults>(
      simulationId,
      simulation?.resultId ?? ""
    );

  if (simulation && results && harvest) {
    return [{ ...simulation, results, harvest }, error ?? resultsError];
  }
  return [simulation, error ?? resultsError];
};
