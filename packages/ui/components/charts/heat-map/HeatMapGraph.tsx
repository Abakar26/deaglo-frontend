import * as d3 from "d3";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useExtrema, useGraphContainer } from "../hooks";
import { DoubleDiscreteGraph } from "../common/DoubleDiscreteGraph";
import { HeatTile } from "./HeatTile";
import { HEAT_COLORS, HeatEntry } from ".";
import { HeatLegend } from "./HeatLegend";
import { Color, Typography } from "../../../styles";
import { ChartTooltip, Icon } from "../..";
import { useGraphTooltip } from "../hooks/useGraphTooltip";

interface Props {
  heats: Array<HeatEntry>;
}

export const HeatMapGraph: React.FunctionComponent<Props> = ({ heats }) => {
  const { width, height, ref } = useGraphContainer({ showXAxis: true, showYAxis: false });
  const tooltip = useGraphTooltip();
  const [heatMin, heatMax] = useExtrema(heats.map(({ value }) => value));

  const normalize = (value: number): number => {
    const delta = 2 * Math.max(Math.abs(heatMax), Math.abs(heatMin));
    return Math.floor(((value + delta / 2) / delta) * (HEAT_COLORS.length - 1));
  };

  const entries = new Set(heats.map(({ entry }) => entry));
  const xScale = d3.scaleBand().domain(Array.from(entries)).range([0, width]);

  const groups = new Set(heats.map(({ group }) => group));
  const yScale = d3.scaleBand().domain(Array.from(groups).reverse()).range([height, 0]);

  return (
    <Container>
      <Row>
        <HeatLegend
          min={`-${Math.max(Math.abs(heatMax), Math.abs(heatMin)).toFixed(2)}%`}
          max={`${Math.max(Math.abs(heatMax), Math.abs(heatMin)).toFixed(2)}%`}
        />
      </Row>
      <Content>
        <Column>
          {Array.from(groups).map((group) => (
            <GroupLabel key={group}>
              {group.split(",").at(0)}
              <Icon name="arrow-right" size={16} color={Color.NEUTRAL_900} />
              {group.split(",").at(1)}
            </GroupLabel>
          ))}
        </Column>
        <GraphContainer ref={ref}>
          <DoubleDiscreteGraph
            width={width}
            height={height}
            xScale={xScale}
            yScale={yScale}
            xTickStyle={`${Typography.LABEL_5};color: ${Color.NEUTRAL_700};`}
          >
            {heats.map((heat) => {
              return (
                <HeatTile
                  key={`${heat.group}:${heat.entry}`}
                  {...heat}
                  xScale={xScale}
                  yScale={yScale}
                  width={width}
                  height={height}
                  heatIndex={normalize(heat.value)}
                  tooltip={tooltip}
                />
              );
            })}
          </DoubleDiscreteGraph>
          <ChartTooltip {...tooltip} />
        </GraphContainer>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const GraphContainer = styled.div`
  width: calc(100% - 100px);
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const Content = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: calc(100% - 32px);
  width: 100px;
  padding: 0px 12px;
`;

const GroupLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${Typography.LABEL_3};
  color: ${Color.NEUTRAL_900};
`;
