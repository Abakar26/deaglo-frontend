import React, { useState } from "react";
import styled, { css } from "styled-components";
import { DotsLoader, LoaderColor } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  actions: Array<{
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
  }>;
}

export const SegmentedButton: React.FunctionComponent<Props> = ({ actions }) => {
  const [focused, setFocused] = useState<number>();

  return (
    <Container>
      {actions.map(({ label, onClick, disabled, loading }, index) => {
        return (
          <Button
            aria-label={label}
            key={index}
            left={index === 0}
            right={index === actions.length - 1}
            onClick={() => !loading && onClick()}
            disabled={disabled}
            loading={loading}
            focused={focused === index}
            onFocus={() => setFocused(index)}
          >
            {loading ? <DotsLoader color={LoaderColor.BRAND_800} /> : label}
          </Button>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: min-content;
  display: flex;
  border-radius: 4px;

  border: 1px solid ${Color.BRAND_800};
`;

const Button = styled.button<{
  left: boolean;
  right: boolean;
  loading?: boolean;
  focused: boolean;
}>`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Typography.SUBHEAD_1};
  color: ${Color.BRAND_800};
  ${(props) => !props.loading && !props.disabled && "cursor: pointer"};
  border: none;
  outline: none;
  background-color: ${Color.NEUTRAL_00};
  border-left: ${(props) => (!props.left ? `1px solid ${Color.BRAND_800}` : "none")};
  border-radius: ${(props) =>
    props.left && props.right
      ? "3px"
      : props.right
        ? "0 3px 3px 0"
        : props.left
          ? "3px 0px 0px 3px"
          : "0px"};
  padding: 0 15px;
  outline-offset: 3px;
  &:focus {
    ${(props) =>
      !props.loading &&
      css`
        outline: 2px solid ${Color.BRAND_900};
        background-color: ${Color.BRAND_800};
        color: ${Color.NEUTRAL_00};
      `}
    z-index: 100;
  }
  &:hover {
    ${(props) =>
      !props.focused &&
      !props.loading &&
      !props.disabled &&
      css`
        background-color: ${Color.BRAND_100};
      `}
  }
  &:active {
    ${(props) =>
      !props.loading &&
      !props.disabled &&
      css`
        background-color: ${Color.BRAND_300};
      `}
  }
  &:disabled {
    color: ${Color.NEUTRAL_400};
  }
  transition: 0.15s ease background-color;
`;
