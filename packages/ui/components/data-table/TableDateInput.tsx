import React, { useRef, useState } from "react";
import { Color } from "../../styles";
import { IconButton, DatePicker } from "..";
import { DatePickerModal } from "../input/date/DatePickerModal";
import { DateTextInput } from "../input/date/DateTextInput";
import { TableCell, type TableCellProps } from "./TableCell";

interface TableDateInputProps extends Omit<TableCellProps, "align" | "editable" | "primary"> {
  date?: Date;
  onChange: (date?: Date) => void;
}

export const TableDateInput: React.FunctionComponent<TableDateInputProps> = ({
  date,
  onChange,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const anchorRef = useRef<HTMLElement>(null);

  const onDateSelect = (date: Date) => {
    setOpen(false);
    onChange(date);
  };

  const onCancel = () => setOpen(false);

  return (
    <TableCell {...props} align="space-between" editable ref={anchorRef}>
      <DateTextInput date={date} onChange={onChange} />
      <IconButton
        name="calendar"
        onClick={() => setOpen(!open)}
        color={open ? Color.BRAND_800 : Color.NEUTRAL_900}
      />
      {open && (
        <DatePickerModal anchor={anchorRef} portal onCancel={onCancel}>
          <DatePicker onSelect={onDateSelect} onCancel={onCancel} date={date} />
        </DatePickerModal>
      )}
    </TableCell>
  );
};
