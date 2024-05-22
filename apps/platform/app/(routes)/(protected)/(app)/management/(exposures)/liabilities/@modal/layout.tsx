"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  // FIXME: Workaround for modal not closing
  const path = usePathname();
  if (path === "/management/liabilities") return null;

  return children;
}
