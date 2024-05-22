import React from "react";
import styled, { css } from "styled-components";
import { Icon, type IconName } from "..";
import { Color } from "../../styles";

interface Props {
  name: IconName;
  onClick: () => void;
  color?: Color;
  fill?: Color;
  stroke?: Color;
  size?: number;
  disabled?: boolean;
  hoverable?: boolean;
}

export const IconButton: React.FunctionComponent<Props> = ({
  name,
  onClick,
  color,
  fill,
  stroke,
  size,
  disabled = false,
  hoverable = true,
}) => {
  return (
    <Container
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      hoverable={hoverable}
      aria-label={`${name} button`}
      type="button"
    >
      <Icon
        name={name}
        fill={fill && disabled ? Color.NEUTRAL_500 : fill}
        stroke={stroke && disabled ? Color.NEUTRAL_500 : stroke}
        color={disabled ? Color.NEUTRAL_500 : color}
        size={size}
      />
    </Container>
  );
};

const Container = styled.button<{ disabled: boolean; hoverable: boolean }>`
  ${(props) => !props.disabled && "cursor: pointer"};
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 32px;
  height: 40px;
  width: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    ${(props) =>
      !props.disabled &&
      props.hoverable &&
      css`
        background-color: ${Color.NEUTRAL_300};
      `};
  }
  transition: 0.15s ease background-color;
`;
