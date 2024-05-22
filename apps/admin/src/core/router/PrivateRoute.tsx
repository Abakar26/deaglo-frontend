import React from "react";
import { Navigate } from "react-router-dom";
import { RoutePath } from "./AppRouter";
import { type RouteProps } from "./Route";
import { PrivateAppLayout } from "@/view/components";

interface PrivateRouteProps extends RouteProps {
  authorized: boolean;
  redirect?: string;
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  authorized,
  redirect,
  children,
}) => {
  return authorized ? (
    <PrivateAppLayout>{children}</PrivateAppLayout>
  ) : (
    <Navigate to={redirect ?? RoutePath.LOGIN} replace />
  );
};
