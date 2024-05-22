import React, { type PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { Color, Shadow } from "../../../styles";

interface Props {
  borderColor?: Color;
  hoverable?: boolean;
  resizeMode?: "max-content" | "min-content";
  onClick?: () => void;
}

export const Card: React.FunctionComponent<Props & PropsWithChildren> = ({
  borderColor,
  hoverable,
  resizeMode,
  onClick,
  children,
}) => {
  return (
    <Container resizeMode={resizeMode} hoverable={hoverable} borderColor={borderColor}>
      {onClick && <ClickableSection onClick={onClick} />}
      {children}
    </Container>
  );
};

export const Container = styled.div<{
  borderColor?: Color;
  hoverable?: boolean;
  resizeMode?: "max-content" | "min-content";
}>`
  width: ${(props) => props.resizeMode ?? "100%"};
  padding: 20px;
  height: max-content;
  display: flex;
  flex-direction: column;
  background-color: ${Color.NEUTRAL_00};
  border-radius: 8px;
  box-shadow: ${Shadow.CARD};
  ${(props) =>
    props.hoverable &&
    css`
      &:hover {
        box-shadow: ${Shadow.CARD_HOVER};
      }
    `};
  border: 1px solid transparent;
  ${(props) =>
    props.borderColor &&
    css`
      border-color: ${props.borderColor};
    `};
  transition:
    0.3s ease border-color,
    0.3s ease box-shadow;
  position: relative;
  gap: 16px;
`;

const ClickableSection = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  ${(props) => props.onClick && "cursor: pointer"};
`;
