"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";
import { Color } from "ui";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return pathname === "/sign-up" ? (
    children
  ) : (
    <Splash>
      <Panel>
        <Container>{children}</Container>
      </Panel>
    </Splash>
  );
}

const Splash = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${Color.BRAND_400};
`;

const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  width: 45%;
  height: 100%;
  background: ${Color.NEUTRAL_00};

  & > * {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 24px 20%;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-self: center;
  gap: 40px;
`;
