"use client";

import { StrategyInteractor } from "@/app/interactors";
import { type PartialStrategy } from "@/app/interface";
import { useState } from "react";

export const useCustomStrategy = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const create = async (strategy: PartialStrategy) => {
    setLoading(true);
    setErrors({});
    const [_strategy, error] = await StrategyInteractor.create(strategy);
    error && setErrors({ ...errors, create: error });
    setLoading(false);
    return _strategy;
  };

  const update = async (id: string, strategy: PartialStrategy) => {
    setLoading(true);
    setErrors({});
    const [_strategy, error] = await StrategyInteractor.update(id, strategy);
    error && setErrors({ ...errors, update: error });
    setLoading(false);
    return _strategy;
  };

  return {
    loading,
    errors,
    create,
    update,
  };
};
