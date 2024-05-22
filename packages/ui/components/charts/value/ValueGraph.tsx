import * as d3 from "d3";
import { differenceInHours, format, isSameDay } from "date-fns";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { ChartTooltip, TooltipOrientation } from "../..";
import { type Color } from "../../../styles";
import { DateGraph } from "../common/DateGraph";
import { useExtrema, useGraphContainer } from "../hooks";
import { useGraphTooltip } from "../hooks/useGraphTooltip";
import { ColorDisplay, Legend } from "./Legend";
import { ValueDisplay } from "./ValueDisplay";
import { ValueLine } from "./ValueLine";
import { ValueMarker } from "./ValueMarker";

export type LineData = Array<{ date: Date; value: number }>;
export interface LineColor {
  stroke: Color;
  fill?: Color;
  dashed?: boolean;
  endCap?: boolean;
}

export interface ValueData {
  name: string;
  data: LineData;
  color: LineColor;
}

export interface Marker {
  id: string;
  name: string;
  color: LineColor;
  label: React.ReactNode;
  value: number;
  draggable?: boolean;
}

interface ValueGraphOptions {
  valueMin?: number;
  valueMax?: number;
  xFormatter?: (value: Date) => string;
  yFormatter?: (value: number) => string;
  withTooltip?: boolean;
}

interface Props {
  lines?: Array<ValueData>;
  areas?: Array<ValueData>;
  markers?: Array<Marker>;
  onMarkerChange: (marker: Marker) => void;
  options?: ValueGraphOptions;
  onDragStart: (legId: string) => void;
}

export const ValueGraph: React.FunctionComponent<Props> = ({
  lines = [],
  areas = [],
  options = {},
  markers,
  onMarkerChange,
  onDragStart,
}) => {
  const [hoverDate, setHoverDate] = useState<Date>();
  const [hoverValues, setHoverValues] =
    useState<Array<{ value: number; color: LineColor; name: string }>>();

  const { ref, width, height } = useGraphContainer();
  const tooltip = useGraphTooltip();
  const [dates, values]: [Array<Date>, Array<number>] = useMemo(() => {
    const _data = [...lines.map((line) => line.data), ...areas.map((area) => area.data)].flat();
    return [_data.map(({ date }) => date), _data.map(({ value }) => value)];
  }, [lines, areas]);

  const [dataValueMin, dataValueMax] = useExtrema(values);
  const [valueMin, valueMax] = [options.valueMin ?? dataValueMin, options.valueMax ?? dataValueMax];

  const [dateMin, dateMax] = d3.extent(dates);

  const yScale = d3.scaleLinear().domain([valueMin, valueMax]).range([height, 0]);
  const xScale = d3
    .scaleTime()
    .domain([dateMin ?? new Date(), dateMax ?? new Date()])
    .range([0, width]);

  const _areas = useMemo(
    () =>
      areas.sort(
        (a, b) => Math.max(...b.data.map((d) => d.value)) - Math.max(...a.data.map((d) => d.value))
      ),
    [areas]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = e.clientX - (ref.current?.offsetLeft ?? 0) - 36;
    const date = new Date(xScale.invert(x));
    const closest = dates.reduce((current: Date | undefined, next: Date) => {
      if (current === undefined) {
        return next;
      }
      return Math.abs(differenceInHours(date, next)) < Math.abs(differenceInHours(date, current))
        ? next
        : current;
    }, undefined);
    if (closest) {
      const values = [...lines, ...areas]
        .map(({ data, color, name }) => {
          const value = data.find(({ date }) => isSameDay(date, closest))?.value;
          return value
            ? {
                name,
                color,
                value,
              }
            : undefined;
        })
        .filter((v) => !!v);
      // @ts-expect-error TODO: figure out types here
      setHoverValues(values);
      setHoverDate(closest);
      const y = yScale(Math.max(...values.map((entry) => entry?.value ?? 0))) - 12;
      tooltip.setPosition({ x: xScale(closest) + 36, y });
      tooltip.setItems(
        values.flatMap((entry) => [
          {
            label: entry?.name,
            icon: entry?.color.stroke ? (
              <ColorDisplay color={entry?.color.stroke} type="filled" />
            ) : undefined,
          },
          {
            value: entry?.value,
          },
        ])
      );
      tooltip.setFooter([
        {
          label: format(closest, "MMM d, yyyy"),
        },
      ]);
    }
  };

  const handleMouseEnter = () => {
    tooltip.setOrientation(TooltipOrientation.TOP);
    tooltip.setVisible(true);
  };

  return (
    <Container>
      <Legend items={[...areas, ...lines, ...(markers ?? [])]} />
      <GraphContainer
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => tooltip.setVisible(false)}
      >
        {height > 0 && width > 0 && (
          <DateGraph
            width={width}
            height={height}
            xScale={xScale}
            yScale={yScale}
            xFormatter={options.xFormatter}
            yFormatter={options.yFormatter}
          >
            {_areas.map((area) => (
              <ValueLine key={area.name} {...area} yScale={yScale} xScale={xScale} />
            ))}
            {lines.map((line) => (
              <ValueLine key={line.name} {...line} yScale={yScale} xScale={xScale} />
            ))}
            {markers?.map((marker) => (
              <ValueMarker
                {...marker}
                key={marker.id}
                yScale={yScale}
                xScale={xScale}
                onChange={(value) => onMarkerChange({ ...marker, value })}
                onDragStart={() => onDragStart(marker.id)}
              />
            ))}
            {options.withTooltip && hoverDate && hoverValues && tooltip.visible && (
              <ValueDisplay date={hoverDate} values={hoverValues} xScale={xScale} yScale={yScale} />
            )}
          </DateGraph>
        )}
        {options.withTooltip && <ChartTooltip {...tooltip} />}
      </GraphContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
