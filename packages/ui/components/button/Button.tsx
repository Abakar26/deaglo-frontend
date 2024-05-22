"use client";
import React, { useState } from "react";
import styled, { css, type RuleSet } from "styled-components";
import { ButtonSize, getIconSize, getTypography } from ".";
import { DotsLoader, LoaderColor } from "..";
import { Color } from "../../styles";
import { Icon, type IconName } from "../icon";

export enum ButtonType {
  FILL,
  OUTLINE,
}

export enum ButtonVariant {
  DEFAULT,
  DANGER,
}

interface Props {
  label?: string;
  onClick?: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  resizeMode?: "fit" | "fill";
  variant?: ButtonVariant;
}

export const Button: React.FunctionComponent<Props> = ({
  label,
  onClick,
  type = ButtonType.FILL,
  size = ButtonSize.MEDIUM,
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  resizeMode = "fill",
  variant = ButtonVariant.DEFAULT,
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  const handleClick = () => {
    setFocused(true);
    !loading && onClick?.();
  };

  return (
    <Container
      onClick={handleClick}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      $type={type}
      type="button"
      size={size}
      resizeMode={resizeMode}
      disabled={disabled}
      loading={loading}
      focused={focused}
      variant={variant}
      aria-label={label ?? leadingIcon ?? trailingIcon ?? "Button"}
    >
      {leadingIcon && !loading ? (
        <Icon
          name={leadingIcon}
          size={getIconSize(size)}
          color={getColorByVariantAndType(variant, type, focused).icon}
        />
      ) : null}
      {loading ? (
        <DotsLoader color={getLoaderColorByVariantAndType(variant, type, focused).icon} />
      ) : (
        label
      )}
      {trailingIcon && !loading ? (
        <Icon
          name={trailingIcon}
          size={getIconSize(size)}
          color={getColorByVariantAndType(variant, type, focused).icon}
        />
      ) : null}
    </Container>
  );
};

const getSizing = (size: ButtonSize): RuleSet => {
  switch (size) {
    case ButtonSize.SMALL:
      return css`
        height: 32px;
      `;
    case ButtonSize.MEDIUM:
      return css`
        height: 40px;
      `;
    case ButtonSize.LARGE:
      return css`
        height: 48px;
      `;
  }
};

const getLoaderColorByVariantAndType = (
  variant: ButtonVariant,
  type: ButtonType,
  focused: boolean
) => {
  const baseColor =
    variant === ButtonVariant.DANGER ? LoaderColor.DANGER_700 : LoaderColor.BRAND_800;
  return {
    icon: type === ButtonType.FILL || focused ? LoaderColor.DANGER_100 : baseColor,
    loader: type === ButtonType.FILL ? LoaderColor.DANGER_100 : baseColor,
  };
};

const getColorByVariantAndType = (variant: ButtonVariant, type: ButtonType, focused: boolean) => {
  const baseColor = variant === ButtonVariant.DANGER ? Color.DANGER_700 : Color.BRAND_800;
  return {
    icon: type === ButtonType.FILL || focused ? Color.NEUTRAL_00 : baseColor,
    loader: type === ButtonType.FILL ? Color.NEUTRAL_900 : baseColor,
  };
};

const Container = styled.button<{
  $type: ButtonType;
  size: ButtonSize;
  loading: boolean;
  focused: boolean;
  resizeMode: "fit" | "fill";
  variant: ButtonVariant;
}>`
  min-width: ${(props) => (props.resizeMode == "fill" ? "100%" : "max-content")};
  padding: 0 ${(props) => (props.resizeMode == "fit" ? "24px" : "0px")};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  ${(props) => getTypography(props.size)};
  ${(props) => getSizing(props.size)};
  ${(props) => getVariantStyles(props)};
  cursor: pointer;
  border-radius: 4px;
  outline-offset: 2px;
  &:focus {
    ${(props) =>
      !props.loading &&
      props.focused &&
      css`
        outline: 2px solid ${Color.BRAND_900};
        background-color: ${Color.BRAND_800};
        color: ${Color.NEUTRAL_00};
      `}
  }
  &:hover {
    ${(props) =>
      !props.loading &&
      !props.focused &&
      css`
        background-color: ${props.$type === ButtonType.FILL ? Color.BRAND_900 : Color.BRAND_100};
        color: ${props.$type === ButtonType.FILL ? Color.NEUTRAL_00 : Color.BRAND_800};
      `}
  }
  &:active {
    background-color: ${(props) =>
      !props.loading && (props.$type === ButtonType.FILL ? Color.NEUTRAL_900 : Color.BRAND_300)};
  }
  &:disabled {
    background-color: ${(props) =>
      props.$type === ButtonType.FILL ? Color.NEUTRAL_400 : Color.NEUTRAL_00};
    color: ${(props) => (props.$type === ButtonType.FILL ? Color.NEUTRAL_00 : Color.NEUTRAL_400)};
    border-color: ${Color.NEUTRAL_400};
  }
  transition:
    0.5s ease box-shadow,
    0.3s ease outline-color,
    0.3s ease background-color,
    0.3s ease color;
  gap: 5px;
  white-space: nowrap;
  overflow: hidden;
`;

const getVariantStyles = ({
  variant,
  $type,
}: {
  variant: ButtonVariant;
  $type: ButtonType;
  focused: boolean;
  loading: boolean;
}) => css`
  background-color: ${variant === ButtonVariant.DANGER
    ? $type === ButtonType.FILL
      ? Color.DANGER_700
      : "transparent"
    : $type === ButtonType.FILL
      ? Color.BRAND_800
      : "transparent"};
  color: ${$type === ButtonType.FILL
    ? Color.NEUTRAL_00
    : variant === ButtonVariant.DANGER
      ? Color.DANGER_700
      : Color.BRAND_800};
  border: 1px solid ${variant === ButtonVariant.DANGER ? Color.DANGER_700 : Color.BRAND_800};
  &:focus {
    outline: 2px solid ${variant === ButtonVariant.DANGER ? Color.DANGER_700 : Color.BRAND_900};
    background-color: ${variant === ButtonVariant.DANGER ? Color.DANGER_700 : Color.BRAND_800};
  }
  &:hover {
    background-color: ${variant === ButtonVariant.DANGER
      ? $type === ButtonType.FILL
        ? Color.DANGER_700
        : Color.DANGER_100
      : $type === ButtonType.FILL
        ? Color.BRAND_900
        : Color.BRAND_100};
  }
  &:active {
    background-color: ${variant === ButtonVariant.DANGER
      ? $type === ButtonType.FILL
        ? Color.DANGER_700
        : Color.DANGER_400
      : $type === ButtonType.FILL
        ? Color.BRAND_900
        : Color.BRAND_300};
  }
  &:disabled {
    background-color: ${variant === ButtonVariant.DANGER
      ? $type === ButtonType.FILL
        ? Color.NEUTRAL_400
        : Color.NEUTRAL_00
      : $type === ButtonType.FILL
        ? Color.NEUTRAL_400
        : Color.NEUTRAL_00};
    color: ${$type === ButtonType.FILL ? Color.NEUTRAL_00 : Color.NEUTRAL_400};
    border-color: ${Color.NEUTRAL_400};
  }
`;
