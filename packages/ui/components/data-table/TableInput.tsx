import styled from "styled-components";
import { Color, Typography } from "../../styles";
import type { CellAlignment } from ".";
import { TableCell, type TableCellProps } from "./TableCell";

export interface TableInputProps extends Omit<TableCellProps, "primary" | "editable" | "reverse"> {
  disabled?: boolean;
  label?: string;
  name?: string;
  value?: string;
  onChange: (value: string) => void;
}

export const TableInput: React.FunctionComponent<TableInputProps> = ({
  align = "start",
  disabled,
  label,
  name,
  onChange,
  value = "",
  ...props
}) => {
  return (
    <TableCell {...props} editable>
      <StyledInput
        $align={align}
        aria-label={label}
        disabled={disabled}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </TableCell>
  );
};

const StyledInput = styled.input<{ $align: CellAlignment }>`
  ${Typography.BODY_1};
  background-color: transparent;
  border: none;
  color: ${Color.NEUTRAL_900};
  outline: none;
  text-align: ${(props) => props.$align};
  width: 100%;
`;
