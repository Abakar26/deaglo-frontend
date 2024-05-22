"use client";

import { useEffect } from "react";
import { usePageNameStore } from "../store";

export const usePageName = (id: string, name: string) => {
  const { set } = usePageNameStore((state) => state);
  useEffect(() => {
    set(id, name);
  }, [set, name, id]);
};
