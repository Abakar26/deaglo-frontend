"use client";

import styled from "styled-components";
import { TabBar } from "ui/components";
import { useQueryParams } from "@/app/hooks";

export function PlaygroundTabBar() {
  const { params, update } = useQueryParams();

  const current = params.get("guide") ?? "derivative";

  return (
    <Row>
      <TabBar
        current={current}
        onChange={(value) => update("guide", value)}
        tabs={[
          {
            key: "derivative",
            label: "Derivative guide",
          },
          {
            key: "analisys",
            label: "Analysis guide",
          },
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
