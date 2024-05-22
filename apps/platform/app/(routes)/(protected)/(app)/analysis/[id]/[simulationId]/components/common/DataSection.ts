"use client";

import styled from "styled-components";
import { Color } from "ui/styles";

export const DataSection = styled.div`
  border: 1px solid ${Color.NEUTRAL_400};
  border-radius: 8px;
  width: 100%;
  height: max-content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  gap: 16px;
`;
