import { type PropsWithChildren } from "react";
import styled from "styled-components";
import { Icon } from "..";
import { TableEntry } from ".";

type TableButtonCollapsibleProps = {
  expanded: boolean;
  onToggle: () => void;
};

export function TableButtonCollapsible({
  children,
  expanded,
  onToggle,
}: PropsWithChildren<TableButtonCollapsibleProps>) {
  return (
    <TableEntry>
      <Button
        aria-label={expanded ? "Collapse row" : "Expand row"}
        onClick={onToggle}
        type="button"
      >
        {children} <Icon name={expanded ? "chevron-up" : "chevron-down"} />
      </Button>
    </TableEntry>
  );
}

const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: flex;
  font: inherit;
  justify-content: space-between;
  line-height: inherit;
  outline-offset: 8px;
  width: 100%;
`;
