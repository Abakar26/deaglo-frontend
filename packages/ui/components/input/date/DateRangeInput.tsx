import { isBefore } from "date-fns";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IconButton, Tooltip, type DateInterval, type TooltipProps } from "../../../components";
import { useClickOutside } from "../../../components/hooks";
import { Color, Shadow, Typography } from "../../../styles";
import { DateRangePicker } from "./DateRangePicker";
import { DateTextInput } from "./DateTextInput";

interface Props {
  interval?: DateInterval;
  onChange: (interval?: DateInterval) => void;
  error?: string;
  onError?: (error?: string) => void;
  disabled?: boolean;
  tooltip?: TooltipProps;
  weekends?: boolean;
}

export const DateRangeInput: React.FunctionComponent<Props> = ({
  interval,
  onChange,
  error,
  onError,
  disabled = false,
  tooltip,
  weekends = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const endDateRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);

  const select = (interval: DateInterval) => {
    onChange(interval);
    onError?.(undefined);
  };

  const ref = useClickOutside(() => {
    setOpen(false);
  });

  const handleStart = (start?: Date) => {
    if (!start || !interval?.end || isBefore(start, interval.end)) {
      onChange({ ...interval, start });
      !!start && endDateRef?.current?.focus();
    } else {
      onError?.("Invalid interval");
    }
  };

  const handleEnd = (end?: Date) => {
    if (!end || !interval?.start || isBefore(interval.start, end)) {
      onChange({ ...interval, end });
      !end && startDateRef?.current?.focus();
    } else {
      onError?.("Invalid interval");
    }
  };

  return (
    <Container ref={ref}>
      <TooltipContainer>{tooltip && <Tooltip {...tooltip} />}</TooltipContainer>
      <InputContainer focused={focused} error={!!error} disabled={disabled}>
        <DateContainer disabled={disabled}>
          <DateTextInput
            date={interval?.start}
            disabled={disabled}
            onError={onError}
            onChange={handleStart}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            dayRef={startDateRef}
          />
          -
          <DateTextInput
            date={interval?.end}
            disabled={disabled}
            onError={onError}
            onChange={handleEnd}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            yearRef={endDateRef}
          />
        </DateContainer>

        <IconButton
          name="calendar"
          color={open ? Color.BRAND_800 : Color.NEUTRAL_900}
          disabled={disabled}
          onClick={() => setOpen(!open)}
        />
      </InputContainer>
      <Error show={!!error}>{error}</Error>
      {open && (
        <DateRangeContainer>
          <DateRangePicker
            onSelect={select}
            onCancel={() => setOpen(false)}
            interval={interval}
            weekends={weekends}
          />
        </DateRangeContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 390px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DateRangeContainer = styled.div`
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  border-radius: 4px;
  ${Shadow.CARD};
  border: 1px solid ${Color.NEUTRAL_400};
  z-index: 10000;
  padding: 20px;
  background-color: ${Color.NEUTRAL_00};
`;

const InputContainer = styled.div<{ focused: boolean; error: boolean; disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  border: 1px solid
    ${(props) =>
      props.error ? Color.DANGER_700 : props.focused ? Color.BRAND_800 : Color.NEUTRAL_400};
  border-radius: 4px;
  padding: 0 12px;
  &:hover {
    border-color: ${(props) =>
      !props.focused && !props.error && !props.disabled && Color.NEUTRAL_500};
  }
  transition: 0.15s ease border-color;
`;

const Error = styled.span<{ show: boolean }>`
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  z-index: 100;
  ${Typography.LABEL_4}
  color: ${Color.DANGER_700};
  overflow: hidden;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition:
    height 0.3s ease,
    opacity 0.3s ease;
`;

const DateContainer = styled.div<{ disabled: boolean }>`
  ${Typography.BODY_1};
  color: ${(props) => (props.disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_700)};
  gap: 8px;
  display: flex;
  align-items: center;
  margin-left: 40px;
`;

const TooltipContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: calc(100% + 12px);
`;
