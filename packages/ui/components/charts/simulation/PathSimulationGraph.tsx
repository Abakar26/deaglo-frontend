import * as d3 from "d3";
import { format } from "date-fns";
import React, { useMemo } from "react";
import styled from "styled-components";
import { DateGraph, type LineData } from "..";
import { Color, Typography } from "../../../styles";
import { useExtrema, useGraphContainer } from "../hooks";
import { SimulationDivider } from "./SimulationDivider";
import { SimulationPath } from "./SimulationPath";

interface Simulation {
  data: LineData;
  color: Color;
}

interface Props {
  spot: LineData;
  simulations: Array<Simulation>;
}

export const PATH_SIMULATION_COLORS = [
  Color.NEUTRAL_500,
  Color.TEAL_700,
  Color.BROWN_800,
  Color.NEUTRAL_900,
  Color.BRAND_800,
  Color.PURPLE_700,
  Color.DANGER_700,
  Color.ROSE_700,
  Color.NEUTRAL_700,
  Color.SUCCESS_700,
  Color.CHART_1,
];

export const PathSimulationGraph: React.FunctionComponent<Props> = ({ spot, simulations }) => {
  const { ref, width, height } = useGraphContainer();

  const [dates, values] = useMemo(() => {
    const _data = [spot, ...simulations.map(({ data }) => data)].flat();
    return [_data.map(({ date }) => date), _data.map(({ value }) => value)];
  }, [spot, simulations]);

  const [dateMin, dateMax] = d3.extent(dates);
  const [valueMin, valueMax] = useExtrema(values);
  const yScale = d3.scaleLinear().domain([valueMin, valueMax]).range([height, 0]).nice();
  const xScale = d3
    .scaleTime()
    .domain([dateMin ?? new Date(), dateMax ?? new Date()])
    .range([0, width]);

  return (
    <Container>
      <Row>
        <Label>Spot History</Label>
        <Label>Path Simulation</Label>
      </Row>
      <GraphContainer ref={ref}>
        <DateGraph
          width={width}
          height={height}
          xScale={xScale}
          yScale={yScale}
          xFormatter={(value: Date) => format(value, "MMM yyyy")}
        >
          {height && width && (
            <>
              <SimulationPath
                data={spot}
                color={Color.NEUTRAL_500}
                xScale={xScale}
                yScale={yScale}
              />
              {simulations.map((simulation) => (
                <SimulationPath
                  key={simulation.color}
                  {...simulation}
                  xScale={xScale}
                  yScale={yScale}
                />
              ))}
              <SimulationDivider spot={spot} xScale={xScale} yScale={yScale} />
            </>
          )}
        </DateGraph>
      </GraphContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 8px;
`;

const GraphContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Label = styled.span`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;
