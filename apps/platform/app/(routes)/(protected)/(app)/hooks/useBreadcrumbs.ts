"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode, useEffect } from "react";
import { type BreadCrumbProps } from "ui/components";
import { usePageNameStore } from "../store";

export const useBreadcrumbs = (): BreadCrumbProps => {
  const path = usePathname();
  const router = useRouter();
  const { get, map } = usePageNameStore();
  const [crumbs, setCrumbs] = useState<
    Array<{
      label: ReactNode;
      key: string;
    }>
  >([]);

  useEffect(() => setCrumbs(makeCrumbs(path.split("/"), get)), [path, get, map]);

  return {
    crumbs,
    onSelect: (key) => router.push(key),
  };
};

export const isUUID = (value: string): boolean => {
  return !!value.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
};

const makeCrumbs = (
  steps: Array<string>,
  getPageName: (id: string) => string | undefined
): Array<{ label: ReactNode; key: string }> => {
  const step = steps.pop();
  if (step) {
    // TODO: Parse "->" for currency conversions
    let title = decodeURIComponent(step).split("_").at(-1);
    if (title === "analysis") title = "analyses";
    const label = title && isUUID(title) ? getPageName(title) : title?.replace("-", " ");
    const key = steps.join("/") + `/${step}`;
    return [...makeCrumbs(steps, getPageName), { key, label }];
  } else {
    return [];
  }
};
