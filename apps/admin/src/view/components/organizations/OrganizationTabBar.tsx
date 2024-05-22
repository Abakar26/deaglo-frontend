import React from "react";
import styled from "styled-components";
import { Button } from "ui/components";
import { useOrganizationStore } from "@/core/store";

export const OrganizationTabBar: React.FunctionComponent = () => {
  const { setCreateOrganization } = useOrganizationStore();

  return (
    <Row>
      <Button
        label="Create Organization"
        onClick={() => setCreateOrganization(true)}
        resizeMode="fit"
      />
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: end;
  margin: 32px 0;
`;
