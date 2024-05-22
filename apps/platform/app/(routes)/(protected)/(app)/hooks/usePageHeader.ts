"use client";

import { AuthInteractor } from "@/app/interactors";
import type { User } from "@/app/interface";
import { useHelperBlockStore } from "@/app/store";
import { getInitialsFromUser } from "@/utilities";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { IconName, MenuProps, PageHeaderProps, Selectable } from "ui/components";
import { usePageStore, type PageState } from "../store/PageStore";
import { useBreadcrumbs } from "./useBreadcrumbs";

// Page name overrides
export const pageNames: Record<string, string> = {
  "margin simulation": "Create Margin Simulation",
};

export const usePageHeader = (): PageHeaderProps & { setPageState: (state: PageState) => void } => {
  const router = useRouter();

  const { pages, set } = usePageStore();
  const { setVisible } = useHelperBlockStore();
  const { crumbs, onSelect } = useBreadcrumbs();
  const lastCrumb = (crumbs[crumbs.length - 1]?.label as string) ?? "";
  const page = pageNames[lastCrumb] ?? lastCrumb;

  const [user, setUser] = useState<User>();

  useEffect(() => {
    AuthInteractor.getUser()
      .then((res) => {
        setUser(res[0]);
      })
      .catch((e) => console.error(e));
  }, []);

  const { status, saved, menu } = pages[page] ?? {};

  const actions: Array<{ icon: IconName; onClick: () => void }> = [
    // {
    //   icon: "search",
    //   onClick: () => console.log("search"),
    // },
    // {
    //   icon: "activity",
    //   onClick: () => console.log("activity"),
    // },
    {
      icon: "question",
      onClick: () => setVisible(true),
    },
  ];

  const setPageState = (state?: PageState) => {
    set(page ?? "", state);
  };

  const profileMenu: MenuProps<Selectable> = {
    onSelect: (item) => {
      switch (item.key) {
        case "account":
          router.push("/account");
          break;

        case "sign-out":
          document.cookie = "ACCESS_TOKEN=; path=/;";
          router.push("/");
          break;

        default:
          break;
      }
    },
    options: [
      { key: "account", value: "Account" },
      { key: "sign-out", value: "Sign out" },
    ],
  };

  return {
    page,
    user: {
      profile: undefined, // TODO
      // TODO: display organization logo
      logo: user?.email.includes("@deaglo.com") ? "https://static.wixstatic.com/media/d70956_c78c23c85eda4e9bb8e50569bf852e5e~mv2.png/v1/crop/x_235,y_0,w_1196,h_346/fill/w_238,h_69,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/LOGOS%20DEAGLO%203_5%2023112022-01.png" : undefined,
      onClick: () => null, // TODO
      initials: user ? getInitialsFromUser(user) : "",
    },
    actions,
    breadcrumbs: {
      crumbs: crumbs.length > 1 ? crumbs : [],
      onSelect,
    },
    saved,
    status,
    menu,
    profileMenu,
    setPageState,
  };
};
