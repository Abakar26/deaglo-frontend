import React, { type PropsWithChildren } from "react";
import styled from "styled-components";
import Deaglo from "../../public/svgs/Logo-full.svg";
import G from "../../public/svgs/Logo-partial.svg";
import { Color } from "../../styles";
import { SidebarAction, type SidebarActionProps } from "./SidebarAction";
import { SiderbarButton } from "./SidebarButton";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  altAction?: SidebarActionProps;
  showSideBarButton?: boolean;
}

export const Sidebar: React.FunctionComponent<Props & PropsWithChildren> = ({
  open,
  setOpen,
  altAction,
  showSideBarButton = true,
  children,
}) => {
  return (
    <Container open={open}>
      {showSideBarButton && <SiderbarButton open={open} setOpen={setOpen} />}
      <Content>
        <Logo open={open}>{open ? <Deaglo /> : <G />}</Logo>
        {children}
      </Content>
      {altAction && <SidebarAction {...altAction} open={open} />}
    </Container>
  );
};

const Container = styled.div<{ open: boolean }>`
  height: 100vh;
  width: ${(props) => (props.open ? "280px" : "88px")};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100000;
  transition: 0.15s ease width;
  background-color: ${Color.NEUTRAL_00};
  padding: 40px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
`;

const Logo = styled.div<{ open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 ${(props) => (props.open ? "10px" : "26px")};
  padding-bottom: 44px;
`;
