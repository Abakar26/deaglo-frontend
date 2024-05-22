import React from "react";
import styled from "styled-components";
import { Color } from "../../styles";
import { Icon, type IconName } from "..";
import { TableEntry, type CellAlignment, type TableEntryProps } from ".";

interface TableButtonProps extends Omit<TableEntryProps, "primary"> {
  icon?: IconName;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TableButton: React.FunctionComponent<TableButtonProps> = ({
  align = "space-between",
  icon,
  label,
  reverse = false,
  onClick,
  ...props
}) => {
  return (
    <TableEntry {...props} primary>
      <Button $align={align} $reverse={reverse} type="button" onClick={onClick}>
        {label}
        {icon ? <Icon name={icon} color={Color.BRAND_800} /> : null}
      </Button>
    </TableEntry>
  );
};

const Button = styled.button<{ $align: CellAlignment; $reverse: boolean }>`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${Color.BRAND_800};
  cursor: pointer;
  display: flex;
  flex-direction: ${(props) => (props.$reverse ? "row-reverse" : "row")};
  font: inherit;
  gap: 12px;
  justify-content: ${(props) => props.$align};
  line-height: inherit;
  outline-offset: 8px;
  width: 100%;
`;
