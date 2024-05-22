"use client";

import React from "react";
import styled from "styled-components";
import {
  Segment,
  SegmentedContentBlock,
  SegmentedContentSize,
  SmallButton,
  Tooltip,
  type TooltipProps,
} from "ui/components";
import { Color } from "ui/styles";

interface Props {
  name: string;
  segments: Array<{ label: string; value: string | number }>;
  tooltip?: TooltipProps;
  onEdit?: () => void;
}

export const Summary: React.FunctionComponent<Props> = ({ name, segments, tooltip, onEdit }) => {
  return (
    <Container>
      <Row justify={!!onEdit ? "space-between" : "start"}>
        {name}
        {tooltip && <Tooltip {...tooltip} />}
        {onEdit && <SmallButton onClick={onEdit} label="Edit" leadingIcon="pencil" />}
      </Row>
      <SegmentedContentBlock separated size={SegmentedContentSize.MEDIUM} equalized>
        {segments.map(({ label, value }) => {
          return (
            <Segment label={label} key={label}>
              {value}
            </Segment>
          );
        })}
      </SegmentedContentBlock>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div<{ justify: "space-between" | "start" }>`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  justify-content: ${(props) => props.justify};
`;
