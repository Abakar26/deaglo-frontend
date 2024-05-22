"use server";

import { type FXMovement, type PartialFXMovement } from "@/app/interface";
import { APIMutate, APIQuery, APIRoute, HTTPMethod } from "@/utilities";
import { type APIResponse } from "..";

export const getAll = async (): Promise<APIResponse<Array<FXMovement>>> => {
  const { reply, error } = await APIQuery<Array<FXMovement>>(APIRoute.FX_MOVEMENT);
  return [reply, error];
};

export const get = async (fxMovementId: string): Promise<APIResponse<FXMovement>> => {
  const { reply, error } = await APIQuery<FXMovement>(APIRoute.FX_MOVEMENT, fxMovementId);
  return [reply, error];
};

export const create = async (fxMovement: PartialFXMovement): Promise<APIResponse<FXMovement>> => {
  const { reply, error } = await APIMutate<PartialFXMovement, FXMovement>(
    APIRoute.FX_MOVEMENT,
    HTTPMethod.POST,
    fxMovement
  );
  return [reply, error];
};

export const update = async (
  fxMovementId: string,
  fxMovement: PartialFXMovement
): Promise<APIResponse<FXMovement>> => {
  const { reply, error } = await APIMutate<PartialFXMovement, FXMovement>(
    APIRoute.FX_MOVEMENT,
    HTTPMethod.PUT,
    fxMovement,
    fxMovementId
  );
  return [reply, error];
};

export const del = async (fxMovementId: string): Promise<APIResponse<boolean>> => {
  const { reply, error } = await APIMutate<{}, FXMovement>(
    APIRoute.FX_MOVEMENT,
    HTTPMethod.DELETE,
    {},
    fxMovementId
  );
  return [!!reply, error];
};
