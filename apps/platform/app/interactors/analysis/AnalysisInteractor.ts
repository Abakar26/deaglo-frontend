/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use server";

import type { Analysis, PartialAnalysis } from "@/app/interface";
import { APIMutate, APIQuery, APIRoute } from "@/utilities";
import { HTTPMethod } from "@/utilities/https";
import type { SimulationType } from "ui/components";
import type { APIResponse, PaginatedData } from "..";

export const getAll = async (): Promise<APIResponse<Array<Analysis>>> => {
  const { reply, error } = await APIQuery<Array<Analysis>>(
    APIRoute.ANALYSIS,
    `?with_simulations=3`
  );
  return [reply, error];
};

export const create = async (
  analysis: PartialAnalysis | Analysis
): Promise<APIResponse<Analysis>> => {
  const { reply, error } = await APIMutate<PartialAnalysis, Analysis>(
    APIRoute.ANALYSIS,
    HTTPMethod.POST,
    analysis
  );
  return [reply, error];
};

export const get = async (analysisId: string): Promise<APIResponse<Analysis>> => {
  const { reply, error } = await APIQuery<Analysis>(
    APIRoute.ANALYSIS,
    `${analysisId}?with_simulations=6`
  );
  return [reply, error];
};

export const getPaginatedData = async (
  page = 1,
  searchParams: URLSearchParams
): Promise<APIResponse<PaginatedData<Analysis>>> => {
  const params = new URLSearchParams(searchParams);
  const { reply, error } = await APIQuery<PaginatedData<Analysis>>(
    APIRoute.ANALYSIS,
    `?page=${page}&${params.toString()}&with_simulations=3`
  );
  return [reply, error];
};

export const del = async (analysisId: string): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(
    APIRoute.ANALYSIS,
    HTTPMethod.DELETE,
    {},
    `${analysisId}`
  );
  return [success, error];
};

export const update = async (
  analysisId: string,
  analysis: PartialAnalysis
): Promise<APIResponse<Analysis>> => {
  const { reply, error } = await APIMutate<PartialAnalysis, Analysis>(
    APIRoute.ANALYSIS,
    HTTPMethod.PUT,
    analysis,
    `${analysisId}/`
  );
  return [reply, error];
};

export const pinSimulation = async (simulationId: string, simulationType: SimulationType) => {
  const { success, error } = await APIMutate(
    APIRoute.ANALYSIS,
    HTTPMethod.PATCH,
    {},
    `${simulationType}/${simulationId}/pin`
  );
  return [success, error];
};
