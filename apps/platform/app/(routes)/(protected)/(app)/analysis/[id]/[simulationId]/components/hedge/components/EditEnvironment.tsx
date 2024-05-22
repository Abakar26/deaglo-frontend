"use client";
import React from "react";
import { styled } from "styled-components";
import { SmallButton } from "ui/components";
import { type Environment } from "../../../interface";
import { SelectedEnvironment } from ".";

interface Props {
  environment: Environment;
}

export const EditEnvironment: React.FunctionComponent<Props> = ({ environment }) => {
  return (
    <>
      <Container>
        <Section>
          <Heading>
            Selected Environment{" "}
            <SmallButton leadingIcon="pencil" label="Edit" onClick={() => null} />
          </Heading>
          <SelectedEnvironment environment={environment} edit />
        </Section>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;
