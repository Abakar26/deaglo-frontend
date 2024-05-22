import { type PropsWithChildren } from "react";
import { TableCell, type TableCellProps } from "./TableCell";

export type TableEntryProps = Omit<TableCellProps, "editable" | "error">;

export const TableEntry: React.FunctionComponent<PropsWithChildren<TableEntryProps>> = (props) => {
  return <TableCell {...props} />;
};
