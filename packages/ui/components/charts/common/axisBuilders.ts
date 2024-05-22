import * as d3 from "d3";
import { type GraphDirection } from ".";
import { Color, Typography } from "../../../styles";
import { differenceInDays, differenceInMonths, format } from "date-fns";

export interface AxisData<T> {
  width: number;
  height: number;
  direction: GraphDirection;
  graph: d3.Selection<SVGGElement | null, unknown, null, undefined>;
  style?: string;
  formatter?: (value: T) => string;
  lined?: boolean;
  unticked?: boolean;
}

const defaultBandStyle = `${Typography.BODY_3}; color: ${Color.NEUTRAL_900}; text-transform: capitalize; margin: 0 10px;`;
const defaultLinearStyle = `${Typography.LABEL_5} color: ${Color.NEUTRAL_700}`;

export const bandBuilder = (scale: d3.ScaleBand<string>, axis: AxisData<string>) => {
  const vertical = axis.direction == "vertical";
  const axisBuilder = vertical ? d3.axisLeft(scale) : d3.axisBottom(scale);
  if (!axis.unticked) {
    axis.graph
      .append("g")
      .attr("transform", `translate(${vertical ? -10 : 0},${vertical ? 0 : axis.height + 10})`)
      .attr("style", axis.style ?? defaultBandStyle)
      .attr("stroke-opacity", 0)
      .call(axisBuilder);
  }
};

export const linearBuilder = (
  scale: d3.ScaleLinear<number, number, never>,
  axis: AxisData<number>
) => {
  const vertical = axis.direction == "vertical";
  const formatter = axis.formatter ?? Intl.NumberFormat("en", { notation: "compact" }).format;
  const axisBuilder = vertical ? d3.axisLeft(scale) : d3.axisBottom(scale);
  const builtAxis = axisBuilder
    .ticks(vertical ? axis.height / 40 : axis.width / 57)
    .tickSize(vertical ? axis.width : axis.height)
    .tickFormat((d) => formatter(d.valueOf()));
  axis.graph
    .append("g")
    .attr("style", axis.style ?? defaultLinearStyle)
    .attr("stroke-opacity", 0)
    .call(builtAxis)
    .attr("transform", vertical ? `translate(${axis.width},0)` : `translate(0,0)`);

  if (axis.lined) {
    axis.graph.call((g) =>
      g
        .selectAll(".tick line")
        .attr("stroke", Color.NEUTRAL_400)
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 1)
        .attr("stroke-linecap", "round")
        .attr("stroke-dasharray", "3,3")
    );
  }
};

const getGap = (
  xScale: d3.ScaleTime<number, number, never>,
  width: number
): d3.TimeInterval | null => {
  const [min, max] = [xScale.domain()[0] ?? new Date(), xScale.domain()[1] ?? new Date()];
  const months = differenceInMonths(max, min);
  if (months > 12) {
    return d3.timeMonth.every(3);
  }
  if (months > 6) {
    return d3.timeMonth.every(1);
  }
  if (months > 1) {
    return d3.timeWeek.every(2);
  }
  return d3.timeDay.every(2);
};

export const timeBuilder = (scale: d3.ScaleTime<number, number, never>, axis: AxisData<Date>) => {
  const vertical = axis.direction == "vertical";
  const formatter = axis.formatter
    ? (value: number) => axis.formatter!(new Date(value))
    : (value: number) => format(new Date(value), "MMM dd");
  const axisBuilder = vertical ? d3.axisLeft(scale) : d3.axisBottom(scale);
  const builtAxis = axisBuilder
    .ticks(getGap(scale, vertical ? axis.height : axis.width))
    .tickSize(vertical ? axis.width : axis.height)
    .tickFormat((d) => formatter(d.valueOf()));

  axis.graph
    .append("g")
    .attr("style", axis.style ?? defaultLinearStyle)
    .attr("stroke-opacity", 0)
    .call(builtAxis)
    .attr("transform", vertical ? `translate(${axis.width},0)` : `translate(0,0)`);

  if (axis.lined) {
    axis.graph.call((g) =>
      g
        .selectAll(".tick line")
        .attr("stroke", Color.NEUTRAL_400)
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 1)
        .attr("stroke-linecap", "round")
        .attr("stroke-dasharray", "3,3")
    );
  }
};
