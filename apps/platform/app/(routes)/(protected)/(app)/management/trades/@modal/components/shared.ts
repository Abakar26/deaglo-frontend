import styled from "styled-components";
import { Color, Typography } from "ui/styles";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  margin-top: 40px;
`;

export const Title = styled.p`
  ${Typography.SUBHEAD_1}
`;

export const Subtitle = styled.p`
  ${Typography.BODY_3}
  color: ${Color.NEUTRAL_700};
  margin-top: 8px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  margin-top: auto;
`;
