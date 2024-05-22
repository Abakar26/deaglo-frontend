"use server";

import { type FWDEffeciency, type PartialFWDEfficiency } from "@/app/interface";
import { type APIResponse } from "..";
import { APIMutate, APIQuery, APIRoute, HTTPMethod } from "@/utilities";

export const getAll = async (): Promise<APIResponse<Array<FWDEffeciency>>> => {
  const { reply, error } = await APIQuery<Array<FWDEffeciency>>(APIRoute.FWD_EFFICIENCY);
  return [reply, error];
};

export const get = async (fwdEfficiencyId: string): Promise<APIResponse<FWDEffeciency>> => {
  const { reply, error } = await APIQuery<FWDEffeciency>(APIRoute.FWD_EFFICIENCY, fwdEfficiencyId);
  return [reply, error];
};

export const create = async (
  fwdEfficiency: PartialFWDEfficiency
): Promise<APIResponse<FWDEffeciency>> => {
  const { reply, error } = await APIMutate<PartialFWDEfficiency, FWDEffeciency>(
    APIRoute.FWD_EFFICIENCY,
    HTTPMethod.POST,
    fwdEfficiency
  );
  return [reply, error];
};

export const update = async (
  fwdEfficiencyId: string,
  fwdEfficiency: PartialFWDEfficiency
): Promise<APIResponse<FWDEffeciency>> => {
  const { reply, error } = await APIMutate<PartialFWDEfficiency, FWDEffeciency>(
    APIRoute.FWD_EFFICIENCY,
    HTTPMethod.PUT,
    fwdEfficiency,
    fwdEfficiencyId
  );
  return [reply, error];
};

export const del = async (fwdEfficiencyId: string): Promise<APIResponse<boolean>> => {
  const { reply, error } = await APIMutate<{}, FWDEffeciency>(
    APIRoute.FWD_EFFICIENCY,
    HTTPMethod.DELETE,
    {},
    fwdEfficiencyId
  );
  return [!!reply, error];
};
