"use client";

import styled from "styled-components";
import { Color, Shadow, Typography } from "ui/styles";

export const MainContainer = styled.main`
  margin-top: 32px;
`;

export const SectionContainer = styled.section<{ marginBottom?: string; marginTop?: string }>`
  ${Shadow.CARD};
  background-color: ${Color.NEUTRAL_00};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_900};
`;

export const SectionSubtitle = styled.p`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
  margin-top: 4px;
`;

export const Card = styled.article`
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

export const CardTitle = styled.h3`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

export const HeaderSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: auto;
`;

export const ChartContainer = styled.div<{ height: string }>`
  height: ${(props) => props.height};
`;
