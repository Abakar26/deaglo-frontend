import {
  addMonths,
  addYears,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfToday,
  subMonths,
  subYears,
} from "date-fns";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, type DateInterval } from "../../../components";
import { Incrementor } from "./common";
import { Calendar } from "./common/Calendar";

interface Props {
  interval?: DateInterval;
  onSelect: (range: DateInterval) => void;
  onCancel?: () => void;
  min?: Date;
  max?: Date;
  weekends?: boolean;
}

export const DateRangePicker: React.FunctionComponent<Props> = ({
  interval,
  onSelect,
  onCancel,
  min,
  max,
  weekends = false,
}) => {
  const [startMonth, setStartMonth] = useState<Date>(interval?.start ?? startOfToday());
  const [endMonth, setEndMonth] = useState<Date>(
    !interval?.end || isSameMonth(interval.end, startMonth)
      ? addMonths(startMonth, 1)
      : interval.end
  );

  const [start, setStart] = useState<Date | undefined>(interval?.start);
  const [end, setEnd] = useState<Date | undefined>(interval?.end);

  useEffect(() => {
    if (interval?.start) {
      setStart(interval.start);
      setStartMonth(interval.start);
      if (interval?.end) {
        setEnd(interval.end);
        !isSameMonth(interval.start, interval.end) && setEndMonth(interval.end);
      }
    }
  }, [interval]);

  const cancel = () => {
    setStart(undefined);
    setEnd(undefined);
    onSelect({});
    onCancel?.();
  };

  const apply = () => {
    onCancel?.();
  };

  const handleSelect = (date: Date) => {
    if (start) {
      if (isSameDay(date, start)) {
        setEnd(undefined);
        setStart(undefined);
        onSelect({});
      } else if (isBefore(date, start)) {
        setStart(date);
        onSelect({ start: date, end });
      } else {
        setEnd(date);
        onSelect({ start, end: date });
      }
    } else {
      setStart(date);
      onSelect({ start: date });
    }
  };

  return (
    <Container>
      <Column>
        <Controls>
          <MonthControl>
            <Incrementor
              value={format(startMonth, "MMMMMM")}
              incr={() => setStartMonth(addMonths(startMonth, 1))}
              incrDisabled={addMonths(startMonth, 1) > endMonth}
              decr={() => setStartMonth(subMonths(startMonth, 1))}
              decrDisabled={min && subMonths(startMonth, 1) < min}
              wide={true}
            />
          </MonthControl>
          <YearControl>
            <Incrementor
              value={format(startMonth, "yyyy")}
              incr={() => setStartMonth(addYears(startMonth, 1))}
              incrDisabled={addYears(startMonth, 1) > endMonth}
              decr={() => setStartMonth(subYears(startMonth, 1))}
              decrDisabled={min && subYears(startMonth, 1) < min}
              wide={true}
            />
          </YearControl>
        </Controls>
        <Calendar
          month={startMonth}
          onSelect={handleSelect}
          selected={start}
          range={start && end ? { start, end } : undefined}
          weekends={weekends}
        />
      </Column>
      <Column>
        <Controls>
          <MonthControl>
            <Incrementor
              value={format(endMonth, "MMMMMM")}
              incr={() => setEndMonth(addMonths(endMonth, 1))}
              incrDisabled={max && addMonths(endMonth, 1) > max}
              decr={() => setEndMonth(subMonths(endMonth, 1))}
              decrDisabled={subMonths(endMonth, 1) < startMonth}
              wide={true}
            />
          </MonthControl>
          <YearControl>
            <Incrementor
              value={format(endMonth, "yyyy")}
              incr={() => setEndMonth(addYears(endMonth, 1))}
              incrDisabled={max && addYears(endMonth, 1) > max}
              decr={() => setEndMonth(subYears(endMonth, 1))}
              decrDisabled={subYears(endMonth, 1) < startMonth}
              wide={true}
            />
          </YearControl>
        </Controls>
        <Calendar
          month={endMonth}
          onSelect={handleSelect}
          selected={end ?? start}
          range={start && end ? { start, end } : undefined}
          weekends={weekends}
        />
        <Row>
          <Button type={ButtonType.OUTLINE} label="Cancel" onClick={cancel} resizeMode="fit" />
          <Button label="Apply" onClick={apply} disabled={!start || !end} resizeMode="fit" />
        </Row>
      </Column>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  gap: 16px;
`;

const Row = styled.div<{ wide?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.wide ? "space-between" : "end")};
  gap: 24px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MonthControl = styled.div``;

const YearControl = styled.div``;

const Controls = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
