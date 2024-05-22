import React from "react";
import styled, { css } from "styled-components";
import { AppSidebar } from "./AppSideBar";
import { PageHeader } from "./PageHeader";
import { usePageHeader } from "@/view/hooks";
import ModalHandler from "@/view/components/modals/ModalHandler";

interface PrivateAppLayoutProps {
  children: React.ReactNode;
}

export const PrivateAppLayout: React.FunctionComponent<PrivateAppLayoutProps> = ({ children }) => {
  const pageHeader = usePageHeader();

  return (
    <Container>
      <ModalHandler>
        <AppSidebar />
        <Page sidebarOpen={true} helperVisible={false}>
          <PageHeader {...pageHeader} />
          {children}
        </Page>
      </ModalHandler>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: #f3f3f4;
`;

const Page = styled.div<{ sidebarOpen: boolean; helperVisible: boolean }>`
  width: calc(100vw - 280px);
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
