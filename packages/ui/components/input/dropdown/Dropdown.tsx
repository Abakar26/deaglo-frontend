import styled from "styled-components";
import { SearchInput, type Selectable } from "..";
import { Color, Shadow, Typography } from "../../../styles";
import { DropdownItem } from "./DropdownItem";

interface Props<T> {
  selected?: Array<T>;
  onSelect: (key: T) => void;
  options: Array<T>;
  onSearch?: (search: string) => void;
  search?: string;
  visible?: boolean;
  align?: "start" | "end";
}

export const Dropdown = <T extends string | Selectable>({
  selected,
  onSelect,
  options,
  onSearch,
  search,
  visible = true,
  align = "start",
}: Props<T>) => {
  const childHeight = Math.min(
    options.length * 52 + 14 + (options.length === 0 ? 28 : 0) + (onSearch ? 66 : 0),
    350
  );

  return (
    <Container visible={visible} childHeight={childHeight} align={align}>
      <Content>
        {onSearch && (
          <SearchInput
            focusInput={visible}
            onChange={onSearch}
            value={search ?? ""}
            placeholder="Search..."
          />
        )}
        {options.length > 0 ? (
          options.map((option, index) => (
            <DropdownItem
              key={index}
              value={option}
              onClick={() => onSelect(option)}
              active={selected?.includes(option)}
            />
          ))
        ) : (
          <NoResults>No results</NoResults>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div<{ visible: boolean; childHeight?: number; align: "start" | "end" }>`
  width: 100%;
  min-width: max-content;
  position: absolute;
  top: calc(100% + 2px);
  ${(props) => (props.align === "start" ? "left: 0" : "right: 0")};
  border-radius: 4px;
  ${Shadow.CARD};
  border: 1px solid ${Color.NEUTRAL_400};
  padding: 8px;
  background-color: ${Color.NEUTRAL_00};
  z-index: 100000;
  max-height: 350px;
  min-height: max-content;
  overflow-y: auto;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: ${(props) => (props.visible ? props.childHeight : 0)}px;
  transition:
    0.3s ease height,
    0.3s ease opacity;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NoResults = styled.span`
  ${Typography.BODY_1};
  color: ${Color.NEUTRAL_500};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
