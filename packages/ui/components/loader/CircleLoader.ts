import styled, { keyframes } from "styled-components";
import { Color } from "../../styles";

const DEFAULT_LOADER_SIZE = 24;

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
`;

export const CircleLoader = styled.div<{ size?: number; color?: Color }>`
  height: ${(props) => props.size ?? DEFAULT_LOADER_SIZE}px;
  width: ${(propss) => propss.size ?? DEFAULT_LOADER_SIZE}px;
  border-radius: 50%;
  border: ${(props) => ((props.size ?? DEFAULT_LOADER_SIZE) * 3) / 16}px solid ${Color.NEUTRAL_300};
  display: inline-block;
  box-sizing: border-box;
  border-bottom-color: ${(props) => props.color ?? Color.BRAND_800};
  border-right-color: ${(props) => props.color ?? Color.BRAND_800};
  border-left-color: ${(props) => props.color ?? Color.BRAND_800};
  transform: rotate(45deg);
  animation: ${rotate} 0.7s linear infinite;
`;
