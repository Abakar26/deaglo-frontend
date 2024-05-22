import { AccessLevel, useAuthorizationDispatch } from "@/core/auth";
import {
  authenticate,
  forgotPassword as forgotPasswordAction,
  logout as logoutAction,
  verifyToken,
} from "@/core/auth/actions";
import { type ForgotPassword, type SignInRequest } from "@/core/interface";
import { RoutePath } from "@/core/router/AppRouter";
import { TOKEN_KEY } from "@/core/utilities";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscriber } from "./useSubscriber";

export const useAuthToken = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [level, setLevel] = useState<AccessLevel>(AccessLevel.UNAUTH);
  const [errors, setErrors] = useState<Record<string, string[] | string>>({});
  const dispatch = useAuthorizationDispatch();
  const navigate = useNavigate();

  useSubscriber(
    TOKEN_KEY,
    ({ detail }: CustomEventInit<{ authorizationStatus: boolean; level: AccessLevel }>) => {
      if (detail) {
        setAuthorized(detail.authorizationStatus);
        setLevel(detail.level);
      }
    }
  );

  useEffect(() => {
    let isMounted = true;
    void (async () => {
      try {
        const [_authorized, _level] = await verifyToken({ dispatch });
        if (isMounted) {
          setLoading(false);
          setAuthorized(_authorized);
          setLevel(_level);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(true);
          setAuthorized(false);
          setLevel(AccessLevel.UNAUTH);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, []);

  const signin = async (user: SignInRequest) => {
    setLoading(true);
    const { success, error } = await authenticate({ dispatch, payload: { ...user } });
    if (success) {
      setTimeout(() => navigate(RoutePath.DASHBOARD));
    }
    if (error) {
      setErrors({ ...errors, signin: error });
    }
  };

  const forgotPassword = async (user: ForgotPassword) => {
    setLoading(true);
    const { success, error } = await forgotPasswordAction({ dispatch, payload: { ...user } });
    setLoading(false);
    if (success) {
      return true;
    }
    if (error) {
      setErrors({ ...errors, verify: error });
      return false;
    }
  };

  const logout = () => {
    setLoading(true);
    const [success] = logoutAction({ dispatch, payload: {} });
    setLoading(false);
    return success ? true : false;
  };

  return { loading, setLoading, authorized, errors, level, signin, forgotPassword, logout };
};
