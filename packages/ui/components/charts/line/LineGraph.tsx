import * as d3 from "d3";
import React, { useMemo } from "react";
import styled from "styled-components";
import { type Color } from "../../../styles";
import { useExtrema, useGraphContainer } from "../hooks";
import { Graph, Legend } from "../common";
import { Line, type LinearGraphOptions } from ".";

export type PointData = { x: number; y: number };

type LineData = Array<{
  name: string;
  data: PointData[];
  color: Color;
  dashed?: boolean;
}>;

interface Props {
  lines: LineData;
  options?: LinearGraphOptions;
}

export const LineGraph: React.FunctionComponent<Props> = ({ lines, options = {} }) => {
  const { ref, width, height } = useGraphContainer();

  const [xData, yData] = useMemo(() => {
    const _data = lines.map((line) => line.data).flat();
    return [_data.map((data) => data.x), _data.map((data) => data.y)];
  }, [lines]);

  const [xDataMin, xDataMax] = useExtrema(xData);
  const [xMin, xMax] = [options.xAxis?.min ?? xDataMin, options.xAxis?.max ?? xDataMax];

  const [yDataMin, yDataMax] = useExtrema(yData);
  const [yMin, yMax] = [options.yAxis?.min ?? yDataMin, options.yAxis?.max ?? yDataMax];

  const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
  const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

  return (
    <Container>
      {!options.hideLegend ? <Legend items={lines} /> : null}
      <GraphContainer ref={ref}>
        {height > 0 && width > 0 ? (
          <Graph
            width={width}
            height={height}
            xScale={xScale}
            yScale={yScale}
            xFormatter={options.xAxis?.formatter}
            yFormatter={options.yAxis?.formatter}
            xAxisLabel={options.xAxis?.label}
            yAxisLabel={options.yAxis?.label}
          >
            {lines.map((line) => (
              <Line key={line.name} {...line} yScale={yScale} xScale={xScale} />
            ))}
          </Graph>
        ) : null}
      </GraphContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 100%;
`;
