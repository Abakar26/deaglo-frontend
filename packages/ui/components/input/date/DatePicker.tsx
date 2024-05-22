import {
  addMonths,
  addYears,
  format,
  isSameDay,
  startOfToday,
  subMonths,
  subYears,
} from "date-fns";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonType } from "../../../components";
import { Incrementor } from "./common";
import { Calendar } from "./common/Calendar";

interface Props {
  date?: Date;
  onSelect: (date: Date) => void;
  onCancel?: () => void;
  min?: Date;
  max?: Date;
}

export const DatePicker: React.FunctionComponent<Props> = ({
  date,
  onSelect,
  onCancel,
  min,
  max,
}) => {
  const [month, setMonth] = useState<Date>(date ?? startOfToday());
  const [selected, setSelected] = useState<Date | undefined>(date);

  useEffect(() => {
    if (date) {
      setSelected(date);
      setMonth(date);
    }
  }, [date]);

  const cancel = () => {
    setSelected(undefined);
    onCancel && onCancel();
  };

  const apply = () => {
    selected && onSelect(selected);
  };

  const handleSelect = (date: Date) => {
    if (selected && isSameDay(date, selected)) {
      setSelected(undefined);
    } else {
      setSelected(date);
    }
  };

  return (
    <Container>
      <Controls>
        <Incrementor
          value={format(month, "MMMMMM")}
          incr={() => setMonth(addMonths(month, 1))}
          incrDisabled={max && addMonths(month, 1) > max}
          decr={() => setMonth(subMonths(month, 1))}
          decrDisabled={min && subMonths(month, 1) < min}
          wide={true}
        />
        <Incrementor
          value={format(month, "yyyy")}
          incr={() => setMonth(addYears(month, 1))}
          incrDisabled={max && addYears(month, 1) > max}
          decr={() => setMonth(subYears(month, 1))}
          decrDisabled={min && subYears(month, 1) < min}
          wide={true}
        />
      </Controls>

      <Calendar month={month} onSelect={handleSelect} selected={selected} />
      <Row>
        <Button type={ButtonType.OUTLINE} label="Cancel" onClick={cancel} resizeMode="fit" />
        <Button label="Apply" onClick={apply} disabled={!selected} resizeMode="fit" />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  gap: 12px;
`;

const Controls = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
