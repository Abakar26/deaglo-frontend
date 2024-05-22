import React from "react";
import styled from "styled-components";
import LinkButton from "ui/components/LinkButton";

export const Dashboard: React.FunctionComponent = () => {
  return (
    <Container>
      <Heading>Dashboard</Heading>
      <LinkButton to="/manage-organizations" text="Organizations" />
      <LinkButton to="/manage-users" text="Users" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 96px;
  background-color: #f3f3f4;
`;

const Heading = styled.h1`
  font-size: 30px;
  line-height: 36px;
  margin-bottom: 20px;
`;
