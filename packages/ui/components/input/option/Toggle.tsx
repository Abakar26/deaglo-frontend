import React from "react";
import styled, { css } from "styled-components";
import { Color, Typography } from "../../../styles";

interface Props {
  active: boolean;
  label?: string;
  onClick: (value: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FunctionComponent<Props> = ({
  active,
  label,
  onClick,
  disabled = false,
}) => {
  const flip = () => {
    !disabled && onClick?.(!active);
  };

  return (
    <Container disabled={disabled}>
      <Switch active={active} disabled={disabled} onClick={flip} aria-label={label ?? "Switch"}>
        <Indicator active={active} />
      </Switch>
      {label}
    </Container>
  );
};

const Container = styled.div<{ disabled: boolean }>`
  width: min-content;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  ${Typography.BODY_1};
  color: ${(props) => (props.disabled ? Color.NEUTRAL_500 : Color.NEUTRAL_900)};
  transition: 0.15s ease color;
`;

const Switch = styled.button<{ active: boolean; disabled: boolean }>`
  width: 44px;
  height: 24px;
  position: relative;
  border-radius: 24px;
  outline: none;
  border: none;
  outline-offset: 2px;
  background-color: ${(props) => (props.active ? Color.BRAND_800 : Color.NEUTRAL_400)};
  &:hover {
    background-color: ${(props) =>
      !props.disabled && (props.active ? Color.BRAND_900 : Color.NEUTRAL_500)};
  }
  &:focus {
    outline: 2px solid ${Color.BRAND_900};
  }
  ${(props) =>
    props.disabled &&
    css`
      background-color: ${props.active ? Color.BRAND_300 : Color.NEUTRAL_300};
    `}
  ${(props) =>
    !props.disabled &&
    css`
      cursor: pointer;
    `}
    transition: 0.15s ease background-color;
`;

const Indicator = styled.div<{ active: boolean }>`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.active ? "calc(100% - 22px)" : "2px")};
  background-color: ${Color.NEUTRAL_00};
  height: 20px;
  width: 20px;
  border-radius: 20px;
  transition: 0.15s ease left;
`;
