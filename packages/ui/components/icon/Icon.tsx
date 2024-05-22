import React from "react";
import { FLAG_NAMES, fillIcons, iconRegistry, type Flag, type IconName, type Logo } from ".";
import { type Color } from "../../styles";

interface Props {
  name: IconName | Flag | Logo;
  color?: Color;
  fill?: Color;
  stroke?: Color;
  size?: number;
  defaultSize?: number;
}

export const DEFAULT_ICON_SIZE = 24;
export const DEFAULT_FLAG_SIZE = 512;
export const Icon: React.FunctionComponent<Props> = ({
  name,
  color,
  fill,
  stroke,
  size = DEFAULT_ICON_SIZE,
  defaultSize,
}) => {
  const isFilled = fillIcons.includes(name);
  const isFlag = FLAG_NAMES.includes(name as Flag);
  const StyledIcon = iconRegistry[name];
  const iconSize = defaultSize ?? isFlag ? DEFAULT_FLAG_SIZE : DEFAULT_ICON_SIZE;

  return StyledIcon ? (
    <StyledIcon
      height={`${size}px`}
      width={`${size}px`}
      viewBox={`${isFlag ? "12 12" : "0 0"} ${iconSize - iconSize / size} ${
        iconSize - iconSize / size
      }`}
      preserveAspectRatio="xMidYMid meet"
      color={color}
      fill={fill}
      stroke={stroke}
      isFilled={isFilled}
      isFlag={FLAG_NAMES.includes(name as Flag)}
    />
  ) : (
    <img src="" alt="" />
  );
};
