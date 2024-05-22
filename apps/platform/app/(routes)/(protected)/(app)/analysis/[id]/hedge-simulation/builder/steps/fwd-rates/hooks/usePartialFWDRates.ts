"use client";

import { useMemo } from "react";
import { useFWDRatesStore } from "../store";
import { type FWDRate } from "@/app/interface";

export const usePartialFWDRates = () => {
  const { rates, setRates } = useFWDRatesStore();

  const onChange = (scenario: number, day: number, value?: number) => {
    setRates({ ...rates, [`${scenario}:${day}`]: value });
  };

  const initialize = (rates: [FWDRate, FWDRate, FWDRate]) => {
    const scenarioOne: Array<[string, number]> =
      rates.at(0)?.map((point, day) => [`${0}:${day}`, point]) ?? [];
    const scenarioTwo: Array<[string, number]> =
      rates.at(1)?.map((point, day) => [`${1}:${day}`, point]) ?? [];
    const scenarioThree: Array<[string, number]> =
      rates.at(2)?.map((point, day) => [`${2}:${day}`, point]) ?? [];
    setRates(Object.fromEntries([...scenarioOne, ...scenarioTwo, ...scenarioThree]));
  };

  const _rates = useMemo(() => {
    return Array(3)
      .fill(null)
      .map((_, scenario) => {
        return Array(3)
          .fill(null)
          .map((_, day) => rates[`${scenario}:${day}`]);
      });
  }, [rates]);

  return {
    onChange,
    initialize,
    rates: _rates,
  };
};
