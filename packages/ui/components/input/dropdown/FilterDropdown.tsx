import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Dropdown, type Selectable } from "..";
import { Icon, useClickOutside } from "../../../components";
import { Color, Typography } from "../../../styles";

interface Props<T> {
  filter: string;
  options: Array<T>;
  active: Array<T>;
  onSelect: (value: T) => void;
  align?: "start" | "end";
  onSearch?: (search: string) => void;
  search?: string;
  multiple?: boolean;
}

export const FilterDropdown = <T extends string | Selectable>({
  filter,
  options,
  active,
  onSelect,
  align = "start",
  onSearch,
  search,
  multiple = true,
}: Props<T>) => {
  const [open, setOpen] = useState<boolean>(false);

  const ref = useClickOutside(() => setOpen(false));

  return (
    <Container ref={ref}>
      <Display onClick={() => setOpen(!open)} open={open}>
        {multiple ? (
          <>
            {filter}
            {active.length > 0 && <Count>{active.length}</Count>}
          </>
        ) : (
          <>{active.length === 1 ? active[0] : filter}</>
        )}
        <IconContainer open={open}>
          <Icon name="chevron-down" color={Color.NEUTRAL_900} />
        </IconContainer>
      </Display>
      <Dropdown
        onSelect={onSelect}
        options={options}
        selected={active}
        visible={open}
        align={align}
        onSearch={onSearch}
        search={search}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: min-content;
`;

const Display = styled.div<{ open: boolean }>`
  display: flex;
  height: 40px;
  width: min-content;
  padding: 0 12px;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background-color: ${Color.NEUTRAL_00};
  border-radius: 4px;
  border: 1px solid ${Color.NEUTRAL_300};
  ${Typography.SUBHEAD_3};
  color: ${Color.NEUTRAL_900};
  white-space: nowrap;
  text-transform: capitalize;
  &:hover {
    background-color: ${Color.NEUTRAL_300};
  }
  ${(props) =>
    props.open &&
    css`
      border-color: ${Color.BRAND_800};
    `};
  transition:
    0.3s ease background-color,
    0.3s ease border-color;
`;

const Count = styled.div`
  padding: 2px 2px 2px 2px;
  color: ${Color.NEUTRAL_00};
  background-color: ${Color.BRAND_800};
  border-radius: 16px;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Typography.LABEL_3};
`;

const IconContainer = styled.div<{ open: boolean }>`
  transform: rotate(${(props) => (props.open ? 180 : 0)}deg);
  transition: 0.15s ease transform;
`;
