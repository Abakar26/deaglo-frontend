"use server";

import type {
  AuthResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  SignInRequest,
  SignUpRequest,
  User,
} from "@/app/interface";
import { APIMutate, APIQuery, APIRoute } from "@/utilities";
import { HTTPMethod } from "@/utilities/https";
import type { APIResponse } from "..";

export const signin = async (user: SignInRequest): Promise<APIResponse<AuthResponse>> => {
  const { reply, error } = await APIMutate<SignInRequest, AuthResponse>(
    APIRoute.SIGN_IN,
    HTTPMethod.POST,
    user
  );
  return [reply, error];
};

export const signup = async (user: SignUpRequest): Promise<APIResponse<AuthResponse>> => {
  const { reply, error } = await APIMutate<SignUpRequest, AuthResponse>(
    APIRoute.SIGN_UP,
    HTTPMethod.POST,
    user
  );
  return [reply, error];
};

export const getOTP = async (): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIQuery(APIRoute.GET_OTP);
  return [success, error];
};

export const verifyOTP = async (otpCode: string): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(APIRoute.VERIFY_OTP, HTTPMethod.POST, { otpCode });
  return [success, error];
};

export const refresh = async (refresh: string): Promise<APIResponse<AuthResponse>> => {
  const { reply, error } = await APIMutate<{ refresh: string }, AuthResponse>(
    APIRoute.REFRESH,
    HTTPMethod.POST,
    { refresh }
  );
  return [reply, error];
};

export const changeUserPassword = async (
  user: ChangePasswordRequest
): Promise<APIResponse<AuthResponse>> => {
  const { reply, error } = await APIMutate<ChangePasswordRequest, AuthResponse>(
    APIRoute.CHANGE_PASSWORD,
    HTTPMethod.PATCH,
    user
  );
  return [reply, error];
};

export const signInWithLinkedIn = async (code: string): Promise<APIResponse<AuthResponse>> => {
  const { reply, error } = await APIMutate<
    {
      code: string;
    },
    AuthResponse
  >(APIRoute.SIGN_IN_WITH_LINKEDIN, HTTPMethod.POST, {
    code: code,
  });
  return [reply, error];
};

export const generateSignInURL = async (url_type: string): Promise<APIResponse<string>> => {
  const { reply, error } = await APIQuery<string>(
    APIRoute.SIGN_IN_WITH_LINKEDIN,
    `?url_type=${url_type}`
  );
  return [reply, error];
};

export const linkOrDelinkLinkedIn = async (
  link: boolean,
  code?: string,
  otp?: string
): Promise<APIResponse<{ message: string }>> => {
  const requestData = {
    link,
    code,
    otp,
  };

  const { reply, error } = await APIMutate<typeof requestData, { message: string }>(
    APIRoute.LINK_WITH_LINKEDIN,
    HTTPMethod.PATCH,
    requestData
  );

  return [reply, error];
};

export const forgotPassword = async (
  user: ForgotPasswordRequest
): Promise<APIResponse<AuthResponse>> => {
  const { reply, error } = await APIMutate<ForgotPasswordRequest, AuthResponse>(
    APIRoute.FORGOT_PASSWORD,
    HTTPMethod.POST,
    user
  );
  return [reply, error];
};

export const getUser = async (): Promise<APIResponse<User>> => {
  const { reply, error } = await APIQuery<User>(APIRoute.USER);
  return [reply, error];
};

export const updateUser = async (user: Partial<User>): Promise<APIResponse<User>> => {
  const { reply, error } = await APIMutate<Partial<User>, User>(
    APIRoute.USER,
    HTTPMethod.PATCH,
    user
  );
  return [reply, error];
};

export const deleteUser = async (): Promise<APIResponse<boolean>> => {
  const { success, error } = await APIMutate(APIRoute.USER, HTTPMethod.DELETE, {});
  return [success, error];
};

export const getLinkedinLink = async (): Promise<APIResponse<string>> => {
  const { reply, error } = await APIQuery<string>(APIRoute.SIGN_IN_WITH_LINKEDIN);
  return [reply, error];
};
