import React from "react";
import styled from "styled-components";
import { Icon, type IconName } from "../..";
import { Color } from "../../../styles";

export enum ContentIconColor {
  NEUTRAL_00 = Color.NEUTRAL_00,
  BRAND_100 = Color.BRAND_100,
  BROWN_100 = Color.BROWN_100,
  DANGER_100 = Color.DANGER_100,
  SUCCESS_100 = Color.SUCCESS_100,
}

export interface ContentIconProps {
  icon: IconName;
  color?: ContentIconColor;
}

export const ContentIcon: React.FunctionComponent<ContentIconProps> = ({
  icon,
  color = ContentIconColor.NEUTRAL_00,
}) => {
  return (
    <Container color={color}>
      <Icon name={icon} color={getIconColor(color)} />
    </Container>
  );
};

const getIconColor = (color: ContentIconColor): Color => {
  switch (color) {
    case ContentIconColor.BROWN_100:
      return Color.BROWN_800;
    case ContentIconColor.DANGER_100:
      return Color.DANGER_700;
    case ContentIconColor.SUCCESS_100:
      return Color.SUCCESS_700;
    default:
      return Color.BRAND_800;
  }
};

const getBorderColor = (color: ContentIconColor): Color => {
  switch (color) {
    case ContentIconColor.NEUTRAL_00:
      return Color.NEUTRAL_400;
    case ContentIconColor.BRAND_100:
      return Color.BRAND_300;
    case ContentIconColor.BROWN_100:
      return Color.BROWN_300;
    case ContentIconColor.DANGER_100:
      return Color.DANGER_400;
    case ContentIconColor.SUCCESS_100:
      return Color.SUCCESS_400;
  }
};

const Container = styled.div<{ color: ContentIconColor }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  min-height: 48px;
  width: 48px;
  min-width: 48px;
  border-radius: 8px;
  border: 1px solid ${(props) => getBorderColor(props.color)};
  background-color: ${(props) => props.color};
`;
