"use client";

import { TableButton, TableEntry, TableInput } from "ui/components";
import { KEY_MAP } from "../utilities/keys";

type EditableCellProps = {
  editable: boolean;
  hovered: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function EditableTradeIdCell({
  editable,
  hovered,
  label,
  value,
  onChange,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: EditableCellProps) {
  if (editable) {
    return <TableInput label={KEY_MAP.trade_id.label} value={value} onChange={onChange} />;
  }

  if (hovered) {
    return (
      <TableButton icon="pencil" label={label} onClick={onClick} onMouseLeave={onMouseLeave} />
    );
  }

  return (
    <TableEntry primary onMouseEnter={onMouseEnter}>
      {label}
    </TableEntry>
  );
}
