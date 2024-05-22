"use client";

import { type HistoricalSpot } from "@/app/interface";
import { format } from "date-fns";
import React from "react";
import styled from "styled-components";
import { ValueGraph } from "ui/components";
import { useExtrema } from "ui/components/charts/hooks";
import { Color } from "ui/styles";

interface Props {
  spot: HistoricalSpot;
  hedge: HistoricalSpot;
  volatility: number;
}

export const SpotHistoryGraph: React.FunctionComponent<Props> = ({ spot, hedge, volatility }) => {
  const [min, max] = useExtrema(spot.map(({ rate }) => rate));

  return (
    <Container>
      <ValueGraph
        onMarkerChange={() => null}
        onDragStart={() => null}
        lines={[
          {
            name: "Spot Rate",
            data: spot.map(({ rate, date }) => ({ value: rate, date: new Date(date) })),
            color: {
              stroke: Color.NEUTRAL_500,
            },
          },
          // {
          //   name: "Layered Hedging Strategy",
          //   data: hedge.map(({ rate, date }) => ({ value: rate, date: new Date(date) })),
          //   color: {
          //     stroke: Color.BRAND_800,
          //     endCap: true,
          //   },
          // },
        ]}
        // Pad scales by 2 std dev
        options={{
          valueMin: min - 2 * volatility,
          valueMax: max + 2 * volatility,
          xFormatter: (value: Date) => format(value, "MMM yyyy"),
          withTooltip: true,
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 312px;
`;
