"use server";

import type {
  ForwardRateRequest,
  ForwardRateResponse,
  OptionPriceRequest,
  OptionPriceResponse,
  SpotRateRequest,
  SpotRateResponse,
} from "@/app/interface";
import { APIMutate, APIRoute, HTTPMethod } from "@/utilities";
import { type APIResponse } from "..";

export const getSpotRate = async (
  data: SpotRateRequest
): Promise<APIResponse<SpotRateResponse>> => {
  const { reply, error } = await APIMutate<SpotRateRequest, SpotRateResponse>(
    APIRoute.SPOT_RATE,
    HTTPMethod.POST,
    data
  );
  return [reply, error];
};

export const getForwardRate = async (
  data: ForwardRateRequest
): Promise<APIResponse<ForwardRateResponse>> => {
  const { reply, error } = await APIMutate<ForwardRateRequest, ForwardRateResponse>(
    APIRoute.FORWARD_RATE,
    HTTPMethod.POST,
    data
  );
  return [reply, error];
};

export const getOptionPrice = async (
  data: OptionPriceRequest,
  includeGreeks = false
): Promise<APIResponse<OptionPriceResponse>> => {
  const { reply, error } = await APIMutate<OptionPriceRequest, OptionPriceResponse>(
    APIRoute.OPTION_PRICING,
    HTTPMethod.POST,
    data,
    `?include_greeks=${includeGreeks}`
  );
  return [reply, error];
};
