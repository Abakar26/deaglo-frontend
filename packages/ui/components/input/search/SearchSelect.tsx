import { useState } from "react";
import styled, { css } from "styled-components";
import { SearchInput } from ".";
import { type Selectable } from "..";
import { Color, Shadow } from "../../../styles";
import { DropdownItem } from "../dropdown/DropdownItem";

interface Props<T> {
  search: string;
  placeholder?: string;
  onSelect: (key: T) => void;
  onChange: (search: string) => void;
  options: Array<T>;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SearchSelect = <T extends string | Selectable>({
  search,
  placeholder,
  onChange,
  options,
  onSelect,
  onFocus,
  onBlur,
}: Props<T>) => {
  const [focused, setFocused] = useState<boolean>(false);

  const focus = () => {
    setFocused(true);
    onFocus && onFocus();
  };

  const blur = () => {
    setFocused(false);
    onBlur && onBlur();
  };

  return (
    <Container>
      <Display focused={focused}>
        <SearchInput
          value={search}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={focus}
          onBlur={blur}
        />
        {options.length > 0 &&
          search &&
          focused &&
          options.map((option, index) => (
            <DropdownItem
              key={index}
              value={typeof option === "string" ? option : option.value}
              onClick={() => onSelect(option)}
            />
          ))}
      </Display>
    </Container>
  );
};

const Container = styled.div`
  height: 48px;
  overflow-y: visible;
  z-index: 10000;
`;

const Display = styled.div<{ focused: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: min-content;
  border-radius: 4px;
  padding: 8px;
  border: 1px solid transparent;
  ${(props) =>
    props.focused &&
    css`
      border-color: ${Color.NEUTRAL_400};
      ${Shadow.CARD};
    `}
  transition: 0.15s ease border-color, 0.3s ease box-shadow;
`;
