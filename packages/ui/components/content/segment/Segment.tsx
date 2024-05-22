import React, { type PropsWithChildren } from "react";
import styled, { type RuleSet } from "styled-components";
import { SegmentedContentSize } from ".";
import { Color, Typography } from "../../../styles";

interface Props {
  label?: string;
  size?: SegmentedContentSize;
}

export const Segment: React.FunctionComponent<Props & PropsWithChildren> = ({
  label,
  size = SegmentedContentSize.SMALL,
  children,
}) => {
  return (
    <Container $size={size}>
      {label}
      <Content $size={size}>{children}</Content>
    </Container>
  );
};

const getPadding = (size: SegmentedContentSize) => {
  switch (size) {
    case SegmentedContentSize.SMALL:
      return "8px 12px";
    case SegmentedContentSize.MEDIUM:
      return "12px 16px";
    case SegmentedContentSize.LARGE:
      return "24px 16px";
  }
};

const getLabel = (size: SegmentedContentSize): RuleSet => {
  switch (size) {
    case SegmentedContentSize.SMALL:
      return Typography.LABEL_4;
    default:
      return Typography.BODY_3;
  }
};

const getBody = (size: SegmentedContentSize): RuleSet => {
  switch (size) {
    case SegmentedContentSize.SMALL:
      return Typography.BODY_2;
    case SegmentedContentSize.MEDIUM:
      return Typography.SUBHEAD_3;
    case SegmentedContentSize.LARGE:
      return Typography.HEADER_2;
  }
};

const Container = styled.div<{ $size: SegmentedContentSize }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: ${(props) => (props.$size === SegmentedContentSize.LARGE ? "124px" : undefined)};
  padding: ${(props) => getPadding(props.$size)};
  ${(props) => getLabel(props.$size)};
  color: ${Color.NEUTRAL_700};
  overflow: hidden;
`;

const Content = styled.div<{ $size: SegmentedContentSize }>`
  display: block;
  width: 100%;
  height: 100%;
  color: ${Color.NEUTRAL_900};
  ${(props) => getBody(props.$size)};
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
`;
