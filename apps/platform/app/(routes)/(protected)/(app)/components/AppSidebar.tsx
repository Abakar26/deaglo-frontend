"use client";

import { useSidebarStore } from "@/app/store";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Sidebar, SidebarItem, type IconName } from "ui/components";

interface AppRoute {
  label: string;
  path: string;
  icon: IconName;
}

const routes: Array<AppRoute> = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
  },
  {
    label: "Market",
    path: "/market",
    icon: "market",
  },
  {
    label: "Analysis",
    path: "/analysis",
    icon: "analysis",
  },
  // {
  //   label: "Payments",
  //   path: "/payment-portal",
  //   icon: "payments",
  // },
  {
    label: "Management",
    path: "/management",
    icon: "management",
  },
  {
    label: "Playground",
    path: "/playground",
    icon: "playground",
  },
  // {
  //   label: "Premium",
  //   path: "/premium",
  //   icon: "premium",
  // },
];

export const AppSidebar: React.FunctionComponent = () => {
  const { open, setOpen } = useSidebarStore();
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Sidebar
      open={open}
      setOpen={setOpen}
      altAction={{
        title: "Need guidance?",
        icon: "guidance",
        label: "See Our Tutorials",
        // onClick: () => router.push("/tutorial"),
        onClick: () =>
          window.open(
            "https://deaglohelp.zendesk.com/hc/en-us/categories/20685820139533-User-Guide",
            "_blank",
            "noopener noreferrer"
          ),
      }}
    >
      {routes.map(({ label, path, icon }, index) => {
        return (
          <SidebarItem
            open={open}
            key={index}
            label={label}
            icon={icon}
            active={pathName.includes(path)}
            onClick={() => router.push(path)}
          />
        );
      })}
    </Sidebar>
  );
};
