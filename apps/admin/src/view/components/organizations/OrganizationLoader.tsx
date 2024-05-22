import React from "react";
import { SuspenseBlock } from "ui/components";
import styled from "styled-components";

interface Props {
  count: number;
}

export const OrganizationLoader: React.FunctionComponent<Props> = ({ count }) => {
  return (
    <List>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <SuspenseBlock key={index} height="75px" />
        ))}
    </List>
  );
};

const List = styled.div`
  width: 100%;
  display: grid;
`;
