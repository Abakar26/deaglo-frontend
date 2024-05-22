/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use server";

import type { Workspace } from "@/app/interface";
import { APIMutate, APIQuery, APIRoute } from "@/utilities";
import { HTTPMethod } from "@/utilities/https";
import type { APIResponse, PaginatedData } from "..";

export const getAll = async (): Promise<APIResponse<Array<Workspace>>> => {
  const { reply, error } = await APIQuery<Array<Workspace>>(APIRoute.WORKSPACE);
  return [reply, error];
};

export const getPaginatedData = async (
  page = 1,
  searchParams: URLSearchParams
): Promise<APIResponse<PaginatedData<Workspace>>> => {
  const params = new URLSearchParams(searchParams);
  const { reply, error } = await APIQuery<PaginatedData<Workspace>>(
    APIRoute.WORKSPACE,
    `?page=${page}&${params.toString()}&with_simulations=3`
  );
  return [reply, error];
};

export const create = async (workspace: Workspace): Promise<APIResponse<Workspace>> => {
  const { reply, error } = await APIMutate<Workspace, Workspace>(
    APIRoute.WORKSPACE,
    HTTPMethod.POST,
    workspace
  );
  return [reply, error];
};

export const get = async (workspaceId: string): Promise<APIResponse<Workspace>> => {
  const { reply, error } = await APIQuery<Workspace>(APIRoute.WORKSPACE, `${workspaceId}`);
  return [reply, error];
};

export const del = async (workspaceId: string): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(
    APIRoute.WORKSPACE,
    HTTPMethod.DELETE,
    {},
    `${workspaceId}/`
  );
  return [success, error];
};

export const update = async (
  workspaceId: string,
  workspace: Workspace
): Promise<APIResponse<Workspace>> => {
  const { reply, error } = await APIMutate<Workspace, Workspace>(
    APIRoute.WORKSPACE,
    HTTPMethod.PUT,
    workspace,
    `${workspaceId}/`
  );
  return [reply, error];
};

export const addWorkspaceAnalysis = async (
  workspaceId: string,
  analysisId: string
): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(
    APIRoute.WORKSPACE,
    HTTPMethod.PATCH,
    {},
    `${workspaceId}/${analysisId}/add/`
  );
  return [success, error];
};

export const removeWorkspaceAnalysis = async (
  workspaceId: string,
  analysisId: string
): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(
    APIRoute.WORKSPACE,
    HTTPMethod.PATCH,
    {},
    `${workspaceId}/${analysisId}/remove/`
  );
  return [success, error];
};
