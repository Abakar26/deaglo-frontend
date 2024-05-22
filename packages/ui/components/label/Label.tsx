import React, { type ReactNode } from "react";
import styled, { css, type RuleSet } from "styled-components";
import { Icon } from "..";
import { Color, Typography } from "../../styles";

export enum LabelType {
  BLANK,
  OUTLINE,
  FILL,
  CHECKED,
}

export enum LabelColor {
  NEUTRAL,
  SUCCESS,
  DANGER,
  BROWN,
  PURPLE,
}

interface Props {
  name?: string;
  type?: LabelType;
  color?: LabelColor;
  label: ReactNode;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Label: React.FunctionComponent<Props> = ({
  name,
  type = LabelType.FILL,
  color = LabelColor.NEUTRAL,
  label,
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <Container type={type} color={color}>
      {type === LabelType.CHECKED && (
        <IconContainer>
          <Icon name="circle-check-fill" size={32} color={getColors(color)[0]} />
        </IconContainer>
      )}
      {onChange && typeof label === "string" ? (
        <Input
          name={name}
          type={type}
          color={color}
          value={label}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-label={name ?? "Filter input"}
        />
      ) : (
        label
      )}
    </Container>
  );
};

const getColors = (color: LabelColor): [Color, Color, Color] => {
  switch (color) {
    case LabelColor.NEUTRAL:
      return [Color.NEUTRAL_700, Color.NEUTRAL_300, Color.NEUTRAL_400];
    case LabelColor.SUCCESS:
      return [Color.SUCCESS_700, Color.SUCCESS_100, Color.SUCCESS_400];
    case LabelColor.BROWN:
      return [Color.BROWN_800, Color.BROWN_100, Color.BROWN_300];
    case LabelColor.DANGER:
      return [Color.DANGER_700, Color.DANGER_100, Color.DANGER_400];
    case LabelColor.PURPLE:
      return [Color.PURPLE_700, Color.PURPLE_100, Color.PURPLE_300];
  }
};

const getStyles = (style: LabelType, color: LabelColor): RuleSet => {
  const [primary, secondary, border] = getColors(color);
  return css`
    background-color: ${style == LabelType.CHECKED
      ? "transparent"
      : style === LabelType.FILL
        ? primary
        : secondary};
    border: ${style === LabelType.OUTLINE ? `1px solid ${border}` : "none"};
    color: ${style === LabelType.FILL ? Color.NEUTRAL_00 : primary};
  `;
};

const Container = styled.div<{ type: LabelType; color: LabelColor }>`
  ${(props) => getStyles(props.type, props.color)};
  ${Typography.LABEL_1};
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: min-content;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 4px 6px;
  gap: 2px;
  transition:
    0.3s ease background-color,
    0.3s ease border-color,
    0.3s ease color;
`;

const IconContainer = styled.div`
  width: 28px;
  height: 36px;
  svg {
    margin: 6px 0 0 6px;
  }
`;

const Input = styled.input<{ value: string; type: LabelType; color: LabelColor }>`
  ${Typography.LABEL_1};
  background-color: transparent;
  border: none;
  outline: none;
  width: calc(${(props) => props.value.length * (!isNaN(parseFloat(props.value)) ? 1 : 1.16)}ch);
  ${(props) => getStyles(props.type, props.color)};
  border: none;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
`;
