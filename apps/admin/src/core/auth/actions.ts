import { jwtDecode } from "jwt-decode";
import type React from "react";
import {
  APIRoute,
  DEFAULT_ERROR_MESSAGE,
  REFRESH_KEY,
  REFRESH_TTL,
  TOKEN_KEY,
  mutateAPI,
  type Data,
  type Result,
} from "../../core";
import { AccessLevel, ActionType, type AuthAction } from "./reducer";

type AuthActionProps = {
  dispatch: React.Dispatch<AuthAction>;
  payload?: Data;
};

type AccessToken = {
  access: string;
  refresh: string;
};

type TokenPayload = {
  exp: number;
  iat: number;
  jti: string;
  token_type: "access" | "refresh";
  user_id: string;
  level: AccessLevel;
};

type ForgotPassword = {
  success: boolean;
  message?: string;
  error?: string;
};

export const authenticate = async (
  { dispatch, payload }: AuthActionProps,
  method: APIRoute = APIRoute.AUTH
): Promise<Result<Data>> => {
  const { success, reply } = await mutateAPI<AccessToken>(method, payload);

  if (success && reply?.access) {
    const { access, refresh } = reply;

    const { user_id, level }: TokenPayload = jwtDecode(access);

    localStorage.setItem(TOKEN_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);

    dispatch({
      type: ActionType.LOGIN_SUCCESS,
      payload: { token: access, user_id, level },
    });

    return {
      success: true,
    };
  }

  dispatch({ type: ActionType.LOGIN_ERROR, error: DEFAULT_ERROR_MESSAGE });

  return {
    success: false,
    error: "Authentication Failed",
  };
};

export const logout = ({ dispatch }: AuthActionProps): [boolean, AccessLevel] => {
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("CustomizeOptions");

  dispatch({ type: ActionType.LOGOUT });
  return [true, AccessLevel.UNAUTH];
};

export const verifyToken = async ({
  dispatch,
}: AuthActionProps): Promise<[boolean, AccessLevel]> => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    const { exp, user_id, level }: TokenPayload = jwtDecode(token);
    const secondsSinceEpoch = Date.now() / 1000;
    const hasTokenExpired = secondsSinceEpoch > exp;
    if (!hasTokenExpired) {
      dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: { token, user_id, level },
      });

      return [true, level];
    } else {
      return await verifyRefresh({ dispatch });
    }
  }
  dispatch({ type: ActionType.LOGOUT });
  return [false, AccessLevel.UNAUTH];
};

export const verifyRefresh = async ({
  dispatch,
}: AuthActionProps): Promise<[boolean, AccessLevel]> => {
  const refresh = localStorage.getItem(REFRESH_KEY);

  if (refresh) {
    const { iat, level }: TokenPayload = jwtDecode(refresh);
    const secondsSinceEpoch = Date.now() / 1000;
    const hasTokenExpired = secondsSinceEpoch - iat > REFRESH_TTL;

    if (!hasTokenExpired) {
      const { success } = await authenticate({ dispatch, payload: { refresh } }, APIRoute.REFRESH);

      return [success, level];
    }
  }
  dispatch({ type: ActionType.LOGOUT });
  return [false, AccessLevel.UNAUTH];
};

export const forgotPassword = async (
  { dispatch, payload }: AuthActionProps,
  method: APIRoute = APIRoute.FORGOT_PASSWORD
): Promise<Result<Data>> => {
  dispatch({ type: ActionType.LOGOUT });
  const { success } = await mutateAPI<ForgotPassword>(method, payload);

  if (success) {
    return {
      success: true,
    };
  }

  return {
    success: false,
    error: "Authentication Failed",
  };
};
