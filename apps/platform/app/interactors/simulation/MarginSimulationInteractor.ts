"use server";

import { type MarginSimulation, type PartialMarginSimulation } from "@/app/interface";
import { APIMutate, APIQuery, APIRoute } from "@/utilities";
import { type APIResponse } from "..";
import { HTTPMethod } from "@/utilities/https";

export const getAll = async (analysisId: string): Promise<APIResponse<Array<MarginSimulation>>> => {
  const { reply, error } = await APIQuery<Array<MarginSimulation>>(
    APIRoute.ANALYSIS,
    `${analysisId}${APIRoute.MARGIN_SIM}`
  );
  return [reply, error];
};

export const create = async (
  analysisId: string,
  simulation: PartialMarginSimulation
): Promise<APIResponse<MarginSimulation>> => {
  const { reply, error } = await APIMutate<PartialMarginSimulation, MarginSimulation>(
    APIRoute.ANALYSIS,
    HTTPMethod.POST,
    simulation,
    `${analysisId}${APIRoute.MARGIN_SIM}`
  );
  return [reply, error];
};

export const get = async (
  analysisId: string,
  marginSimulationId: string
): Promise<APIResponse<MarginSimulation>> => {
  const { reply, error } = await APIQuery<MarginSimulation>(
    APIRoute.ANALYSIS,
    `${analysisId}${APIRoute.MARGIN_SIM}${marginSimulationId}`
  );
  return [reply, error];
};

export const del = async (
  analysisId: string,
  marginSimulationId: string
): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(
    APIRoute.ANALYSIS,
    HTTPMethod.DELETE,
    {},
    `${analysisId}${APIRoute.MARGIN_SIM}${marginSimulationId}/`
  );
  return [success, error];
};

export const update = async (
  analysisId: string,
  marginSimulationId: string,
  simulation: PartialMarginSimulation
): Promise<APIResponse<MarginSimulation>> => {
  const { reply, error } = await APIMutate<PartialMarginSimulation, MarginSimulation>(
    APIRoute.ANALYSIS,
    HTTPMethod.PUT,
    simulation,
    `${analysisId}${APIRoute.MARGIN_SIM}${marginSimulationId}/`
  );
  return [reply, error];
};
