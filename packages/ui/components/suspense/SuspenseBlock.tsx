import styled, { keyframes } from "styled-components";
import { Color } from "../../styles";

const fade = keyframes`
    0% {
        background-color: ${Color.NEUTRAL_300};
    }
    100% {
        background-color: ${Color.NEUTRAL_400};
    }
`;

export const SuspenseBlock = styled.div<{ width?: string; height?: string }>`
  height: ${(props) => props.height ?? "100%"};
  width: ${(props) => props.width ?? "100%"};
  background-color: ${Color.NEUTRAL_300};
  border-radius: 8px;
  animation: ${fade} 0.5s ease-in-out infinite alternate-reverse;
`;
