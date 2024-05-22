import * as d3 from "d3";
import React, { useMemo } from "react";
import styled from "styled-components";
import { gaussian } from ".";
import { TooltipOrientation } from "../..";
import { Color } from "../../../styles";
import { useHover, usePointGenerator } from "../hooks";
import type { TooltipController } from "../hooks/useGraphTooltip";

interface Props {
  xScale: d3.ScaleLinear<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  mean: number;
  target: number;
  stdDev: number;
  width: number;
  tooltip: TooltipController;
}

export const FWDEfficiencyGaussian: React.FunctionComponent<Props> = ({
  xScale,
  yScale,
  mean,
  target,
  stdDev,
  width,
  tooltip,
}) => {
  const { left, right } = useMemo(() => {
    const gaussianPoints = usePointGenerator(width, (x: number) => gaussian(x, mean, stdDev));
    const left: Array<[number, number]> = gaussianPoints(xScale.domain()[0] ?? 0, target + 1);
    const right: Array<[number, number]> = gaussianPoints(target, xScale.domain()[1] ?? 0);
    return { left, right };
  }, [mean, stdDev, width, target]);

  const lineBuilder = d3
    .line<[number, number]>()
    .x(([x]) => xScale(x))
    .y(([_, y]) => yScale(y))
    .curve(d3.curveNatural);

  const areaBuilder = d3
    .area<[number, number]>()
    .x0(([x]) => xScale(x))
    .y0(([_, y]) => yScale(0))
    .x1(([x]) => xScale(x))
    .y1(([_, y]) => yScale(y))
    .curve(d3.curveNatural);

  const leftArea = areaBuilder(left) ?? undefined;
  const rightArea = areaBuilder(right) ?? undefined;

  const updateHover = (hovering: boolean) => {
    tooltip.setVisible(hovering);
    tooltip.setTitle("Spot Rate");
    tooltip.setOrientation(TooltipOrientation.TOP);
  };

  const updatePosition = ({ x, y }: { x: number; y: number }) => {
    tooltip.setPosition({
      x: x + 36,
      y: yScale(gaussian(xScale.invert(x - 18), mean, stdDev)),
    });
    tooltip.setColor(xScale.invert(x - 18) < target ? Color.DANGER_400 : Color.BRAND_400);
    tooltip.setItems([
      {
        value: xScale.invert(x - 18).toFixed(3),
        label: "spot rate",
      },
      {
        value: `${(gaussian(xScale.invert(x - 18), mean, stdDev) * (100 * stdDev)).toFixed(2)}%`,
        label: "probability",
      },
    ]);
    tooltip.setFooter([
      {
        label: `Spot Rate: ${mean.toFixed(3)}`,
      },
      {
        label: `Forward Rate: ${target.toFixed(3)}`,
      },
    ]);
  };

  const ref = useHover<SVGGElement>(updatePosition, updateHover, [yScale, xScale]);

  const targetLine =
    d3.line()([
      [xScale(target), yScale(0)],
      [xScale(target), yScale(gaussian(target, mean, stdDev))],
    ]) ?? undefined;

  return (
    <G ref={ref}>
      <path d={leftArea} fill={Color.DANGER_400} />
      <path d={rightArea} fill={Color.BRAND_400} />
      <path d={targetLine} stroke={Color.NEUTRAL_900} strokeWidth={1.5} strokeDasharray={"2,2"} />
    </G>
  );
};

const G = styled.g`
  cursor: crosshair;
`;
