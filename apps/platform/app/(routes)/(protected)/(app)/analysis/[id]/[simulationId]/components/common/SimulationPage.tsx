"use client";

import { usePageName } from "@/app/(routes)/(protected)/(app)/hooks";
import { type Analysis, type SimulationInstance } from "@/app/interface";
import { SimulationType } from "ui/components";
import { ResultsHeader } from ".";
import { HedgePage, StrategyPage } from "..";
import { useEditMode } from "../../hooks/useEditMode";
import { MarginPage } from "../margin/MarginPage";
import { useMarginSimulationStore } from "../margin/store";
import { useStrategySimulationStore } from "../strategy/store";
import { ProgressDisplay } from "./ProgressDisplay";

interface Props {
  simulation: SimulationInstance;
  analysis: Analysis;
}

export const SimulationPage: React.FunctionComponent<Props> = ({ simulation, analysis }) => {
  const { editMode } = useEditMode();
  // const menu = useSimulationMenu(simulation);

  const { setEditMargin } = useMarginSimulationStore();
  const { setEditStrategy } = useStrategySimulationStore();

  usePageName(simulation.id, simulation.name);

  const onEdit = () => {
    switch (simulation.type) {
      case SimulationType.MARGIN:
        return setEditMargin(simulation);
      case SimulationType.STRATEGY:
        return setEditStrategy(simulation);
      default:
        return;
    }
  };

  const inProgress = simulation.results === undefined;

  return (
    <>
      {!editMode && (
        <ResultsHeader
          harvestData={simulation?.harvest}
          simulationType={simulation.type}
          timeline={{
            start: new Date(simulation.startDate),
            end: new Date(simulation.endDate),
          }}
          currency={{
            baseCurrency: analysis.baseCurrency.code,
            baseFlag: analysis.baseCurrency.countryName,
            foreignCurrency: analysis.foreignCurrency.code,
            foreignFlag: analysis.foreignCurrency.countryName,
          }}
          onExecute={inProgress ? undefined : () => null}
          actions={
            inProgress
              ? undefined
              : {
                  onEdit,
                  onDownload: () => null,
                  // TODO
                  // more: menu,
                }
          }
        />
      )}

      {inProgress ? (
        <ProgressDisplay simulation={simulation} />
      ) : (
        getSimulationPage(simulation, analysis)
      )}
    </>
  );
};

const getSimulationPage = (simulation: SimulationInstance, analysis: Analysis): React.ReactNode => {
  switch (simulation.type) {
    case SimulationType.MARGIN:
      return <MarginPage marginSimulation={simulation} />;
    case SimulationType.STRATEGY:
      return <StrategyPage strategySimulation={simulation} analysis={analysis} />;
    case SimulationType.HEDGE:
      return <HedgePage hedgeSimulation={simulation} />;
  }
};
