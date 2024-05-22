"use client";

import styled from "styled-components";
import { CircleLoader } from "ui/components";

export default function Loading() {
  return (
    <Container>
      <CircleLoader />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
`;
