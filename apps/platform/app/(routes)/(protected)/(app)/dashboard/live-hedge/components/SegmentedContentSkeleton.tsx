"use client";

import styled from "styled-components";
import { SuspenseBlock } from "ui/components";

type SegmentedContentSkeletonProps = {
  count?: number;
  large?: boolean;
};

export function SegmentedContentSkeleton({ count = 4, large }: SegmentedContentSkeletonProps) {
  const SegmentSkeleton = () => <SuspenseBlock height={large ? "124px" : "72px"} />;

  return (
    <SegmentedContentBlock>
      {Array.from({ length: count }, (_, index) => (
        <SegmentSkeleton key={index} />
      ))}
    </SegmentedContentBlock>
  );
}

const SegmentedContentBlock = styled.div`
  display: flex;
  gap: 4px;
`;
