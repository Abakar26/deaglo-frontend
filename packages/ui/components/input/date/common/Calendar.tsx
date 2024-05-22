import {
  Interval,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  subDays,
  isWeekend,
} from "date-fns";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Color, Typography } from "../../../../styles";

interface Props {
  month: Date;
  onSelect: (date: Date) => void;
  selected?: Date;
  range?: Interval;
  weekends?: boolean;
}

export const Calendar: React.FunctionComponent<Props> = ({
  month,
  onSelect,
  selected,
  range,
  weekends = false,
}) => {
  // TODO: i18n
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayRange = useMemo(
    () => eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }),
    [month]
  );
  const offset = dayRange[0] ? daysOfWeek.indexOf(format(dayRange[0], "EEE")) : 0;
  const previousMonth = useMemo(
    () =>
      offset === 0
        ? []
        : eachDayOfInterval({
            start: subDays(startOfMonth(month), offset),
            end: subDays(startOfMonth(month), 1),
          }),
    [month, offset]
  );

  const isActive = (date: Date): boolean => {
    if (range) {
      return isSameDay(range.end, date) || isSameDay(range.start, date);
    } else {
      return !!selected && isSameDay(date, selected);
    }
  };

  return (
    <Container>
      {daysOfWeek.map((day) => (
        <DayOfWeek key={day}>{day}</DayOfWeek>
      ))}
      {previousMonth.map((date) => {
        return (
          <Day
            key={date.toString()}
            inRange={range ? isWithinInterval(date, range) : false}
            start={!!range?.start && isSameDay(range.start, date)}
            end={!!range?.end && isSameDay(range.end, date)}
          >
            <DisabledDay key={format(date, "d")}>{format(date, "d")}</DisabledDay>
          </Day>
        );
      })}
      {dayRange.map((date) => {
        return (
          <Day
            key={date.toString()}
            inRange={range ? isWithinInterval(date, range) : false}
            start={!!range?.start && isSameDay(range.start, date)}
            end={!!range?.end && isSameDay(range.end, date)}
          >
            {!weekends && isWeekend(date) ? (
              <DisabledDay key={format(date, "d")}>{format(date, "d")}</DisabledDay>
            ) : (
              <DayButton type="button" onClick={() => onSelect(date)} active={isActive(date)}>
                {format(date, "d")}
              </DayButton>
            )}
          </Day>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-row-gap: 8px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  align-items: center;
  justify-items: center;
`;

const Day = styled.div<{ inRange: boolean; end?: boolean; start?: boolean }>`
  width: 48px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.inRange ? Color.BRAND_100 : "transparent")};
  border-left: 8px solid ${Color.NEUTRAL_00};
  border-right: 8px solid ${Color.NEUTRAL_00};
  ${(props) => props.inRange && !props.start && `border-left-color: ${Color.BRAND_100}`};
  ${(props) => props.inRange && !props.end && `border-right-color: ${Color.BRAND_100}`};
  transition:
    0.3s ease background-color,
    0.3s ease border-color;
`;

const DayOfWeek = styled.span`
  ${Typography.LABEL_1};
  color: ${Color.BRAND_800};
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayButton = styled.button<{ active: boolean }>`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Typography.BODY_3};
  color: ${(props) => (props.active ? Color.NEUTRAL_00 : Color.NEUTRAL_900)};
  border-radius: 4px;
  background-color: ${(props) => (props.active ? Color.BRAND_800 : "transparent")};
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    ${(props) =>
      !props.active &&
      css`
        background-color: ${Color.BRAND_100};
      `}
  }
  transition:
    0.3s ease background-color,
    0.3s ease color;
`;

const DisabledDay = styled.span`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_500};
`;
