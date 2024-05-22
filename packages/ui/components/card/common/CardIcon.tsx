import React from "react";
import styled from "styled-components";
import { Icon, type IconName } from "../../../components";
import { Color } from "../../../styles";

export enum CardIconColor {
  SUCCESS_100 = Color.SUCCESS_100,
  BROWN_100 = Color.BROWN_100,
  BRAND_100 = Color.BRAND_100,
  BRAND_300 = Color.BRAND_300,
  SUCCESS_200 = Color.SUCCESS_200,
  NEUTRAL_300 = Color.NEUTRAL_300,
}

interface Props {
  icon?: IconName;
  color?: CardIconColor;
}

export const CardIcon: React.FunctionComponent<Props> = ({
  icon = "info",
  color = CardIconColor.NEUTRAL_300,
}) => {
  return (
    <Container color={color}>
      <Icon name={icon} color={getIconColor(color)} size={20} />
    </Container>
  );
};

const getIconColor = (color: CardIconColor): Color => {
  switch (color) {
    case CardIconColor.SUCCESS_100:
      return Color.SUCCESS_700;
    case CardIconColor.BROWN_100:
      return Color.BROWN_800;
    case CardIconColor.BRAND_100:
      return Color.BRAND_800;
    case CardIconColor.BRAND_300:
      return Color.BRAND_800;
    case CardIconColor.SUCCESS_200:
      return Color.SUCCESS_700;
    case CardIconColor.NEUTRAL_300:
      return Color.NEUTRAL_900;
  }
};

const Container = styled.div<{ color: CardIconColor }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  transition: 0.15s ease background-color;
`;
