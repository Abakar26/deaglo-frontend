import styled from "styled-components";
import { Color } from "../../styles";

enum RowLevel {
  DEFAULT,
  SUB_CELL_DEFAULT,
}

type TableRowProps = {
  $collapsed?: boolean;
  $selected?: boolean;
  $level?: RowLevel;
};

function getBackgroundColor({ $selected, $level }: TableRowProps, hover?: boolean) {
  if ($selected) return Color.BRAND_100;
  if (hover) return Color.BRAND_50;
  if ($level === RowLevel.SUB_CELL_DEFAULT) return Color.NEUTRAL_100;
  return Color.NEUTRAL_00;
}

export const TableRow = styled.tr<TableRowProps>`
  display: ${(props) => (props.$collapsed ? "none" : undefined)};

  &:not(:last-child) {
    border-bottom: 1px solid ${Color.NEUTRAL_150};
  }

  & td {
    background-color: ${(props) => getBackgroundColor(props)};
  }

  &:hover td {
    background-color: ${(props) => getBackgroundColor(props, true)};
  }
`;
