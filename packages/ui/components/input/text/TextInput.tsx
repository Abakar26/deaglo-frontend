import React, { useState } from "react";
import styled from "styled-components";
import { ButtonSize, SmallButton, Tooltip, type TooltipProps } from "../../../components";
import { Color, Typography } from "../../../styles";

export enum InputType {
  PASSWORD = "password",
  TEXT = "text",
}

interface Props {
  name?: string;
  onChange: (text: string) => void;
  label?: string;
  placeholder?: string;
  type?: InputType;
  value: string;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  tooltip?: TooltipProps;
  disabled?: boolean;
  unitLabel?: string;
}

export const TextInput: React.FunctionComponent<Props> = ({
  name,
  onChange,
  placeholder,
  label,
  type = InputType.TEXT,
  value,
  onFocus,
  onBlur,
  error,
  tooltip,
  disabled = false,
  unitLabel,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const focus = () => {
    setFocused(true);
    onFocus?.();
  };

  const blur = () => {
    setFocused(false);
    onBlur?.();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container error={!!error} focused={focused}>
      <TooltipContainer>{tooltip && <Tooltip {...tooltip} />}</TooltipContainer>
      <InputContainer error={!!error} focused={focused} disabled={disabled}>
        {label && (
          <Placeholder
            focused={focused}
            positioned={focused || !!value}
            error={!!error}
            disabled={disabled}
          >
            {label}
          </Placeholder>
        )}
        <Row>
          <Input
            aria-label={name ?? label}
            name={name ?? label}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            focused={focused}
            onFocus={focus}
            onBlur={blur}
            type={
              type === InputType.PASSWORD && !showPassword ? InputType.PASSWORD : InputType.TEXT
            }
            disabled={disabled}
          />
          {type === InputType.PASSWORD && (
            <ToggleShowButton onClick={toggleShowPassword}>
              <SmallButton leadingIcon={showPassword ? "hide" : "show"} size={ButtonSize.LARGE} />
            </ToggleShowButton>
          )}
          {unitLabel && <UnitContainer>{unitLabel}</UnitContainer>}
        </Row>
      </InputContainer>
      <Error show={!!error}>{error}</Error>
    </Container>
  );
};

const getColor = (error: boolean, focused: boolean, disabled: boolean): Color => {
  return disabled
    ? Color.NEUTRAL_400
    : error
      ? Color.DANGER_700
      : focused
        ? Color.BRAND_800
        : Color.NEUTRAL_400;
};

const ToggleShowButton = styled.button`
  background: none;
  border: none;
  color: ${Color.NEUTRAL_00};
  fill: ${Color.NEUTRAL_00};
  cursor: pointer;
  ${Typography.BODY_1};
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Container = styled.div<{ error: boolean; focused: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: min-content;
  gap: 8px;
  transition: 0.15s ease gap;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const UnitContainer = styled.div`
  ${Typography.BODY_2}
  margin-right: 16px;
`;

const InputContainer = styled.div<{ error: boolean; focused: boolean; disabled: boolean }>`
  width: 100%;
  height: 48px;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${(props) => getColor(props.error, props.focused, props.disabled)};
  background-color: transparent;
  z-index: 50;
  &:hover {
    border-color: ${(props) =>
      !props.focused && !props.error && !props.disabled && Color.NEUTRAL_500};
  }
  transition: 0.15s ease border-color;
`;

const Input = styled.input<{ focused: boolean }>`
  outline: none;
  ${Typography.BODY_1};
  color: ${(props) => (props.disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_900)};
  padding: 0 12px;
  background: transparent;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 4px;
  z-index: 75;
  &::placeholder {
    opacity: ${(props) => (props.focused ? 1 : 0)};
    transition: ${(props) => (props.focused ? "0.3s" : 0)} ease opacity;
    transition-delay: ${(props) => (props.focused ? "0.15s" : 0)};
    ${Typography.BODY_1};
    color: ${(props) => (props.disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_700)};
  }
`;

const Placeholder = styled.span<{
  error: boolean;
  focused: boolean;
  disabled: boolean;
  positioned: boolean;
}>`
  ${(props) => (props.positioned ? Typography.LABEL_4 : Typography.BODY_1)};
  background-color: ${Color.NEUTRAL_00};
  padding: 2px 4px;
  position: absolute;
  top: ${(props) => (props.positioned ? "-10px" : "calc(50% - 14px)")};
  left: 8px;
  overflow: hidden;
  z-index: ${(props) => (props.positioned ? 100 : 50)};
  border-radius: 4px;
  color: ${(props) =>
    props.error && props.positioned
      ? Color.DANGER_700
      : props.disabled
        ? Color.NEUTRAL_400
        : props.focused
          ? Color.BRAND_800
          : Color.NEUTRAL_700};
  transition:
    font-size 0.3s ease,
    top 0.3s ease,
    color 0.3s ease;
`;

const Error = styled.span<{ show: boolean }>`
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  ${Typography.LABEL_4}
  color: ${Color.DANGER_700};
  opacity: ${(props) => (props.show ? 1 : 0)};
  white-space: nowrap;
  transition:
    height 0.3s ease,
    opacity 0.3s ease;
`;

const TooltipContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: calc(100% + 12px);
`;
