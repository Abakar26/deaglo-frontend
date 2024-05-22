"use client";

import styled from "styled-components";
import { Color, Shadow, Typography } from "ui/styles";

export const SectionContainer = styled.section`
  ${Shadow.CARD};
  background-color: ${Color.NEUTRAL_00};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_900};
`;
