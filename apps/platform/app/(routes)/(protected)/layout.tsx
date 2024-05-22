"use client";

import { RefreshLoader } from "@/app/components";
import { useAutoRefresh } from "@/app/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { refreshing, redirectPath } = useAutoRefresh();

  useEffect(() => {
    !refreshing && redirectPath && redirect(redirectPath);
  }, [redirectPath]);
  return refreshing ? <RefreshLoader /> : children;
}
