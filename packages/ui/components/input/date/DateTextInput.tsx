import { format, isValid, parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Color, Typography } from "../../../styles";

interface Props {
  date?: Date;
  disabled?: boolean;
  onChange: (date?: Date) => void;
  onError?: (error?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  yearRef?: React.RefObject<HTMLInputElement>;
  monthRef?: React.RefObject<HTMLInputElement>;
  dayRef?: React.RefObject<HTMLInputElement>;
}

const parseDayMonthYear = (date?: Date) => {
  return date && isValid(date)
    ? {
        year: format(date, "yyyy"),
        month: format(date, "MM"),
        day: format(date, "dd"),
      }
    : {
        day: "",
        month: "",
        year: "",
      };
};

export const DateTextInput: React.FunctionComponent<Props> = ({
  date,
  disabled,
  onChange,
  onError,
  onBlur,
  onFocus,
  yearRef,
  monthRef,
  dayRef,
}) => {
  const [input, setInput] = useState<{ day: string; month: string; year: string }>(
    parseDayMonthYear(date)
  );

  const internalYearRef = useRef<HTMLInputElement>(null);
  const internalMonthRef = useRef<HTMLInputElement>(null);
  const internalDayRef = useRef<HTMLInputElement>(null);
  const year = yearRef ?? internalYearRef;
  const month = monthRef ?? internalMonthRef;
  const day = dayRef ?? internalDayRef;

  useEffect(() => {
    setInput(parseDayMonthYear(date));
  }, [date]);

  const checkComplete = (year: string, month: string, day: string) => {
    if (year.length === 4 && month.length === 2 && day.length == 2) {
      const _date = parseISO(`${year}-${month}-${day}`);
      if (isValid(_date)) {
        onError && onError(undefined);
        onChange(_date);
      } else {
        onError && onError("Invalid Date");
      }
    }
  };

  const isNatural = (value: string): boolean => {
    return !!value.match(/^([0-9]{1,})?$/) || !value;
  };

  const handleYear = (year: string) => {
    if (isNatural(year)) {
      setInput({ ...input, year });
      if (year.length === 4 && month.current) {
        month.current.focus();
        checkComplete(year, input.month, input.day);
      }
      if (!year) {
        onChange(undefined);
      }
    }
  };

  const handleMonth = (month: string) => {
    if (isNatural(month)) {
      setInput({ ...input, month });
      if (month.length === 2 && day.current) {
        day.current.focus();
        checkComplete(input.year, month, input.day);
      }
    }
  };

  const handleDay = (day: string) => {
    if (isNatural(day)) {
      setInput({ ...input, day });
      if (day.length === 2) {
        checkComplete(input.year, input.month, day);
      }
    }
  };

  return (
    <Container>
      <Input
        ref={year}
        value={input.year}
        onChange={(e) => handleYear(e.target.value)}
        maxLength={4}
        placeholder="YYYY"
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      <Slash disabled={disabled}>/</Slash>
      <Input
        ref={month}
        value={input.month}
        hasContent={!!input.month}
        onChange={(e) => handleMonth(e.target.value)}
        maxLength={2}
        placeholder="MM"
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e) => e.key === "Backspace" && !input.month && year.current?.focus()}
        disabled={disabled}
      />
      <Slash disabled={disabled}>/</Slash>
      <Input
        ref={day}
        value={input.day}
        hasContent={!!input.day}
        maxLength={2}
        placeholder="DD"
        onChange={(e) => handleDay(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e) => e.key === "Backspace" && !input.day && month.current?.focus()}
        disabled={disabled}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
`;

const Slash = styled.span<{ disabled?: boolean }>`
  ${Typography.BODY_1};
  color: ${(props) => (props.disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_700)};
`;

const Input = styled.input<{ hasContent?: boolean; disabled?: boolean }>`
  width: ${(props) => (props.maxLength == 4 ? "4ch" : props.hasContent ? "2ch" : "2.8ch")};
  ${Typography.BODY_1};
  color: ${Color.NEUTRAL_900};
  outline: none;
  border: none;
  background-color: transparent;
  &::placeholder {
    ${Typography.BODY_1};
    font-size: 14px;
    color: ${(props) => (props.disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_700)};
    text-overflow: visible;
    overflow: visible;
  }
  text-overflow: visible;
  overflow: visible;
`;
