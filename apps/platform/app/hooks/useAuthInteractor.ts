"use client";

import type { ForgotPasswordRequest, SignInRequest, SignUpRequest } from "@/app/interface";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, VERIFIED_COOKIE } from "@/utilities";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthInteractor } from "../interactors";

export const useAuthInteractor = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string[] | string>>({});
  const router = useRouter();

  const signin = async (user: SignInRequest) => {
    setLoading(true);
    const [reply, error] = await AuthInteractor.signin(user);

    if (reply) {
      const { access, refresh, verified } = reply;
      setCookie(ACCESS_TOKEN_COOKIE, access);
      setCookie(REFRESH_TOKEN_COOKIE, refresh);
      setCookie(VERIFIED_COOKIE, verified);
      if (verified) {
        router.push("/dashboard");
      } else {
        await AuthInteractor.getOTP();
        router.push("/mfa");
      }
    }
    if (error) {
      setLoading(false);
      setErrors({ ...errors, signin: error });
    }
  };

  const signup = async (user: SignUpRequest) => {
    setLoading(true);
    const [reply, error, details] = await AuthInteractor.signup(user);
    if (reply) {
      const { access, refresh } = reply;
      setCookie(ACCESS_TOKEN_COOKIE, access);
      setCookie(REFRESH_TOKEN_COOKIE, refresh);
      router.push("/mfa");
    }
    if (error) {
      setErrors({ ...errors, signup: details?.password ? details?.password : error });
    }
    setLoading(false);
  };

  const verifyOTP = async (code: string) => {
    setLoading(true);
    const [success, error] = await AuthInteractor.verifyOTP(code);

    if (success) {
      setCookie(VERIFIED_COOKIE, true);
      router.push("/dashboard");
    }
    if (error) {
      setErrors({ ...errors, verify: error });
    }
    setLoading(false);
  };

  const signInWithLinkedIn = async (code: string) => {
    setLoading(true);
    const [reply, error] = await AuthInteractor.signInWithLinkedIn(code);
    if (reply) {
      const { access, refresh, verified } = reply;
      setCookie(ACCESS_TOKEN_COOKIE, access);
      setCookie(REFRESH_TOKEN_COOKIE, refresh);
      setCookie(VERIFIED_COOKIE, verified);

      if (verified) {
        return "/dashboard";
      } else {
        await AuthInteractor.getOTP();
        return "/mfa";
      }
    }
    if (error) {
      setErrors({ ...errors, signin: error });
    }
    setLoading(false);
  };

  const generateSignInURL = async (url_type: string) => {
    setLoading(true);
    const [reply, error] = await AuthInteractor.generateSignInURL(url_type);
    setLoading(false);
  };
  const forgotPassword = async (user: ForgotPasswordRequest) => {
    setLoading(true);
    const [reply, error] = await AuthInteractor.forgotPassword(user);
    setLoading(false);
    if (reply) {
      return true;
    }
    if (error) {
      setErrors({ ...errors, verify: error });
      return false;
    }
  };

  const linkOrDelinkLinkedIn = async (link: boolean, code: string, otp: string) => {
    setLoading(true);
    const [reply, error] = await AuthInteractor.linkOrDelinkLinkedIn(link, code, otp);

    if (reply) {
      window.close();
    }

    if (error) {
      setErrors({ ...errors, linkOrDelinkLinkedIn: error });
    }

    setLoading(false);
  };

  return {
    loading,
    errors,
    signin,
    signup,
    verifyOTP,
    signInWithLinkedIn,
    generateSignInURL,
    linkOrDelinkLinkedIn,
    forgotPassword,
  };
};
