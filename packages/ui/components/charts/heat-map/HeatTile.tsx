import * as d3 from "d3";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Color } from "../../../styles";
import { HEAT_COLORS } from ".";
import { TooltipController } from "../hooks/useGraphTooltip";
import { useHover } from "../hooks";
import { PercentChange, TooltipOrientation } from "../..";
import { format } from "date-fns";

interface Props {
  group: string;
  entry: string;
  value: number;
  xScale: d3.ScaleBand<string>;
  yScale: d3.ScaleBand<string>;
  width: number;
  height: number;
  heatIndex: number;
  tooltip: TooltipController;
}

export const HeatTile: React.FunctionComponent<Props> = ({
  group,
  value,
  entry,
  xScale,
  yScale,
  width,
  height,
  heatIndex,
  tooltip,
}) => {
  const [bandWidth, setBandWidth] = useState<number>(0);
  const [bandHeight, setBandHeight] = useState<number>(0);

  useEffect(() => {
    setBandWidth(xScale.bandwidth());
    setBandHeight(yScale.bandwidth());
  }, [width, height]);

  const updateHover = (hovering: boolean) => {
    const x = xScale(entry);
    const y = yScale(group);
    if (x !== undefined && y !== undefined && hovering) {
      tooltip.setVisible(true);
      tooltip.setPosition({
        x: x + 64 + bandWidth,
        y: y + 28 - bandHeight / 2,
      });
      tooltip.setTitle(group);
      tooltip.setColor(HEAT_COLORS.at(heatIndex));
      tooltip.setOrientation(TooltipOrientation.TOP);
      tooltip.setItems([
        {
          label: "from previous month",
          icon: <PercentChange change={value} direction={value < 0 ? "negative" : "positive"} />,
        },
      ]);
      tooltip.setFooter([
        {
          label: format(new Date(entry), "MMMM yyyy"),
        },
      ]);
    } else {
      tooltip.setVisible(false);
      tooltip.setPosition({ x: 0, y: 0 });
    }
  };

  const ref = useHover<SVGRectElement>(() => {}, updateHover, [yScale]);

  return (
    <Tile
      ref={ref}
      width={bandWidth}
      height={bandHeight}
      fill={HEAT_COLORS.at(heatIndex)}
      stroke={Color.NEUTRAL_00}
      strokeWidth={4}
      rx={4}
      ry={4}
      transform={`translate(${xScale(entry)},${yScale(group)})`}
    />
  );
};

const Tile = styled.rect<{ width: number }>`
  cursor: crosshair;
  max-width: ${(props) => props.width}px;
`;
