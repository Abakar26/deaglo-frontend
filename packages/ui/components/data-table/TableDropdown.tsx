import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css, type RuleSet } from "styled-components";
import { Dropdown, Icon, type Flag, type IconName, type Selectable } from "../../components";
import { useClickOutside } from "../../components/hooks";
import { Color, Typography } from "../../styles";
import { TableCell, type TableCellProps } from "./TableCell";

export interface TableDropdownProps<T>
  extends Omit<TableCellProps, "primary" | "editable" | "reverse"> {
  icon?: IconName | Flag;
  label?: string;
  options: Array<T>;
  search?: string;
  selected: T;
  onSearch?: (search: string) => void;
  onSelect: (value: T) => void;
}

export const TableDropdown = <T extends string | Selectable>({
  icon,
  label,
  options,
  search,
  selected,
  onSearch,
  onSelect,
  ...props
}: TableDropdownProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);

  const close = () => setOpen(false);

  function select(key: T) {
    onSelect(key);
    close();
  }

  const anchorRef = useRef<HTMLElement>(null);
  const outsideRef = useClickOutside(close);

  function getPosition() {
    if (anchorRef.current === null) return;
    const rect = anchorRef.current.getBoundingClientRect();

    return css`
      position: absolute;
      left: ${rect.left}px;
      top: ${rect.top}px;
      transform: translateY(${rect.height}px);
    `;
  }

  return (
    <TableCell {...props} editable ref={anchorRef}>
      <Select onClick={() => setOpen((open) => !open)} aria-label={label}>
        <Selected>
          {icon ? <Icon name={icon} /> : null}
          {typeof selected === "string" ? selected : selected.value}
        </Selected>

        <Icon name={open ? "chevron-up" : "chevron-down"} color={Color.NEUTRAL_900} />
      </Select>

      {open
        ? createPortal(
            <Popover $position={getPosition()} ref={outsideRef}>
              <Dropdown
                onSelect={select}
                options={options}
                selected={selected ? [selected] : []}
                onSearch={onSearch}
                search={search}
                visible={open}
              />
            </Popover>,
            document.body
          )
        : null}
    </TableCell>
  );
};

const Select = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Selected = styled.span`
  ${Typography.BODY_1}
  align-items: center;
  display: flex;
  gap: 12px;
`;

const Popover = styled.div<{ $position: RuleSet | undefined }>`
  ${(props) => props.$position}
  z-index: 10000000;
`;
