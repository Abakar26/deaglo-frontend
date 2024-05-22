"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import styled from "styled-components";
import { Button, ButtonSize, TabBar } from "ui/components";

export function ManagementTabBar() {
  const router = useRouter();
  const segment = useSelectedLayoutSegments().pop();

  const currentTab = segment === "(root)" ? "/management" : `/management/${segment}`;

  const buttonProps = (() => {
    switch (currentTab) {
      case "/management/trades":
        return { label: "Add Trade", onClick: () => router.push("/management/trades/new") };
      case "/management/assets":
        // TODO: Add route when implemented
        return { label: "Add Asset", onClick: () => router.push("/management/assets/new") };
      case "/management/liabilities":
        return {
          label: "Add Liability",
          onClick: () => router.push("/management/liabilities/new"),
        };
      case "/management/reports":
        // TODO: Add route when implemented
        return { label: "Download as CSV", onClick: () => alert("TODO") };
      default:
        return undefined;
    }
  })();

  return (
    <Row>
      <TabBar
        current={currentTab}
        onChange={(key) => router.push(key)}
        tabs={[
          {
            key: "/management",
            label: "Summary",
          },
          {
            key: "/management/trades",
            label: "Trades",
            amount: 0, // TODO: Add amount when integrating API
          },
          {
            key: "/management/assets",
            label: "Assets",
            amount: 0, // TODO: Add amount when integrating API
          },
          {
            key: "/management/liabilities",
            label: "Liabilities",
            amount: 0, // TODO: Add amount when integrating API
          },
          {
            key: "/management/reports",
            label: "Reports",
          },
        ]}
      />

      {buttonProps !== undefined ? (
        <Button
          label={buttonProps.label}
          onClick={buttonProps.onClick}
          resizeMode="fit"
          size={ButtonSize.LARGE}
        />
      ) : null}
    </Row>
  );
}

const Row = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 32px 0;
`;
