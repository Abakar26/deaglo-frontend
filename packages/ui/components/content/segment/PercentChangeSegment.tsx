import React from "react";
import styled from "styled-components";
import { Segment, SegmentedContentSize } from ".";
import { Icon, TickerGraph } from "../..";
import { Color, Typography } from "../../../styles";

interface Props {
  label: string;
  title?: string;
  change: number;
  description?: string;
  size?: SegmentedContentSize;
  data?: Array<number>;
}

function formatPercent(value: number) {
  const options: Intl.NumberFormatOptions = { style: "percent", maximumFractionDigits: 2 };
  return new Intl.NumberFormat("en-US", options).format(value);
}

export const PercentChangeSegment: React.FunctionComponent<Props> = ({
  label,
  title,
  change,
  description,
  size,
  data,
}) => {
  return (
    <Segment label={label} size={size}>
      <Content>
        {title}
        <PercentChange>
          <Icon
            name={change > 0 ? "arrow-up" : "arrow-down"}
            color={change > 0 ? Color.SUCCESS_700 : Color.DANGER_700}
          />
          {formatPercent(change)}
          {data && <TickerGraph data={data} />}
        </PercentChange>
        <Description size={size}>{description}</Description>
      </Content>
    </Segment>
  );
};

const Content = styled.span`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 8px;
`;

const PercentChange = styled.span`
  align-items: center;
  display: flex;
  gap: 2px;
`;

const Description = styled.span<{ size?: SegmentedContentSize }>`
  color: ${Color.NEUTRAL_700};
  ${(props) =>
    props.size === SegmentedContentSize.SMALL ? Typography.LABEL_4 : Typography.BODY_3};
`;
