"use client";

import { useHelperBlockStore, useSidebarStore } from "@/app/store";
import React, { type PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { PageHeader } from "ui/components";
import { usePageHeader } from "../hooks";

export const AppPage: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { open: sidebarOpen } = useSidebarStore();
  const { visible: helperVisible } = useHelperBlockStore();
  const pageHeader = usePageHeader();

  return (
    <Page sidebarOpen={sidebarOpen} helperVisible={helperVisible}>
      <PageHeader {...pageHeader} />
      {children}
    </Page>
  );
};

const Page = styled.div<{ sidebarOpen: boolean; helperVisible: boolean }>`
  width: calc(
    100vw - ${(props) => (props.sidebarOpen ? "280px" : "88px")} -
      ${(props) => (props.helperVisible ? "282px" : "0px")}
  );
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 40px;
  ${(props) =>
    props.helperVisible &&
    css`
      padding-right: 20px;
    `};
  margin-left: ${(props) => (props.sidebarOpen ? "280px" : "88px")};
  margin-right: ${(props) => (props.helperVisible ? "282px" : "0px")};
  transition:
    0.3s ease margin,
    0.3s ease width,
    0.3s ease padding-right;
`;
