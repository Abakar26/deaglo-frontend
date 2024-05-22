"use server";

import { AnalysisInteractor, SimulationInteractor } from "@/app/interactors";
import type { HedgeSimulation, MarginSimulation, StrategySimulation } from "@/app/interface";
import { AnalysisDetails, AnalysisError, AnalysisToolkit, AppViewSimulations } from "./components";

const AnalysisPage = async ({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: URLSearchParams;
}) => {
  const { id } = params;
  const [analysis, error] = await AnalysisInteractor.get(id);
  const [response] = await SimulationInteractor.strategy.getPaginatedData(1, id, searchParams, {
    tags: [`/analysis/${id}`],
  });

  function determineTutorialStep(
    simulations: Array<StrategySimulation | MarginSimulation | HedgeSimulation>
  ) {
    const simulationPriority = { HEDGE: 3, MARGIN: 2, STRATEGY: 1 };
    let tutorialStep = 0;

    for (const sim of simulations) {
      const step = simulationPriority[sim.type];
      if (step) {
        tutorialStep = Math.max(tutorialStep, step);
        if (tutorialStep === 3) break;
      }
    }

    return tutorialStep;
  }

  const tutorialStep = analysis?.simulations ? determineTutorialStep(analysis.simulations) : 0;

  return (
    <>
      {error ?? !id ? (
        <AnalysisError
          title="Analysis Not Found"
          subheading="It seems the analysis you're looking for isn't available. This might be due to an incorrect
          or outdated link."
        />
      ) : (
        <>
          <AnalysisDetails analysis={analysis} />
          <AnalysisToolkit tutorialStep={tutorialStep} />
          <AppViewSimulations
            // simulations={analysis?.simulations ?? []}
            simulations={response?.results ?? []}
            id={id}
            searchParams={searchParams}
            count={response?.count}
            order={new URLSearchParams(searchParams)?.get("order_by") ?? undefined}
          />
        </>
      )}
    </>
  );
};

export default AnalysisPage;
