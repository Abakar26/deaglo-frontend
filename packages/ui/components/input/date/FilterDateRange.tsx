import { isBefore } from "date-fns";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IconButton, type DateInterval } from "../../../components";
import { useClickOutside } from "../../../components/hooks";
import { Color, Shadow, Typography } from "../../../styles";
import { DateRangePicker } from "./DateRangePicker";
import { DateTextInput } from "./DateTextInput";

interface Props {
  interval?: DateInterval;
  onChange: (interval?: DateInterval) => void;
}

export const FilterDateRange: React.FunctionComponent<Props> = ({ interval, onChange }) => {
  const [open, setOpen] = useState<boolean>(false);
  const endDateRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);

  const close = () => setOpen(false);
  const ref = useClickOutside(close);

  const handleStart = (start?: Date) => {
    if (!start || !interval?.end || isBefore(start, interval.end)) {
      onChange({ ...interval, start });
      !!start && endDateRef?.current?.focus();
    }
  };

  const handleEnd = (end?: Date) => {
    if (!end || !interval?.start || isBefore(interval.start, end)) {
      onChange({ ...interval, end });
      !end && startDateRef?.current?.focus();
    }
  };

  return (
    <Container>
      <InputContainer>
        <DateTextInput date={interval?.start} onChange={handleStart} dayRef={startDateRef} />
        -
        <DateTextInput date={interval?.end} onChange={handleEnd} yearRef={endDateRef} />
        <IconButton
          name="calendar"
          color={open ? Color.BRAND_800 : Color.NEUTRAL_900}
          onClick={() => setOpen(!open)}
        />
      </InputContainer>

      {open && (
        <DateRangeContainer ref={ref}>
          <DateRangePicker interval={interval} onSelect={onChange} onCancel={close} />
        </DateRangeContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const DateRangeContainer = styled.div`
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  border-radius: 4px;
  ${Shadow.CARD};
  border: 1px solid ${Color.NEUTRAL_300};
  z-index: 10000;
  padding: 20px;
  background-color: ${Color.NEUTRAL_00};
`;

const InputContainer = styled.div`
  ${Typography.BODY_1}
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${Color.NEUTRAL_300};
  color: ${Color.NEUTRAL_700};
  display: flex;
  gap: 8px;
  height: 40px;
  justify-content: space-between;
  padding: 0 12px;
  transition: 0.3s ease border-color;

  &:hover {
    border-color: ${Color.NEUTRAL_500};
  }

  &:focus-within {
    border-color: ${Color.BRAND_800};
  }
`;
