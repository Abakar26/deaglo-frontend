import { type PropsWithChildren } from "react";
import styled from "styled-components";
import { Color, Typography } from "../../styles";
import { Checkbox, Icon, type IconName } from "..";
import { type CellAlignment } from ".";

type SortDirection = "ascending" | "descending";
export type SortDescriptor = { key: string; direction: SortDirection };

interface TableHeaderProps {
  align?: CellAlignment;
  checked?: boolean;
  reverse?: boolean;
  sort?: SortDescriptor;
  sortKey?: string;
  onCheck?: (checked: boolean) => void;
  onSort?: (sortDescriptor: SortDescriptor) => void;
}

const DEFAULT_SORT_DIRECTION = "descending" as SortDirection;

const SORT_DIRECTION_ICON: Record<SortDirection, IconName> = {
  ascending: "arrow-up",
  descending: "arrow-down",
};

const OPPOSITE_SORT_DIRECTION: Record<SortDirection, SortDirection> = {
  ascending: "descending",
  descending: "ascending",
};

export const TableHeader: React.FunctionComponent<PropsWithChildren<TableHeaderProps>> = ({
  align = "space-between",
  checked,
  children,
  reverse = false,
  sort,
  sortKey,
  onCheck,
  onSort,
}) => {
  const allowSorting = sortKey !== undefined && onSort !== undefined;
  const sorted = allowSorting && sort?.key === sortKey;

  const isCheckbox = onCheck !== undefined;

  const selected = Boolean(checked) || sorted;
  const interactable = allowSorting || isCheckbox;

  function handleSort() {
    if (!allowSorting) return;

    const direction = sorted ? OPPOSITE_SORT_DIRECTION[sort.direction] : DEFAULT_SORT_DIRECTION;
    onSort({ key: sortKey, direction });
  }

  return (
    <TH $interactable={interactable} $selected={selected} onClick={handleSort}>
      <Container $align={align}>
        <Content $reverse={reverse}>
          {isCheckbox ? <Checkbox active={checked ?? false} onClick={onCheck} /> : children}
        </Content>
        {allowSorting ? (
          <Icon
            name={SORT_DIRECTION_ICON[sorted ? sort.direction : DEFAULT_SORT_DIRECTION]}
            color={sorted ? Color.NEUTRAL_900 : Color.NEUTRAL_700}
          />
        ) : null}
      </Container>
    </TH>
  );
};

const TH = styled.th<{ $interactable: boolean; $selected: boolean }>`
  ${Typography.BODY_1};
  background-color: ${(props) => (props.$selected ? Color.NEUTRAL_300 : Color.NEUTRAL_100)};
  color: ${Color.NEUTRAL_700};
  cursor: ${(props) => (props.$interactable ? "pointer" : undefined)};
  padding: 0;
  /* width: 100%; */
  white-space: nowrap;
  &:hover {
    background-color: ${(props) => (!props.$selected ? Color.NEUTRAL_150 : undefined)};
  }
`;

const Container = styled.div<{ $align: CellAlignment }>`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: ${(props) => props.$align};
  margin: 12px 16px;
`;

const Content = styled.div<{ $reverse: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.$reverse ? "row-reverse" : "row")};
  gap: 10px;
  position: relative;
`;
