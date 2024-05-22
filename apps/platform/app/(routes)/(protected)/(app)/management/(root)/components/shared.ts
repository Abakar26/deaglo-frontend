"use client";

import styled from "styled-components";
import { Color, Shadow, Typography } from "ui/styles";

export const SectionContainer = styled.section<{ $marginTop: string }>`
  ${Shadow.CARD};
  background-color: ${Color.NEUTRAL_00};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: ${(props) => props.$marginTop};
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_900};
`;

export const Card = styled.article`
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

export const CardHeader = styled.header`
  margin-bottom: auto;
`;

export const CardTitle = styled.h3`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

export const CardSubtitle = styled.p`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

export const CardGroup = styled.div<{ $columns: number }>`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(${(props) => props.$columns}, minmax(0, 1fr));

  & ${Card}:nth-child(${(props) => props.$columns + 1}) {
    grid-column: span ${(props) => props.$columns};
  }
`;

export const SegmentDescription = styled.span`
  ${Typography.LABEL_4};
  color: ${Color.NEUTRAL_700};
`;

export const HeaderSpacer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: auto;
`;

export const SmallGeneralDashboardChart = styled.div`
  min-height: 268px;
`;

export const SmallMarkToMarketChart = styled.div`
  min-height: 272px;
`;

export const LargeChart = styled.div`
  min-height: 348px;
`;
