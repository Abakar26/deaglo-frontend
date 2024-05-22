import type { PartialStrategy, Strategy } from "@/app/interface";
import { APIMutate, APIQuery, APIRoute, HTTPMethod } from "@/utilities";
import type { APIResponse } from "..";

export const getAll = async (): Promise<APIResponse<Array<Strategy>>> => {
  const { reply, error } = await APIQuery<Array<Strategy>>(APIRoute.STRATEGY);
  return [reply, error];
};

export const get = async (strategyId: string): Promise<APIResponse<Strategy>> => {
  const { reply, error } = await APIQuery<Strategy>(APIRoute.STRATEGY, `/${strategyId}`);
  return [reply, error];
};

export const create = async (strategy: PartialStrategy): Promise<APIResponse<Strategy>> => {
  const { reply, error } = await APIMutate<PartialStrategy, Strategy>(
    APIRoute.STRATEGY,
    HTTPMethod.POST,
    strategy
  );
  return [reply, error];
};

export const update = async (
  strategyId: string,
  strategy: PartialStrategy
): Promise<APIResponse<Strategy>> => {
  const { reply, error } = await APIMutate<PartialStrategy, Strategy>(
    APIRoute.STRATEGY,
    HTTPMethod.PUT,
    strategy,
    `${strategyId}/`
  );
  return [reply, error];
};

export const del = async (strategyId: string): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(
    APIRoute.STRATEGY,
    HTTPMethod.DELETE,
    {},
    `${strategyId}/`
  );
  return [success, error];
};
