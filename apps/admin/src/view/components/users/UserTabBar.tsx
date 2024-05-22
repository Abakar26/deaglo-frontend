import React from "react";
import styled from "styled-components";
import { Button } from "ui/components";
import { useUserStore } from "@/core/store";

export const UserTabBar: React.FunctionComponent = () => {
  const { setCreateUser } = useUserStore();

  return (
    <Row>
      <Button label="Create User" onClick={() => setCreateUser(true)} resizeMode="fit" />
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: end;
  margin: 32px 0;
`;
