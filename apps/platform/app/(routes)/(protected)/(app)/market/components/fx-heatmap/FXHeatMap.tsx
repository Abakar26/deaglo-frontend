"use client";

import { type FXMovement as FXMovementData } from "@/app/interface";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MarketCard } from "../common";
import { Segment, SegmentedContentBlock } from "ui/components";
import { FXHeatMapGraph } from "./FXHeatMapGraph";
import { useRouter } from "next/navigation";
import { formatDuration } from "..";

interface Props {
  fxMovement?: FXMovementData;
}

export const FXHeatMap: React.FunctionComponent<Props> = ({ fxMovement }) => {
  return (
    <MarketCard title={fxMovement?.name ?? "FX Movement"} onView={() => {}} loading={!fxMovement}>
      {fxMovement && (
        <>
          <SegmentedContentBlock>
            <Segment label="Timeframe">{formatDuration(fxMovement.durationMonths)}</Segment>
          </SegmentedContentBlock>
          <FXHeatMapGraph data={fxMovement.currencyPairs} />
        </>
      )}
    </MarketCard>
  );
};
