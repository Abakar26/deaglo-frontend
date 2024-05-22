import React from "react";
import { Checkbox } from "..";
import { TableEntry } from ".";

interface Props {
  active: boolean;
  onChange: (active: boolean) => void;
}

export const TableCheckbox: React.FunctionComponent<Props> = ({ active, onChange }) => {
  return (
    <TableEntry>
      <Checkbox active={active} onClick={onChange} />
    </TableEntry>
  );
};
