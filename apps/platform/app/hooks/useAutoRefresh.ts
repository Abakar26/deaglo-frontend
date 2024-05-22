"use client";

import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, VERIFIED_COOKIE } from "@/utilities";
import { isValid } from "@/utilities/jwt";
import { getCookie, setCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthInteractor } from "../interactors";

export const useAutoRefresh = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [redirectPath, setRedirectPath] = useState<string>();
  const pathName = usePathname();

  useEffect(() => {
    (async () => {
      if (!redirectPath) {
        const access = getCookie(ACCESS_TOKEN_COOKIE);
        const refresh = getCookie(REFRESH_TOKEN_COOKIE);
        const verified = getCookie(VERIFIED_COOKIE)?.toLowerCase() === "true";
        if (!access || !refresh) setRedirectPath("/sign-in");
        else if (!verified) setRedirectPath("/mfa");
        else if (!isValid(access)) {
          setRefreshing(true);
          const [reply] = await AuthInteractor.refresh(refresh);
          if (reply) {
            const { access, refresh } = reply;
            setCookie(ACCESS_TOKEN_COOKIE, access);
            setCookie(REFRESH_TOKEN_COOKIE, refresh);
          } else {
            setRedirectPath(undefined);
          }
          setRefreshing(false);
        }
      }
    })().catch((err) => console.error(err));
  }, [pathName, redirectPath]);

  return {
    redirectPath,
    refreshing,
  };
};
