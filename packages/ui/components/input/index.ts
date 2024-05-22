import type { Flag, IconName } from "..";
import type { Color } from "../../styles";

export * from "./text";
export * from "./search";
export * from "./date";
export * from "./dropdown";
export * from "./option";

export interface Selectable<T extends string = string> {
  key: T;
  value: string;
  icon?: IconName;
  flag?: Flag;
  color?: Color;
  disabled?: boolean;
}
