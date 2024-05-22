"use client";

import React, { useEffect, useState } from "react";
import { EditMarginInputs } from "./EditMarginInputs";
import { SimulationInteractor } from "@/app/interactors";
import { useParams } from "next/navigation";
import { type StrategySimulation } from "@/app/interface";
import { EditMarginSimulationLoader } from ".";
import { ErrorDispatcher } from "@/app/components";

export const EditMarginSimulation: React.FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [strategySimulations, setStrateySimulations] = useState<Array<StrategySimulation>>([]);

  useEffect(() => {
    (async () => {
      const [simulations, error] = await SimulationInteractor.strategy.getAll(id);
      setLoading(false);
      setError(error);
      setStrateySimulations(simulations?.results ?? []);
    })();
  }, []);

  return loading ? (
    <EditMarginSimulationLoader />
  ) : (
    <>
      <EditMarginInputs
        strategies={(strategySimulations ?? []).sort((l, r) =>
          l.dateUpdated > r.dateUpdated ? -1 : 1
        )}
      />
      <ErrorDispatcher errors={[error]} />
    </>
  );
};

// const getStrategySimulations = async (): Promise<Array<StrategySimulation>> => {
//   return new Promise((res) => {
//     setTimeout(() => {
//       res([
//         // @ts-ignore
//         {
//           id: "1",
//           name: "Strategy Simulation 1",
//           start: new Date(),
//           end: new Date(),
//           status: SimulationStatus.READY,
//           type: SimulationType.STRATEGY,
//           strategies: [],
//           baseCurrency: "USD",
//           quoteCurrency: "BRL",
//           baseFlag: "USA",
//           quoteFlag: "BRL",
//         },
//       ]);
//     }, 500);
//   });
// };
