import React from "react";
import styled, { css, type RuleSet } from "styled-components";
import { Icon, type IconName } from "..";
import { Color, Shadow } from "../../styles";

interface Props {
  icon: IconName;
  onClick: () => void;
  disabled?: boolean;
  position?: RuleSet;
}

export const FAButton: React.FunctionComponent<Props> = ({
  icon,
  onClick,
  disabled = false,
  position,
}) => {
  return (
    <Container
      position={position}
      disabled={disabled}
      onClick={onClick}
      aria-label={`${icon} button`}
    >
      <Icon name={icon} size={20} color={Color.NEUTRAL_00} />
    </Container>
  );
};

const Container = styled.button<{
  position?: RuleSet;
}>`
  position: absolute;
  ${(props) =>
    props.position ??
    css`
      top: 0px;
      left: 0px;
    `};
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${Color.BRAND_800};
  ${(props) => !props.disabled && "cursor: pointer"};
  z-index: 100000;
  border: none;
  outline: none;
  &:hover {
    background-color: ${(props) => !props.disabled && Color.BRAND_900};
    ${Shadow.DEFAULT};
  }
  &:active {
    background-color: ${Color.NEUTRAL_900};
  }
  &:disabled {
    background-color: ${Color.NEUTRAL_500};
  }

  transition:
    0.3s ease box-shadow,
    0.3s ease background-color;
`;
