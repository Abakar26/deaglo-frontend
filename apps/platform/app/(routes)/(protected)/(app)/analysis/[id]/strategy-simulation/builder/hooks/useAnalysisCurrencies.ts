"use client";

import { AnalysisInteractor } from "@/app/interactors";
import { type AnalysisCurrency } from "@/app/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface CurrencyPair {
  base: AnalysisCurrency;
  foreign: AnalysisCurrency;
}

export const useAnalysisCurrencies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [currencies, setCurrencies] = useState<CurrencyPair>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [analysis, _error] = await AnalysisInteractor.get(id);
      _error && setError(_error);
      if (analysis) {
        setCurrencies({
          base: analysis.baseCurrency,
          foreign: analysis.foreignCurrency,
        });
      }
      setLoading(false);
    })();
  }, []);

  return {
    loading,
    error,
    currencies,
  };
};
