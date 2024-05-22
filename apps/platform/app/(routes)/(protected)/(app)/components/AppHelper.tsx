"use client";

import { useHelperBlockStore } from "@/app/store";
import React from "react";
import { getHelperBlock } from "./helpers";
import styled from "styled-components";

export const AppHelper: React.FunctionComponent = () => {
  const { visible, type } = useHelperBlockStore();
  return <Container visible={visible}>{getHelperBlock(type)}</Container>;
};

const Container = styled.div<{ visible: boolean }>`
  position: fixed;
  right: ${(props) => (props.visible ? "0px" : "-300px")};
  top: 0;
  transition: 0.15s ease right;
`;
