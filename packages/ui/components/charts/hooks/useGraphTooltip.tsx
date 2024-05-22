import { type TooltipItemProps } from "components/tooltip/chart/ChartTooltipItem";
import { type ReactNode, useState } from "react";
import { type Color } from "../../../styles";
import { ColorDisplay } from "../value/Legend";
import { ViolinColor } from "..";
import { TooltipOrientation } from "../..";

export interface TooltipController {
  position?: { x: number; y: number };
  visible: boolean;
  title: string;
  titleIcon: ReactNode;
  items?: Array<TooltipItemProps>;
  footer?: Array<TooltipItemProps>;
  orientation: TooltipOrientation;
  setPosition: (position?: { x: number; y: number }) => void;
  setOrientation: (orientation: TooltipOrientation) => void;
  setVisible: (visible: boolean) => void;
  setTitle: (title: string) => void;
  setItems: (items?: Array<TooltipItemProps>) => void;
  setFooter: (footer?: Array<TooltipItemProps>) => void;
  setColor: (color?: Color) => void;
}

export const useGraphTooltip = (): TooltipController => {
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const [orientation, setOrientation] = useState<TooltipOrientation>(TooltipOrientation.RIGHT);
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [items, setItems] = useState<Array<TooltipItemProps>>();
  const [footer, setFooter] = useState<Array<TooltipItemProps>>();
  const [color, setColor] = useState<Color>();

  return {
    position,
    orientation,
    visible,
    title,
    titleIcon: color ? <ColorDisplay color={color} type="filled" /> : undefined,
    items,
    footer,
    setOrientation,
    setPosition,
    setVisible,
    setTitle,
    setItems,
    setFooter,
    setColor,
  };
};
