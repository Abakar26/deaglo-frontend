import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthToken } from "../../view/hooks";
import type { AccessLevel } from "../auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export enum AccessType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  REDIRECT = "REDIRECT",
}

export interface RouteProps {
  path: string;
  access?: AccessType;
  component?: React.FunctionComponent;
  accessLevel?: AccessLevel;
  redirect?: string;
  children?: React.ReactNode;
}

const Route: React.FunctionComponent<RouteProps> = ({
  access,
  accessLevel,
  component: Component = () => <></>,
  redirect,
  ...props
}) => {
  const { level, loading } = useAuthToken();
  if (loading) return;

  switch (access) {
    case AccessType.PUBLIC:
      return (
        <PublicRoute access={access} {...props}>
          {/* @ts-expect-error Bypassing type checking for dynamic component props */}
          <Component {...props} />
        </PublicRoute>
      );
    case AccessType.PRIVATE:
      return (
        <PrivateRoute
          access={access}
          redirect={redirect}
          {...props}
          authorized={level === accessLevel}
        >
          {/* @ts-expect-error Bypassing type checking for dynamic component props */}
          <Component {...props} />
        </PrivateRoute>
      );
    case AccessType.REDIRECT:
      return <Navigate to={redirect ?? "/"} replace />;
  }
};

export default React.memo(Route);
