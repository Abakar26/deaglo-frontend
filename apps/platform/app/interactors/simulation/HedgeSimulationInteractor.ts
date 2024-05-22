"use server";

import { type HedgeSimulation, type PartialHedgeSimulation } from "@/app/interface";
import { APIMutate, APIQuery, APIRoute } from "@/utilities";
import { type APIResponse } from "..";
import { HTTPMethod } from "@/utilities/https";

export const getAll = async (analysisId: string): Promise<APIResponse<Array<HedgeSimulation>>> => {
  const { reply, error } = await APIQuery<Array<HedgeSimulation>>(
    APIRoute.ANALYSIS,
    `${analysisId}${APIRoute.HEDGE_SIM}`
  );
  return [reply, error];
};

export const create = async (
  analysisId: string,
  simulation: PartialHedgeSimulation
): Promise<APIResponse<HedgeSimulation>> => {
  const { reply, error } = await APIMutate<PartialHedgeSimulation, HedgeSimulation>(
    APIRoute.ANALYSIS,
    HTTPMethod.POST,
    simulation,
    `${analysisId}${APIRoute.HEDGE_SIM}`
  );
  return [reply, error];
};

export const get = async (
  analysisId: string,
  hedgeSimulationId: string
): Promise<APIResponse<HedgeSimulation>> => {
  const { reply, error } = await APIQuery<HedgeSimulation>(
    APIRoute.ANALYSIS,
    `${analysisId}${APIRoute.HEDGE_SIM}${hedgeSimulationId}`
  );
  return [reply, error];
};

export const del = async (
  analysisId: string,
  hedgeSimulationId: string
): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(
    APIRoute.ANALYSIS,
    HTTPMethod.DELETE,
    {},
    `${analysisId}${APIRoute.HEDGE_SIM}${hedgeSimulationId}/`
  );
  return [success, error];
};

export const update = async (
  analysisId: string,
  hedgeSimulationId: string,
  simulation: PartialHedgeSimulation
): Promise<APIResponse<HedgeSimulation>> => {
  const { reply, error } = await APIMutate<PartialHedgeSimulation, HedgeSimulation>(
    APIRoute.ANALYSIS,
    HTTPMethod.PUT,
    simulation,
    `${analysisId}${APIRoute.HEDGE_SIM}${hedgeSimulationId}/`
  );
  return [reply, error];
};
