"use server";

import type { PartialStrategySimulation, StrategySimulation } from "@/app/interface";
import { APIMutate, APIQuery, APIRoute } from "@/utilities";
import { HTTPMethod } from "@/utilities/https";
import type { APIResponse, PaginatedData } from "..";

export const getAll = async (
  analysisId: string
): Promise<APIResponse<{ results: Array<StrategySimulation> }>> => {
  const { reply, error } = await APIQuery<{ results: Array<StrategySimulation> }>(
    APIRoute.ANALYSIS,
    `${analysisId}${APIRoute.STRATEGY_SIM}`
  );
  return [reply, error];
};

export const getPaginatedData = async (
  current = 1,
  id: string,
  searchParams: URLSearchParams,
  nextConfig: NextFetchRequestConfig = {}
): Promise<APIResponse<PaginatedData<StrategySimulation>>> => {
  const params = new URLSearchParams(searchParams);
  const { reply, error } = await APIQuery<PaginatedData<StrategySimulation>>(
    APIRoute.ANALYSIS,
    `${id}/simulations?page=${current}&${params.toString()}`,
    undefined,
    nextConfig
  );
  return [reply, error];
};

export const create = async (
  analysisId: string,
  simulation: PartialStrategySimulation
): Promise<APIResponse<StrategySimulation>> => {
  const { reply, error } = await APIMutate<PartialStrategySimulation, StrategySimulation>(
    APIRoute.ANALYSIS,
    HTTPMethod.POST,
    simulation,
    `${analysisId}${APIRoute.STRATEGY_SIM}`
  );
  return [reply, error];
};

export const get = async (
  analysisId: string,
  strategySimulationId: string
): Promise<APIResponse<StrategySimulation>> => {
  const { reply, error } = await APIQuery<StrategySimulation>(
    APIRoute.ANALYSIS,
    `${analysisId}${APIRoute.STRATEGY_SIM}${strategySimulationId}/`
  );
  return [reply, error];
};

export const del = async (
  analysisId: string,
  strategySimulationId: string
): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(
    APIRoute.ANALYSIS,
    HTTPMethod.DELETE,
    {},
    `${analysisId}${APIRoute.STRATEGY_SIM}${strategySimulationId}/`
  );
  return [success, error];
};

export const update = async (
  analysisId: string,
  strategySimulationId: string,
  simulation: PartialStrategySimulation
): Promise<APIResponse<StrategySimulation>> => {
  const { reply, error } = await APIMutate<PartialStrategySimulation, StrategySimulation>(
    APIRoute.ANALYSIS,
    HTTPMethod.PUT,
    simulation,
    `${analysisId}${APIRoute.STRATEGY_SIM}${strategySimulationId}/`
  );
  return [reply, error];
};
