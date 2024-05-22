import React, { Suspense, type ReactNode } from "react";
import styled from "styled-components";
import { Icon, SuspenseBlock } from "..";
import { Color, Typography } from "../../styles";

export interface BreadCrumbProps {
  onSelect?: (key: string) => void;
  crumbs: Array<{
    key: string;
    label?: ReactNode;
  }>;
}

export const Breadcrumbs: React.FunctionComponent<BreadCrumbProps> = ({ onSelect, crumbs }) => {
  return (
    <Container>
      {crumbs.map(({ key, label }, index) => {
        return (
          <Row key={index}>
            {index !== 0 && <Icon name="chevron-right" color={Color.NEUTRAL_700} />}
            {label ? (
              <Crumb onClick={() => onSelect && onSelect(key)}>{label}</Crumb>
            ) : (
              <SuspenseBlock height={"24px"} width={"100px"} />
            )}
          </Row>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  flex-wrap: wrap;
`;

const Crumb = styled.button`
  ${Typography.SUBHEAD_3};
  color: ${Color.NEUTRAL_700};
  padding: 2px 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: transparent;
  border: none;
  outline: none;
  white-space: nowrap;
  &:hover {
    background-color: ${Color.NEUTRAL_300};
  }
  transition: 0.15s ease background-color;
  text-transform: capitalize;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
