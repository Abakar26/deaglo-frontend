"use server";

import {
  HistoricalSpot,
  HistoricalSpotRequest,
  HistoricalSpotResponse,
  type PartialSpotHistory,
  type SpotHistory,
} from "@/app/interface";
import { type APIResponse } from "..";
import { APIMutate, APIQuery, APIRoute, HTTPMethod } from "@/utilities";

export const getHistorical = async (
  data: HistoricalSpotRequest
): Promise<APIResponse<HistoricalSpotResponse>> => {
  const { reply, error } = await APIMutate<HistoricalSpotRequest, HistoricalSpotResponse>(
    APIRoute.SPOT_DATA,
    HTTPMethod.POST,
    data
  );
  return [reply, error];
};

export const getAll = async (): Promise<APIResponse<Array<SpotHistory>>> => {
  const { reply, error } = await APIQuery<Array<SpotHistory>>(APIRoute.SPOT_HISTORY);
  return [reply, error];
};

export const get = async (spotHistoryId: string): Promise<APIResponse<SpotHistory>> => {
  const { reply, error } = await APIQuery<SpotHistory>(APIRoute.SPOT_HISTORY, spotHistoryId);
  return [reply, error];
};

export const create = async (
  spotHistory: PartialSpotHistory
): Promise<APIResponse<SpotHistory>> => {
  const { reply, error } = await APIMutate<PartialSpotHistory, SpotHistory>(
    APIRoute.SPOT_HISTORY,
    HTTPMethod.POST,
    spotHistory
  );
  return [reply, error];
};

export const update = async (
  spotHistoryId: string,
  spotHistory: PartialSpotHistory
): Promise<APIResponse<SpotHistory>> => {
  const { reply, error } = await APIMutate<PartialSpotHistory, SpotHistory>(
    APIRoute.SPOT_HISTORY,
    HTTPMethod.PUT,
    spotHistory,
    spotHistoryId
  );
  return [reply, error];
};

export const del = async (spotHistoryId: string): Promise<APIResponse<boolean>> => {
  const { reply, error } = await APIMutate<{}, SpotHistory>(
    APIRoute.SPOT_HISTORY,
    HTTPMethod.DELETE,
    {},
    spotHistoryId
  );
  return [!!reply, error];
};
