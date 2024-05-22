import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import { Color } from "../../../styles";
import styled from "styled-components";
import { useHover, useInsights } from "../hooks";
import { type TooltipController } from "../hooks/useGraphTooltip";
import { ViolinColor } from ".";

interface Props {
  id: string;
  name: string;
  data: number[];
  binCount: number;
  yScale: d3.ScaleLinear<number, number, never>;
  width: number;
  tooltip: TooltipController;
  fadeout: boolean;
  height: number;
  domain: [number, number];
  color: ViolinColor;
  withInteraction: boolean;
}

export const Violin: React.FunctionComponent<Props> = ({
  id,
  name,
  data,
  binCount,
  yScale,
  width,
  tooltip,
  fadeout,
  height,
  domain,
  color,
  withInteraction,
}) => {
  const [slider, setSlider] = useState<string>();
  const [hovering, setHovering] = useState<boolean>();
  const { mean, q1, q3 } = useInsights(data);

  const binBuilder = d3
    .bin()
    .domain(domain)
    .thresholds(yScale.ticks(binCount))
    .value((d) => d);

  const bins = binBuilder(data);

  const biggestBin = Math.max(...bins.map((b) => b.length));

  const wScale = d3.scaleLinear().domain([-biggestBin, biggestBin]).range([0, width]);

  const areaBuilder = useCallback(
    d3
      .area<d3.Bin<number, number>>()
      .x0((d) => wScale(-d.length))
      .x1((d) => wScale(d.length))
      .y((d) => yScale(d.x0 || 0))
      .curve(d3.curveBumpY),
    [domain, data, yScale]
  );

  const areaPath = areaBuilder(bins);

  const formatter = Intl.NumberFormat("en", { notation: "compact" }).format;

  const updatePosition = useCallback(
    (position: { x: number; y: number }) => {
      tooltip.setPosition(position);
      tooltip.setItems([
        {
          value: formatter(yScale.invert(position.y)),
        },
      ]);
      tooltip.setFooter([
        {
          label:
            yScale.invert(position.y) > q3
              ? "Upper Q3 (75%)"
              : yScale.invert(position.y) < q1
                ? "Lower Q1 (25%)"
                : "Mean",
        },
      ]);
      setSlider(
        d3.line()([
          [wScale(-biggestBin), position.y],
          [wScale(biggestBin), position.y],
        ]) ?? undefined
      );
    },
    [domain, yScale]
  );

  const updateHover = (_hovering: boolean) => {
    tooltip.setVisible(_hovering);
    tooltip.setTitle(name);
    // @ts-ignore
    tooltip.setColor(color);
    !hovering && tooltip.setPosition(undefined);
    setHovering(_hovering);
  };

  const ref = useHover(updatePosition, updateHover, [yScale]);

  return (
    <G ref={ref} height={height} width={width}>
      <defs>
        <clipPath id={id}>
          <path d={areaPath ?? undefined} />
        </clipPath>
      </defs>
      <AreaPath
        id="area"
        d={areaPath ?? undefined}
        opacity={1}
        fill={color}
        fadeout={fadeout}
        strokeWidth={1}
      />
      <path
        d={
          d3.line()([
            [wScale(0), Math.min(yScale(q1), height)],
            [wScale(0), Math.max(yScale(q3), 0)],
          ]) ?? undefined
        }
        stroke={getIndicatorColor(color)}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {slider && hovering && withInteraction && (
        <path d={slider} strokeWidth={1} stroke={Color.NEUTRAL_900} clipPath={`url(#${id})`} />
      )}
      <circle cy={yScale(mean)} cx={wScale(0)} fill={getIndicatorColor(color)} r={5} />
    </G>
  );
};

const getIndicatorColor = (color: ViolinColor): Color => {
  switch (color) {
    case ViolinColor.BRAND_300:
      return Color.BRAND_900;
    case ViolinColor.BROWN_200:
      return Color.BROWN_800;
    case ViolinColor.NEUTRAL_400:
      return Color.NEUTRAL_800;
    case ViolinColor.SUCCESS_200:
      return Color.SUCCESS_700;
  }
};

const G = styled.g`
  cursor: crosshair;
`;

const AreaPath = styled.path<{ fadeout: boolean }>`
  fill-opacity: ${(props) => (props.fadeout ? 0.4 : 1)};
  transition: 0.15s ease fill-opacity;
`;
