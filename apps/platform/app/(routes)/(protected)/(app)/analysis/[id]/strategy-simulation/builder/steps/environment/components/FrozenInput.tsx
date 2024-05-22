"use client";

import React from "react";
import styled from "styled-components";
import {
  Segment,
  SegmentedContentBlock,
  SegmentedContentSize,
  Tooltip,
  type TooltipProps,
} from "ui/components";

interface Props {
  label: string;
  value: string | number;
  tooltip: TooltipProps;
}

export const FrozenInput: React.FunctionComponent<Props> = ({ label, value, tooltip }) => {
  return (
    <Container>
      <TooltipContainer>
        <Tooltip {...tooltip} />
      </TooltipContainer>
      <SegmentedContentBlock>
        <Segment label={label}>{value}</Segment>
      </SegmentedContentBlock>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 12px;
  width: 100%;
`;

const TooltipContainer = styled.div`
  position: absolute;
  top: -32px;
  left: 0px;
`;
