import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Icon, IconButton } from "../..";
import { Color, Typography } from "../../../styles";

interface Props {
  onChange: (text: string) => void;
  placeholder?: string;
  value: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onClear?: () => void;
  error?: string;
  disabled?: boolean;
  focusInput?: boolean;
}

export const SearchInput: React.FunctionComponent<Props> = ({
  onChange,
  placeholder,
  value,
  onBlur,
  onFocus,
  onClear = () => value && onChange(""),
  error,
  focusInput,
  disabled = false,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>();

  const focus = () => {
    setFocused(true);
    onFocus && onFocus();
  };

  const blur = () => {
    setFocused(false);
    onBlur && onBlur();
  };

  useEffect(() => {
    setFocused(focusInput ?? false);
    if (focusInput && searchInputRef.current) {
      searchInputRef.current.select();
    }
  }, [focusInput]);

  return (
    <Container>
      <SearchContainer focused={focused} error={!!error} disabled={disabled}>
        <Icon name="search" color={disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_900} />
        <Input
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          value={value}
          onBlur={blur}
          onFocus={focus}
          disabled={disabled}
          autoFocus={focusInput}
          ref={searchInputRef}
        />
        <Clear show={!!value}>
          <IconButton name="x" onClick={onClear} />
        </Clear>
      </SearchContainer>
      <Error show={!!error}>{error}</Error>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const SearchContainer = styled.div<{ focused: boolean; error: boolean; disabled: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid
    ${(props) =>
      props.error ? Color.DANGER_700 : props.focused ? Color.BRAND_800 : Color.NEUTRAL_400};
  gap: 8px;
  padding: 0px 12px;
  padding-bottom: 2px;
  transition: 0.15s ease border-color;
  &:hover {
    border-color: ${(props) =>
      !props.error && !props.focused && !props.disabled && Color.NEUTRAL_500};
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props) => (props.disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_900)};
  ${Typography.BODY_1};
  &::placeholder {
    ${Typography.BODY_1};
    color: ${(props) => (props.disabled ? Color.NEUTRAL_400 : Color.NEUTRAL_700)};
  }
`;

const Error = styled.span<{ show: boolean }>`
  color: ${Color.DANGER_700};
  ${Typography.LABEL_4};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 0.15s ease opacity;
`;

const Clear = styled.div<{ show: boolean }>`
  background-color: transparent;
  border: none;
  outline: none;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: 0.15s ease opacity;
  ${(props) => props.show && "cursor: pointer"};
`;
