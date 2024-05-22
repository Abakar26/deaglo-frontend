import React from "react";
import styled from "styled-components";
import { Color } from "../../styles";

interface Props {
  progress: number;
  size?: number;
  color?: Color;
  accentColor?: Color;
  start?: number;
}

const DEFAULT_SIZE = 16;

export const ProgressRing: React.FunctionComponent<Props> = ({
  progress,
  size = DEFAULT_SIZE,
  color = Color.BRAND_800,
  accentColor = Color.BRAND_400,
  start = 0,
}) => {
  const clamp = (value: number): number => Math.min(Math.max(0, value), 1);
  const stroke = size / 5.5;
  const radius = size / 2;
  const innerRadius = radius - stroke;
  const circumference = 2 * Math.PI * innerRadius;
  const strokeDashoffset = -clamp(progress) * circumference;

  return (
    <StyledSVG width={size} height={size} viewBox={`0 0 ${size} ${size}`} start={start}>
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        r={innerRadius}
        cx={radius}
        cy={radius}
      />
      <StyledCircle
        stroke={accentColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashOffset={strokeDashoffset}
        stroke-width={stroke + 0.2}
        r={innerRadius}
        cx={radius}
        cy={radius}
      />
    </StyledSVG>
  );
};

const StyledCircle = styled.circle<{ strokeDashOffset: number }>`
  stroke-dashoffset: ${(props) => props.strokeDashOffset};
  transition: 0.15s ease stroke-dashoffset;
`;

const StyledSVG = styled.svg<{ start: number }>`
  transform: rotate(${(props) => props.start + 270}deg);
`;
