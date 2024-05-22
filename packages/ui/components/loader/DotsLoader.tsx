import React from "react";
import styled, { keyframes } from "styled-components";
import { Color } from "../../styles";

export enum LoaderColor {
  BRAND_300,
  BRAND_800,
  DANGER_100,
  DANGER_700,
}

interface Props {
  color?: LoaderColor;
}

export const DotsLoader: React.FunctionComponent<Props> = ({ color = LoaderColor.BRAND_300 }) => {
  return (
    <Container>
      <Dot color={color} delay={0.0} />
      <Dot color={color} delay={0.3} />
      <Dot color={color} delay={0.6} />
    </Container>
  );
};

const colorChange = (start: Color, end: Color) => {
  return keyframes`
        0% {

            background-color: ${start};
        }
        100% {
            background-color: ${end};
        }
    `;
};

const getColors = (color: LoaderColor): [Color, Color] => {
  switch (color) {
    case LoaderColor.BRAND_800:
      return [Color.BRAND_800, Color.BRAND_400];
    case LoaderColor.BRAND_300:
      return [Color.BRAND_300, Color.BRAND_400];
    case LoaderColor.DANGER_100:
      return [Color.DANGER_100, Color.NEUTRAL_500];
    case LoaderColor.DANGER_700:
      return [Color.DANGER_100, Color.NEUTRAL_500];
  }
};

const Container = styled.div`
  display: flex;
  width: min-content;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.div<{ color: LoaderColor; delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: ${Color.BRAND_400};
  animation: ${(props) => colorChange(...getColors(props.color))} 0.45s ease
    ${(props) => props.delay}s infinite alternate;
`;
