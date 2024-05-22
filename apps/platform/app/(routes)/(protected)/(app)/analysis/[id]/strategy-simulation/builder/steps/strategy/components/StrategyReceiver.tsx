"use client";

import { ErrorDispatcher } from "@/app/components";
import { AnalysisInteractor, StrategyInteractor } from "@/app/interactors";
import { type Analysis, type Strategy } from "@/app/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useStrategyBuilderStore } from "../../../store";
import { StrategyList } from "./StrategyList";
import { StrategyLoader } from "./StrategyLoader";

export const StrategyReceiver = () => {
  const [analysis, setAnalysis] = useState<Analysis>();
  const [composite, setComposite] = useState<Array<Strategy>>([]);
  const [vanilla, setVanilla] = useState<Array<Strategy>>([]);
  const [custom, setCustom] = useState<Array<Strategy>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Array<string | undefined>>([]);
  const { id } = useParams<{ id: string }>();
  const { notional } = useStrategyBuilderStore();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const [strategies, strategyError] = await StrategyInteractor.getAll();
      const [analysis, analysisError] = await AnalysisInteractor.get(id);
      setComposite(
        strategies
          ?.filter((strategy) => !strategy.isCustom && strategy.legs.length > 1)
          .map((strategy) => ({
            ...strategy,
            legs: strategy.legs.map((leg) => ({
              ...leg,
              isCall: notional ? (notional.isBaseSold ? leg.isCall : !leg.isCall) : leg.isCall,
            })),
          })) ?? []
      );
      setVanilla(
        strategies?.filter((strategy) => !strategy.isCustom && strategy.legs.length === 1) ?? []
      );
      setCustom(strategies?.filter((strategy) => strategy.isCustom) ?? []);
      setErrors([strategyError, analysisError]);
      setAnalysis(analysis);
      setLoading(false);
    })().catch((err) => console.error(err));
  }, [id, notional?.isBaseSold]);

  return loading || !analysis ? (
    <StrategyLoader />
  ) : (
    <>
      <StrategyList vanilla={vanilla} composite={composite} custom={custom} analysis={analysis} />
      <ErrorDispatcher errors={errors} />
    </>
  );
};
