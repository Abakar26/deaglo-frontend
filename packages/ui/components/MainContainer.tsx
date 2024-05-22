"use client";
import React from "react";
import { styled } from "styled-components";

interface ContainerProps {
  children?: React.ReactNode;
  title: string;
}

const MainContainer: React.FunctionComponent<ContainerProps> = ({ children, title }) => {
  return (
    <StyledContainer>
      <StyledHeading>{title}</StyledHeading>
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 6rem;
`;

const StyledHeading = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.2rem;
`;

export default MainContainer;
