"use client";

import React from "react";
import { AnalysisGrid } from ".";
import { SuspenseBlock } from "ui/components";

interface Props {
  count: number;
}

export const AnalysisLoader: React.FunctionComponent<Props> = ({ count }) => {
  return (
    <AnalysisGrid>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <SuspenseBlock key={index} height="270px" />
        ))}
    </AnalysisGrid>
  );
};
