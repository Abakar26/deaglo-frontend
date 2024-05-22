"use client";

import React, { useMemo, type ReactElement } from "react";

export const useChildVerifier = (
  children: React.ReactNode | undefined,
  typeName: string | Array<string>,
  props?: Record<string, unknown>
) => {
  return useMemo(() => childVerifier(children, typeName, props), [children, typeName, props]);
};

export const childVerifier = (
  children: React.ReactNode | undefined,
  typeName: string | Array<string>,
  props?: Record<string, unknown>
) => {
  return React.Children.toArray(children)
    .map((child) => {
      if (React.isValidElement(child) && typeof child.type !== "string") {
        const childTypeName = child.type.name;
        if (typeof typeName === "string") {
          return childTypeName === typeName ? React.cloneElement(child, props) : null;
        } else {
          return typeName.includes(childTypeName) ? React.cloneElement(child, props) : null;
        }
      }
      return null;
    })
    .filter((child) => !!child) as ReactElement[];
};
