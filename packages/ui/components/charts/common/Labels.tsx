import styled from "styled-components";
import { Color, Typography } from "../../../styles";

const Label = styled.span`
  position: absolute;
  ${Typography.LABEL_5};
  color: ${Color.NEUTRAL_900};
`;

export const YLabel = styled(Label)`
  left: 0;
  top: 50%;
  transform-origin: 0 0;
  transform: rotate(-90deg) translateX(-50%);
`;

export const XLabel = styled(Label)`
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
