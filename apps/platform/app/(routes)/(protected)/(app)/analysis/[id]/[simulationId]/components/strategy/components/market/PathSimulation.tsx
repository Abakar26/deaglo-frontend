"use client";

import type { HistoricalSpot } from "@/app/interface";
import { differenceInMinutes, eachMinuteOfInterval } from "date-fns";
import React, { useMemo } from "react";
import styled from "styled-components";
import { PATH_SIMULATION_COLORS, PathSimulationGraph } from "ui/components";
import { Color } from "ui/styles";

interface Props {
  startDate: Date;
  endDate: Date;
  paths: Array<Array<number>>;
  spotHistory: HistoricalSpot;
}

export const PathSimulation: React.FunctionComponent<Props> = ({
  startDate,
  endDate,
  paths,
  spotHistory,
}) => {
  const simulatedPaths = useMemo(() => {
    const stepSize = differenceInMinutes(endDate, startDate) / (paths.at(0)?.length ?? 1);
    const dates = eachMinuteOfInterval({ start: startDate, end: endDate }, { step: stepSize });
    return paths.map((path, index) => ({
      data: path.map((value, index) => ({ date: dates.at(index) ?? new Date(), value })),
      color: PATH_SIMULATION_COLORS[index % PATH_SIMULATION_COLORS.length] ?? Color.BRAND_800,
    }));
  }, [startDate, endDate, paths]);

  return (
    <Container>
      <PathSimulationGraph
        spot={spotHistory.map(({ rate, date }) => ({ value: rate, date: new Date(date) }))}
        simulations={simulatedPaths}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 400px;
`;
