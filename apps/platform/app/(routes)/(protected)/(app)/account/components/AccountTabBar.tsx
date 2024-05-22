"use client";

import { usePathname, useRouter } from "next/navigation";
import styled from "styled-components";
import { TabBar } from "ui/components";

export function AccountTabBar() {
  const path = usePathname();
  const router = useRouter();

  return (
    <Row>
      <TabBar
        current={path}
        onChange={(key) => router.push(key)}
        tabs={[
          {
            key: "/account",
            label: "Personal information",
          },
          {
            key: "/account/preferences",
            label: "Preferences",
          },
          // {
          //   key: "/account/social",
          //   label: "Social",
          // },
          // {
          //   key: "/account/onboarding",
          //   label: "Onboarding",
          // },
        ]}
      />
    </Row>
  );
}

const Row = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 32px 0;
`;
