import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IconButton, Tooltip, type TooltipProps } from "../../../components";
import { Color, Typography } from "../../../styles";
import { DatePicker } from "./DatePicker";
import { DatePickerModal } from "./DatePickerModal";
import { DateTextInput } from "./DateTextInput";

interface Props {
  date?: Date;
  onChange: (date?: Date) => void;
  error?: string;
  onError?: (error?: string) => void;
  disabled?: boolean;
  tooltip?: TooltipProps;
  width?: number;
  minDate?: Date;
  maxDate?: Date;
}

export const DateInput: React.FunctionComponent<Props> = ({
  date,
  onChange,
  error,
  onError,
  disabled = false,
  tooltip,
  width,
  minDate,
  maxDate,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const anchorRef = useRef<HTMLDivElement>(null);

  const select = (date: Date) => {
    onChange(date);
    setOpen(false);
  };

  const onCancel = () => setOpen(false);

  return (
    <Container $width={width} ref={anchorRef}>
      <TooltipContainer>{tooltip && <Tooltip {...tooltip} />}</TooltipContainer>
      <InputContainer focused={focused} error={!!error} disabled={disabled}>
        <DateTextInput
          date={date}
          disabled={disabled}
          onChange={onChange}
          onError={onError}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <IconButton
          name="calendar"
          color={open ? Color.BRAND_800 : Color.NEUTRAL_900}
          disabled={disabled}
          onClick={() => setOpen(!open)}
        />
      </InputContainer>
      <Error show={!!error}>{error}</Error>
      {open && (
        <DatePickerModal anchor={anchorRef} onCancel={onCancel}>
          <DatePicker
            onSelect={select}
            onCancel={onCancel}
            date={date}
            min={minDate}
            max={maxDate}
          />
        </DatePickerModal>
      )}
    </Container>
  );
};

const Container = styled.div<{ $width: number | undefined }>`
  width: ${(props) => (props.$width ? `${props.$width}px` : undefined)};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const TooltipContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: calc(100% + 12px);
`;
