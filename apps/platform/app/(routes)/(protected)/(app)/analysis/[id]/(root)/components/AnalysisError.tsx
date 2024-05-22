"use client";

import styled from "styled-components";
import { Icon } from "ui/components";
import { Typography } from "ui/styles";

interface Props {
  title: string;
  subheading: string;
}

export const AnalysisError: React.FunctionComponent<Props> = ({ title, subheading }) => {
  return (
    <Container>
      <HeadingContainer>
        <Icon name="search" size={32} />
        <MainHeader>{title}</MainHeader>
      </HeadingContainer>
      <SubHeading2>{subheading}</SubHeading2>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
  padding: 20px;
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MainHeader = styled.h2`
  ${Typography.HEADER_2}
  margin: 0;
`;

const SubHeading2 = styled.h3`
  ${Typography.BODY_1}
  margin-top: 16px;
  text-align: center;
`;
