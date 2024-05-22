"use client";

import styled from "styled-components";

export const AnalysisGrid = styled.div`
  width: 100%;
  display: grid;
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(344px, 1fr));
`;
