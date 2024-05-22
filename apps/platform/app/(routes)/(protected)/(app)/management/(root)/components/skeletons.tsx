"use client";

import styled from "styled-components";
import { SuspenseBlock } from "ui/components";

const SegmentedContentBlockSkeleton = styled.div`
  display: flex;
  gap: 4px;
`;

export function GeneralDashBoardSegmentsSkeleton() {
  const SegmentSkeleton = () => <SuspenseBlock height="124px" />;

  return (
    <SegmentedContentBlockSkeleton>
      <SegmentSkeleton />
      <SegmentSkeleton />
      <SegmentSkeleton />
      <SegmentSkeleton />
      <SegmentSkeleton />
      <SegmentSkeleton />
    </SegmentedContentBlockSkeleton>
  );
}

export function MarkToMarketSegmentsSkeleton() {
  const SegmentSkeleton = () => <SuspenseBlock height="72px" />;

  return (
    <SegmentedContentBlockSkeleton>
      <SegmentSkeleton />
      <SegmentSkeleton />
      <SegmentSkeleton />
      <SegmentSkeleton />
      <SegmentSkeleton />
      <SegmentSkeleton />
    </SegmentedContentBlockSkeleton>
  );
}

export function ContentBlockSkeleton() {
  return <SuspenseBlock height="60px" />;
}
