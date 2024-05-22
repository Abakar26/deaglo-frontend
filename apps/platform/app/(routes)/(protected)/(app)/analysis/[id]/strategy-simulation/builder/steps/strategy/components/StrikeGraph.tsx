"use client";

import type { HistoricalSpot } from "@/app/interface";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import type { BarrierType, Leg, Marker } from "ui/components";
import { ValueGraph } from "ui/components";
import { Color } from "ui/styles";
import { useStrategyBuilderStore } from "../../../store";
import { BarrierLabel } from "./BarrierLabel";
import { StrikeLabel } from "./StrikeLabel";

interface Props {
  legs: Array<Leg>;
  onChange: (leg: Leg, index: string) => void;
  spotHistoryData: HistoricalSpot;
  onDragStart: (legId: string) => void;
}

const MARKER_COLORS: Array<Color> = [
  Color.PURPLE_700,
  Color.ROSE_700,
  Color.TEAL_700,
  Color.BROWN_800,
];

export const StrikeGraph: React.FunctionComponent<Props> = ({
  legs,
  onChange,
  spotHistoryData,
  onDragStart = (_) => null,
}) => {
  const [forwardRate, setForwardRate] = useState(0);
  const liveSpot = spotHistoryData.at(0)?.rate;

  const { market } = useStrategyBuilderStore();

  useEffect(() => {
    if (!market?.fwd) return;
    setForwardRate(market.fwd);
  }, [market?.fwd]);

  const markers: Array<Marker> = legs.flatMap((leg, index) => {
    const isForward = leg.option === "Forward";
    if (isForward) leg.strike = forwardRate;

    const strikeMarker: Marker = {
      id: leg.id!,
      label: <StrikeLabel leg={leg} index={index} />,
      value:
        (leg.option === "Call" ? 1 - (leg.strike ?? 0) / 100 : 1 + (leg.strike ?? 0) / 100) *
        (liveSpot ?? 0),
      name: `Leg ${index + 1} - ${leg.option} (${leg.action})`,
      color: {
        stroke: MARKER_COLORS.at(index % MARKER_COLORS.length)!,
        dashed: false,
      },
      draggable: !isForward,
    };
    const barrierMarker: Marker = {
      id: leg.id!,
      label: <BarrierLabel leg={leg} index={index} />,
      value:
        (leg.option === "Call"
          ? 1 - (leg.barrierLevel ?? 0) / 100
          : 1 + (leg.barrierLevel ?? 0) / 100) * (liveSpot ?? 0),
      name: `Leg ${index + 1} - ${leg.barrierType ? getBarrierName(leg.barrierType) : ""} Barrier`,
      color: {
        stroke: MARKER_COLORS.at(index % MARKER_COLORS.length)!,
        dashed: true,
      },
    };
    return leg.barrierType ?? false ? [strikeMarker, barrierMarker] : [strikeMarker];
  });

  const spotMin = useMemo(
    () => Math.min(...spotHistoryData.map(({ rate }) => rate)),
    [spotHistoryData]
  );
  const spotMax = useMemo(
    () => Math.max(...spotHistoryData.map(({ rate }) => rate)),
    [spotHistoryData]
  );
  const markerMin = useMemo(() => Math.min(...markers.map(({ value }) => value)), [markers]);
  const markerMax = useMemo(() => Math.max(...markers.map(({ value }) => value)), [markers]);

  const onMarkerChange = ({ id, value, color }: Marker) => {
    const leg = legs.find((leg) => leg.id === id)!;
    const _value = Math.round(value * 1000) / 1000;
    const strike = (_value / (liveSpot ?? 0) - 1) * 100;
    if (color.dashed) {
      onChange(
        {
          ...leg,
          barrierLevel: (_value / (liveSpot ?? 0) - 1) * 100,
        },
        id
      );
    } else {
      onChange(
        {
          ...leg,
          strike: leg.option === "Put" ? strike : -strike,
        },
        id
      );
    }
  };

  return (
    <GraphContainer>
      <ValueGraph
        lines={[
          {
            name: "Spot",
            data: spotHistoryData.map(({ rate, date }) => ({ date: new Date(date), value: rate })),
            color: {
              stroke: Color.NEUTRAL_500,
            },
          },
        ]}
        areas={[]}
        markers={markers}
        onMarkerChange={onMarkerChange}
        // TODO: Scale based on volatility?
        options={{
          valueMin: Math.min(markerMin, spotMin * 0.9),
          valueMax: Math.max(markerMax, spotMax * 1.1),
        }}
        onDragStart={onDragStart}
      />
    </GraphContainer>
  );
};

export const getBarrierName = (type: BarrierType) => {
  switch (type) {
    case "down-in":
      return "Down In";
    case "down-out":
      return "Down Out";
    case "up-in":
      return "Up In";
    case "up-out":
      return "Up Out";
  }
};

const GraphContainer = styled.div`
  height: 452px;
  width: 100%;
  padding: 20px;
  border: 1px solid ${Color.NEUTRAL_400};
  border-radius: 8px;
`;
