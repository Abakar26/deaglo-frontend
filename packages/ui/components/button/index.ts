import type { RuleSet } from "styled-components";
import { Typography } from "../../styles";

export * from "./Button";
export * from "./FAButton";
export * from "./IconButton";
export * from "./InsertArea";
export * from "./Menu";
export * from "./SegmentedButton";
export * from "./SmallButton";

export enum ButtonSize {
  SMALL,
  MEDIUM,
  LARGE,
}

export const getTypography = (size: ButtonSize): RuleSet => {
  switch (size) {
    case ButtonSize.SMALL:
      return Typography.LABEL_2;
    case ButtonSize.MEDIUM:
      return Typography.SUBHEAD_2;
    case ButtonSize.LARGE:
      return Typography.SUBHEAD_1;
  }
};

export const getIconSize = (size: ButtonSize): number => {
  switch (size) {
    case ButtonSize.SMALL:
      return 16;
    case ButtonSize.MEDIUM:
      return 20;
    case ButtonSize.LARGE:
      return 24;
  }
};
