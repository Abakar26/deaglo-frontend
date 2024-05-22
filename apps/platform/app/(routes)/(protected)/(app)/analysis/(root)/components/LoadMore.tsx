"use client";

import React from "react";
import styled from "styled-components";
import { ButtonSize, SmallButton } from "ui/components";

interface LoadMoreProps {
  nextPage: () => void;
  text: string;
}

export const LoadMore: React.FunctionComponent<LoadMoreProps> = ({ nextPage, text }) => {
  return (
    <Container>
      <SmallButton
        transparent
        leadingIcon="reset"
        label={text}
        size={ButtonSize.MEDIUM}
        onClick={nextPage}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 24px;
  display: flex;
  width: 100%;
  justify-content: center;
`;
