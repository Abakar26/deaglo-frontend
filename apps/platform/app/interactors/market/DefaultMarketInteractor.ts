"use server";

import { type DefaultMarket } from "@/app/interface";
import { type APIResponse } from "..";
import { APIQuery, APIRoute } from "@/utilities";

export const get = async (): Promise<APIResponse<DefaultMarket>> => {
  const { reply, error } = await APIQuery<DefaultMarket>(APIRoute.DEFAULT_MARKET);
  return [reply, error];
};
