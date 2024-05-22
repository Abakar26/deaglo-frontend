import React from "react";
import styled from "styled-components";
import { Icon } from "../..";
import { Color, Typography } from "../../../styles";

interface Props {
  active: boolean;
  label?: string;
  onClick?: (value: boolean) => void;
  disabled?: boolean;
}

export const Checkbox: React.FunctionComponent<Props> = ({
  active,
  label,
  onClick,
  disabled = false,
}) => {
  const check = () => {
    !disabled && onClick?.(!active);
  };

  return (
    <Container disabled={disabled}>
      <Box onClick={check} active={active} disabled={disabled} aria-label={label ?? "Checkbox"}>
        {active && <Icon name="check" color={Color.NEUTRAL_00} size={18} />}
      </Box>
      {label}
    </Container>
  );
};

const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  width: min-content;
  white-space: nowrap;
  gap: 8px;
  ${Typography.BODY_1};
  color: ${(props) => (props.disabled ? Color.NEUTRAL_500 : Color.NEUTRAL_900)};
  transition: 0.15s ease color;
`;

const Box = styled.button<{ active: boolean; disabled: boolean }>`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Color.BRAND_800};
  padding-bottom: 4px;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  outline-offset: 2px;
  &:hover {
    ${(props) =>
      !props.disabled && `background-color: ${props.active ? Color.BRAND_900 : Color.BRAND_300}`};
    ${(props) =>
      !props.disabled && `border-color: ${props.active ? Color.BRAND_900 : Color.BRAND_800}`};
  }
  &:focus {
    outline: 2px solid ${Color.BRAND_900};
  }
  background-color: ${(props) => (props.active ? Color.BRAND_800 : Color.BRAND_50)};
  ${(props) =>
    props.disabled &&
    `background-color: ${props.active ? Color.NEUTRAL_500 : Color.NEUTRAL_00}; border: 1px solid ${
      Color.NEUTRAL_500
    }; cursor: unset; color: ${Color.NEUTRAL_500}`};
  transition: 0.15s ease background-color;

  & > svg {
    margin-top: 2px;
  }
`;
