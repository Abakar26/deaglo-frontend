import React from "react";
import { type RouteProps } from "./Route";

export const PublicRoute: React.FunctionComponent<RouteProps> = ({ children }) => {
  return <>{children}</>;
};
