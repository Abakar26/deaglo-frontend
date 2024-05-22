import React, { type PropsWithChildren } from "react";
import styled from "styled-components";
import { Color } from "../../styles";
import { Icon } from "..";
import { TableEntry, type TableEntryProps } from ".";

interface TableLabelProps extends Omit<TableEntryProps, "primary"> {
  status: "positive" | "medium" | "negative" | "expired";
}

export const TableLabel: React.FunctionComponent<PropsWithChildren<TableLabelProps>> = ({
  children,
  status,
  ...props
}) => {
  return (
    <TableEntry {...props}>
      <Label $status={status}>{children}</Label>
      {["medium", "negative"].includes(status) ? (
        <Icon name="warning" size={24} color={getStyle(status).color} />
      ) : null}
    </TableEntry>
  );
};

function getStyle(status: TableLabelProps["status"]) {
  switch (status) {
    case "positive":
      return { color: Color.SUCCESS_700, background: Color.SUCCESS_100 };
    case "medium":
      return { color: Color.BROWN_800, background: Color.BROWN_100 };
    case "negative":
      return { color: Color.DANGER_700, background: Color.DANGER_100 };
    case "expired":
      return { color: Color.NEUTRAL_700, background: Color.NEUTRAL_100 };
  }
}

const Label = styled.span<{ $status: TableLabelProps["status"] }>`
  background-color: ${(props) => getStyle(props.$status).background};
  border-radius: 2px;
  color: ${(props) => getStyle(props.$status).color};
  padding: 0 4px;
`;
