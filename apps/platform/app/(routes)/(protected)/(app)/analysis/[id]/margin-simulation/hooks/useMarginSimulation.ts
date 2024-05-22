"use client";

import { SimulationInteractor } from "@/app/interactors";
import { type PartialMarginSimulation } from "@/app/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMarginSimulationStore } from "../../[simulationId]/components/margin/store";

export const useMarginSimulation = () => {
  const { setEditMargin } = useMarginSimulationStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const create = async (analysisId: string, simulation: PartialMarginSimulation) => {
    setErrors({});
    setLoading(true);
    const [reply, error] = await SimulationInteractor.margin.create(analysisId, simulation);
    setLoading(false);
    error && setErrors({ ...errors, create: error });
    reply && router.push(`/analysis/${analysisId}/MARGIN_${reply.marginSimulationId}`);
  };

  const update = async (
    analysisId: string,
    simulationId: string,
    simulation: PartialMarginSimulation
  ) => {
    setErrors({});
    setLoading(true);
    const [reply, error] = await SimulationInteractor.margin.update(
      analysisId,
      simulationId,
      simulation
    );
    setLoading(false);
    error && setErrors({ ...errors, update: error });
    if (reply) {
      router.refresh();
      setEditMargin(undefined);
    }
  };

  return {
    create,
    update,
    loading,
    errors,
  };
};
