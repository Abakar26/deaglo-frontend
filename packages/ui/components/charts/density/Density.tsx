import React, { useCallback, useMemo, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { useHover, useInsights } from "../hooks";
import { Color } from "../../../styles";
import { TooltipController } from "../hooks/useGraphTooltip";
import { TooltipOrientation } from "../..";

interface Props {
  id: string;
  data: number[];
  binCount: number;
  index: number;
  yScale: d3.ScaleLinear<number, number, never>;
  xScale: d3.ScaleLinear<number, number, never>;
  width: number;
  height: number;
  side: "left" | "right";
  fadeout: boolean;
  tooltip: TooltipController;
  name: string;
  domain: [number, number];
  withInteraction: boolean;
}

const RIGHT_COLORS = [Color.SUCCESS_300, Color.SUCCESS_200, Color.SUCCESS_100];

export const Density: React.FunctionComponent<Props> = ({
  id,
  data,
  binCount,
  yScale,
  xScale,
  width,
  height,
  index,
  side,
  fadeout,
  tooltip,
  name,
  domain,
  withInteraction,
}) => {
  const left = side === "left";
  const [slider, setSlider] = useState<string>();
  const [hovering, setHovering] = useState<boolean>();
  const { min, max, mean, q1, q3 } = useInsights(data);

  const binBuilder = d3
    .bin()
    .domain(domain)
    .thresholds(yScale.ticks(binCount))
    .value((d) => d);

  const bins = binBuilder(data);
  const domainMax = xScale.domain()[1] ?? 0;

  const lineGenerator = useCallback(
    d3
      .area<d3.Bin<number, number>>()
      .x0((d) => xScale(left ? domainMax : d.length))
      .x1((d) => xScale(left ? domainMax - d.length : 0))
      .y((d) => yScale(d.x0 || 0))
      .curve(d3.curveBasisOpen),
    [yScale, domain]
  );

  const linePath = lineGenerator(bins);

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
          [xScale(0), position.y],
          [xScale(domainMax), position.y],
        ]) ?? undefined
      );
    },
    [yScale]
  );

  const updateHover = (_hovering: boolean) => {
    tooltip.setVisible(_hovering);
    tooltip.setTitle(name);
    tooltip.setOrientation(left ? TooltipOrientation.LEFT : TooltipOrientation.RIGHT);
    // @ts-ignore
    tooltip.setColor(left ? Color.NEUTRAL_400 : RIGHT_COLORS.at(index % 3));
    !hovering && tooltip.setPosition(undefined);
    setHovering(_hovering);
  };

  const ref = useHover(updatePosition, updateHover, [yScale]);

  const quantiles = useMemo(
    () =>
      d3.line()([
        [xScale(left ? domainMax : 0) + (left ? -16 : 16), Math.min(yScale(q1), height)],
        [xScale(left ? domainMax : 0) + (left ? -16 : 16), Math.max(yScale(q3), 0)],
      ]) ?? undefined,
    [yScale, domain]
  );

  return (
    <G ref={ref} height={height} width={width}>
      <defs>
        <clipPath id={id}>
          <path d={linePath ?? undefined} />
        </clipPath>
      </defs>
      <AreaPath
        fadeout={fadeout}
        d={linePath ?? undefined}
        opacity={1}
        fill={left ? Color.NEUTRAL_400 : RIGHT_COLORS.at(index % 3)}
        fillOpacity={1}
        strokeWidth={1}
      />
      <path
        d={quantiles}
        stroke={left ? Color.NEUTRAL_700 : Color.SUCCESS_700}
        strokeWidth={2}
        strokeLinecap="round"
      />
      {slider && hovering && withInteraction && (
        <path d={slider} strokeWidth={1} stroke={Color.NEUTRAL_900} clipPath={`url(#${id})`} />
      )}
      <circle
        cy={yScale(mean)}
        cx={xScale(left ? domainMax : 0) + (left ? -16 : 16)}
        fill={left ? Color.NEUTRAL_700 : Color.SUCCESS_700}
        r={5}
      />
    </G>
  );
};

const G = styled.g`
  cursor: crosshair;
`;

const AreaPath = styled.path<{ fadeout: boolean }>`
  fill-opacity: ${(props) => (props.fadeout ? 0.4 : 1)};
  transition: 0.15s ease fill-opacity;
`;
