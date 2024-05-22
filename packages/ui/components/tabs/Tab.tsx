import React from "react";
import styled, { css } from "styled-components";
import { Icon, TabBarSize } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  amount?: number;
  selected?: number;
  size: TabBarSize;
}

export const Tab: React.FunctionComponent<Props> = ({
  label,
  active,
  disabled = false,
  onClick,
  amount,
  selected,
  size,
}) => {
  return (
    <Container disabled={disabled} active={active} onClick={onClick} size={size}>
      <Row>
        {label}
        {selected !== undefined ? (
          <>
            <Amount active={active} size={size}>
              {amount}
            </Amount>
            <Counter size={size} active={active}>
              <Icon
                name="circle-check"
                size={16}
                color={active ? Color.NEUTRAL_100 : Color.SUCCESS_700}
              />
              {selected}
            </Counter>
          </>
        ) : (
          amount !== undefined && (
            <Counter size={size} active={active} unselected>
              {amount}
            </Counter>
          )
        )}
      </Row>
      <Indicator active={active} />
    </Container>
  );
};

const Container = styled.div<{ disabled: boolean; active: boolean; size: TabBarSize }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${(props) => (props.size == TabBarSize.LARGE ? "8px" : "4px")};
  ${(props) => (props.size == TabBarSize.LARGE ? Typography.SUBHEAD_3 : Typography.BODY_2)};
  color: ${(props) => (props.active ? Color.NEUTRAL_900 : Color.NEUTRAL_700)};
  transition: 0.15s ease color;
  padding: 0 8px;
  ${(props) => !props.disabled && "cursor: pointer"};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: min-content;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Indicator = styled.div<{ active: boolean }>`
  height: 2px;
  width: ${(props) => (props.active ? "calc(100% + 16px)" : "0px")};
  transition: 0.5s ease width;
  background-color: ${Color.BRAND_800};
`;

const Counter = styled.div<{ active: boolean; size: TabBarSize; unselected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  padding: 0 4px;
  gap: 2px;
  min-width: ${(props) => (props.size == TabBarSize.LARGE ? "24px" : "20px")};
  height: ${(props) => (props.size == TabBarSize.LARGE ? "24px" : "20px")};
  ${(props) => (props.size == TabBarSize.LARGE ? Typography.SUBHEAD_2 : Typography.LABEL_2)};
  color: ${(props) => (props.active ? Color.NEUTRAL_00 : Color.SUCCESS_700)};
  ${(props) =>
    props.unselected &&
    css`
      color: ${props.active ? Color.BRAND_800 : Color.NEUTRAL_700};
    `}
  background-color: ${(props) => (props.active ? Color.SUCCESS_700 : Color.SUCCESS_100)};
  ${(props) =>
    props.unselected &&
    css`
      background-color: ${props.active ? Color.BRAND_300 : Color.NEUTRAL_300};
    `}
  transition:
    0.3s ease background-color,
    0.3s ease color;
`;

const Amount = styled.div<{ active: boolean; size: TabBarSize }>`
  ${(props) => (props.size == TabBarSize.LARGE ? Typography.BODY_2 : Typography.LABEL_3)};
  color: ${(props) => (props.active ? Color.NEUTRAL_900 : Color.NEUTRAL_700)};
`;
