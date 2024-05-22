import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { type IconName, SidebarItem } from "ui/components";
import { Sidebar } from "ui/components";
// import { RoutePath } from "@/core/router/AppRouter";
import { useAuthToken } from "@/view/hooks";

interface AppRoute {
  label: string;
  path: string;
  icon: IconName;
}

const routes: Array<AppRoute> = [
  {
    label: "Dashboard",
    path: "/dashboard", //RoutePath.DASHBOARD,
    icon: "dashboard",
  },
  {
    label: "Organizations",
    path: "/manage-organizations", //RoutePath.ORGANIZATIONS,
    icon: "market",
  },
  {
    label: "Users",
    path: "/manage-users", //RoutePath.USERS,
    icon: "analysis",
  },
];

export const AppSidebar: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthToken();

  return (
    <Sidebar
      open={true}
      setOpen={() => undefined}
      showSideBarButton={false}
      altAction={{
        title: "",
        icon: "" as IconName,
        label: "Sign Out",
        onClick: () => logout(),
      }}
    >
      {routes.map(({ label, path, icon }, index) => {
        return (
          <SidebarItem
            open={true}
            key={index}
            label={label}
            icon={icon}
            active={location.pathname.includes(path)}
            onClick={() => navigate(path)}
          />
        );
      })}
    </Sidebar>
  );
};
