import { type Selectable } from "ui/components";
import { Color } from "ui/styles";

export enum MenuKey {
  SHARE = "SHARE",
  EXECUTE = "EXECUTE",
  RENAME = "RENAME",
  DUPLICATE = "DUPLICATE",
  PIN = "PIN",
  DELETE = "DELETE",
}

export const MenuOptions: Record<MenuKey, Selectable> = {
  SHARE: {
    key: MenuKey.SHARE,
    value: "Share",
    icon: "share",
  },
  EXECUTE: {
    key: MenuKey.EXECUTE,
    value: "Execute",
    icon: "doc",
  },
  RENAME: {
    key: MenuKey.RENAME,
    value: "Rename",
    icon: "pencil",
  },
  DUPLICATE: {
    key: MenuKey.DUPLICATE,
    value: "Duplicate",
    icon: "copy",
  },
  PIN: {
    key: MenuKey.PIN,
    value: "Pin Simulation",
    icon: "pin",
  },
  DELETE: {
    key: MenuKey.DELETE,
    value: "Delete",
    icon: "trash",
    color: Color.DANGER_700,
  },
};
