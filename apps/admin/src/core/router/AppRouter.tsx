import React from "react";
import { BrowserRouter, Route as ReactRoute, Routes } from "react-router-dom";
import { Dashboard, ForgotPassword, Login, Organizations, Users } from "../../view/pages";
import { AccessLevel } from "../auth";
import Route, { AccessType, type RouteProps } from "./Route";

export enum RoutePath {
  ROOT = "/",
  LOGIN = "/login",
  FORGOT_PASSWORD = "/forgot-password",
  DASHBOARD = "/dashboard",
  ORGANIZATIONS = "/manage-organizations",
  USERS = "/manage-users",
}

const routes: Array<RouteProps> = [
  {
    path: RoutePath.ROOT,
    access: AccessType.REDIRECT,
    redirect: RoutePath.DASHBOARD,
  },
  {
    path: RoutePath.LOGIN,
    access: AccessType.PUBLIC,
    component: Login,
  },
  {
    path: RoutePath.FORGOT_PASSWORD,
    access: AccessType.PUBLIC,
    component: ForgotPassword,
  },
  {
    path: RoutePath.DASHBOARD,
    access: AccessType.PRIVATE,
    redirect: RoutePath.LOGIN,
    component: Dashboard,
    accessLevel: AccessLevel.SUPER_ADMIN,
  },
  {
    path: RoutePath.ORGANIZATIONS,
    access: AccessType.PRIVATE,
    redirect: RoutePath.LOGIN,
    component: Organizations,
    accessLevel: AccessLevel.SUPER_ADMIN,
  },
  {
    path: RoutePath.USERS,
    access: AccessType.PRIVATE,
    redirect: RoutePath.LOGIN,
    component: Users,
    accessLevel: AccessLevel.SUPER_ADMIN,
  },
];

const AppRouter: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, access, component, ...props }: RouteProps) => {
          return (
            <ReactRoute
              key={path}
              path={path}
              element={<Route path={path} access={access} component={component} {...props} />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
