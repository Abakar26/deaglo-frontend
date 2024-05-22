"use client";

import styled from "styled-components";
import { Color, Shadow, Typography } from "ui/styles";

export const Container = styled.div`
  ${Shadow.CARD};
  background-color: ${Color.NEUTRAL_00};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 20px;
`;

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SectionTitle = styled.h2`
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_900};
`;

export const SectionSubtitle = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

export const CardGroup = styled.div`
  display: flex;
  gap: 24px;
`;

export const Card = styled.article`
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
`;

export const CardTitle = styled.h3`
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_900};
`;

export const CardDescription = styled.p`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

export const HeaderSpacer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const SmallChart = styled.div`
  min-height: 350px;
`;

export const LargeChart = styled.div`
  min-height: 650px;
`;

export const DropdownContainer = styled.div`
  width: 300px;
`;
