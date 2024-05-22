"use client";

import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import {
  IconButton,
  PercentChangeSegment,
  SegmentedContentBlock,
  SuspenseBlock,
  TabBar,
  TabBarSize,
  ValueGraph,
  useClickOutside,
} from "ui/components";
import { Color, Shadow, Typography } from "ui/styles";
import { formatAccounting, formatShortDate } from "@/utilities/format";
import { useQueryParams } from "@/app/hooks";

import MOCKS from "./_mocks";
type Data = Awaited<ReturnType<typeof MOCKS.getMarkToMarket>> | undefined;

type MarkToMarketChartProps = {
  anchor: DOMRect;
  tradeId: string;
  onClose: () => void;
};

export function MarkToMarketChart({ anchor, tradeId, onClose }: MarkToMarketChartProps) {
  const { params, update } = useQueryParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data>(undefined);

  const ref = useClickOutside(onClose);

  useEffect(() => {
    setLoading(true);
    MOCKS.getMarkToMarket()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Card $anchor={anchor} ref={ref}>
      <CardHeader>
        <CardTitle>{tradeId} value Mark to Market</CardTitle>

        <CloseButtonContainer>
          <IconButton name="x" size={24} onClick={onClose} />
        </CloseButtonContainer>
      </CardHeader>

      {!loading && data !== undefined ? (
        <SegmentedContentBlock>
          <PercentChangeSegment
            change={data.content.change_percent}
            data={data.content.data}
            label={formatShortDate(data.date)}
            title={`${formatAccounting(data.content.value, 0)} ${data.content.currency} ${
              data.content.change_value > 0 ? "+" : ""
            }${formatAccounting(data.content.change_value, 0)} ${data.content.currency}`}
          />
        </SegmentedContentBlock>
      ) : (
        <SuspenseBlock height="60px" />
      )}

      <div>
        <TabBar
          current={params.get("period") ?? "1M"}
          onChange={(key) => update("period", key)}
          size={TabBarSize.SMALL}
          tabs={[
            { key: "1D", label: "1D" },
            { key: "5D", label: "5D" },
            { key: "1M", label: "1M" },
            { key: "1Y", label: "1Y" },
            { key: "all", label: "All" },
          ]}
        />

        <Chart>
          {!loading && data !== undefined ? (
            <ValueGraph lines={data.chart.lines} areas={data.chart.areas} />
          ) : (
            <SuspenseBlock />
          )}
        </Chart>
      </div>
    </Card>
  );
}

function getPosition(anchor: DOMRect) {
  const top = anchor.top;

  // TODO: Get computed dimensions
  const CONTAINER_HEIGHT = 480;

  const anchorTop = anchor.top > CONTAINER_HEIGHT;
  const translate = anchorTop ? "-100%" : `${anchor.height}px`;

  return css`
    position: absolute;
    right: 0;
    top: ${top}px;
    transform: translateY(${translate});
  `;
}

const Card = styled.article<{ $anchor: DOMRect }>`
  ${Shadow.CARD}
  background-color: ${Color.NEUTRAL_00};
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: 32px;
  padding: 20px;
  width: 450px;
  z-index: 10000000;

  ${(props) => getPosition(props.$anchor)}
`;

const CardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const CardTitle = styled.h3`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  right: -8px;
  top: -8px;
`;

const Chart = styled.div`
  height: 300px;
`;
