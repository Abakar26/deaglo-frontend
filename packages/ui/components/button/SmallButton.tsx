import React, { useState } from "react";
import styled, { css, type RuleSet } from "styled-components";
import { ButtonSize, getIconSize, getTypography } from ".";
import { DotsLoader, LoaderColor } from "..";
import { Color } from "../../styles";
import { Icon, type IconName } from "../icon";

export enum SmallButtonVariant {
  DEFAULT,
  DANGER,
}

interface Props {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  transparent?: boolean;
  variant?: SmallButtonVariant;
}

export const SmallButton: React.FunctionComponent<Props> = ({
  label = "",
  onClick,
  size = ButtonSize.MEDIUM,
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  transparent = false,
  variant = SmallButtonVariant.DEFAULT,
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading) {
      setFocused(true);
      onClick?.(e);
    }
  };

  return (
    <Container
      $transparent={transparent}
      $focused={focused}
      $loading={loading}
      $size={size}
      $variant={variant}
      disabled={disabled}
      onBlur={() => setFocused(false)}
      onClick={handleClick}
      onFocus={() => setFocused(true)}
    >
      {leadingIcon && !loading ? (
        <Icon
          name={leadingIcon}
          size={getIconSize(size)}
          color={focused ? Color.NEUTRAL_00 : disabled ? Color.NEUTRAL_400 : getColor(variant).text}
        />
      ) : null}
      {loading ? <DotsLoader color={LoaderColor.BRAND_800} /> : label}
      {trailingIcon && !loading ? (
        <Icon
          name={trailingIcon}
          size={getIconSize(size)}
          color={focused ? Color.NEUTRAL_00 : disabled ? Color.NEUTRAL_400 : getColor(variant).text}
        />
      ) : null}
    </Container>
  );
};

// Styling

const getSizing = (size: ButtonSize): RuleSet => {
  switch (size) {
    case ButtonSize.SMALL:
      return css`
        height: 20px;
      `;
    case ButtonSize.MEDIUM:
      return css`
        height: 24px;
      `;
    case ButtonSize.LARGE:
      return css`
        height: 32px;
      `;
  }
};

const getColor = (variant: SmallButtonVariant) => {
  switch (variant) {
    case SmallButtonVariant.DANGER:
      return {
        text: Color.DANGER_700,
        hover: Color.DANGER_100,
        pressed: Color.DANGER_400,
        focus: Color.DANGER_700,
        outline: Color.DANGER_700,
      };
    case SmallButtonVariant.DEFAULT:
    default:
      return {
        text: Color.BRAND_800,
        hover: Color.BRAND_100,
        pressed: Color.BRAND_300,
        focus: Color.BRAND_800,
        outline: Color.BRAND_900,
      };
  }
};

const Container = styled.button<{
  $focused: boolean;
  $loading: boolean;
  $size: ButtonSize;
  $variant: SmallButtonVariant;
  $transparent: boolean;
}>`
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  ${(props) => getTypography(props.$size)};
  ${(props) => getSizing(props.$size)};
  border-radius: 4px;
  outline-offset: 2px;
  ${(props) => !props.disabled && "cursor: pointer"};
  color: ${(props) => getColor(props.$variant).text};
  background-color: ${(props) => (props.$transparent ? "transparent" : Color.NEUTRAL_00)};
  &:focus {
    ${(props) =>
      !props.$loading &&
      css`
        outline: 2px solid ${getColor(props.$variant).outline};
        background-color: ${getColor(props.$variant).focus};
        color: ${Color.NEUTRAL_00};
      `}
  }
  &:hover {
    ${(props) =>
      !props.$focused &&
      !props.$loading &&
      !props.disabled &&
      css`
        background-color: ${getColor(props.$variant).hover};
      `}
  }
  &:active {
    ${(props) =>
      !props.$loading &&
      !props.disabled &&
      css`
        background-color: ${getColor(props.$variant).pressed};
      `}
  }
  &:disabled {
    color: ${Color.NEUTRAL_400};
  }
  transition:
    0.5s ease color,
    0.5s ease background-color;
  gap: 5px;
  ${(props) =>
    props.$loading &&
    css`
      background-color: ${Color.NEUTRAL_00};
      border: none;
      box-shadow: none;
    `};
`;
