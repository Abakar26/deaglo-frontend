"use client";
import { type SimulationEnvironment } from "@/app/interface";
import React from "react";
import { Segment, SegmentedContentBlock } from "ui/components";

interface Props {
  environment: SimulationEnvironment;
}

export const OverviewEnvironment: React.FunctionComponent<Props> = ({ environment }) => {
  return (
    <>
      <SegmentedContentBlock separated={true}>
        <Segment label="Volatility model">GBM</Segment>
        <Segment label="Historical volatility">
          {(environment.volatility * 100).toFixed(2)}%
        </Segment>
        <Segment label="Skew">{environment.skew}</Segment>
        <Segment label="Appreciation / Depreciation">
          {(environment.appreciationPercent * 100).toFixed(2)}%
        </Segment>
      </SegmentedContentBlock>
    </>
  );
};
