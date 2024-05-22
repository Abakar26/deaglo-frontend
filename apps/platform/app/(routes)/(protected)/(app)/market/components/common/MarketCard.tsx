"use client";

import React, { type PropsWithChildren } from "react";
import styled from "styled-components";
import { Button, ButtonType } from "ui/components";
import { Color, Shadow, Typography } from "ui/styles";
import { MarketLoader } from ".";

interface Props {
  title: string;
  onView: () => void;
  loading?: boolean;
}

export const MarketCard: React.FunctionComponent<PropsWithChildren<Props>> = ({
  title,
  onView,
  loading,
  children,
}) => {
  return (
    <Container>
      <Row>
        <Title>{title}</Title>
        {/* <Button type={ButtonType.OUTLINE} resizeMode="fit" label={"View"} onClick={onView} /> */}
      </Row>
      <ChildContainer>{loading ? <MarketLoader /> : children}</ChildContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  height: max-content;
  padding: 20px;
  ${Shadow.CARD};
  border-radius: 8px;
  background-color: ${Color.NEUTRAL_00};
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: space-between;
`;

const Title = styled.span`
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_900};
`;

const ChildContainer = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;
