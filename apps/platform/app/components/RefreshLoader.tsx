"use client";

import React from "react";
import styled from "styled-components";
import { CircleLoader } from "ui/components";
import { Color } from "ui/styles";

export const RefreshLoader: React.FunctionComponent = () => {
  return (
    <Container>
      <CircleLoader size={124} />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background-color: ${Color.NEUTRAL_00};
  display: flex;
  align-items: center;
  justify-content: center;
`;
