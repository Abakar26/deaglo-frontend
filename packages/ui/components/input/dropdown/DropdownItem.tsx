import styled from "styled-components";
import { type Selectable } from "..";
import { Color, Typography } from "../../../styles";
import { Icon } from "../..";

interface Props<T> {
  value: T;
  active?: boolean;
  onClick: () => void;
}

export const DropdownItem = <T extends string | Selectable>({
  value,
  active = false,
  onClick,
}: Props<T>) => {
  return (
    <Container
      onClick={onClick}
      active={active}
      disabled={typeof value !== "string" && value.disabled}
      color={typeof value !== "string" ? value.color : undefined}
      type="button"
    >
      {typeof value !== "string" && (value.icon || value.flag) && (
        <Icon name={(value.icon ?? value.flag)!} color={value.color} />
      )}
      {typeof value === "string" ? value : value.value}
    </Container>
  );
};

const Container = styled.button<{ active: boolean; color?: Color }>`
  border: none;
  outline: none;
  width: 100%;
  height: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  ${Typography.BODY_1};
  color: ${(props) => props.color ?? Color.NEUTRAL_900};
  border-radius: 4px;
  padding: 0 12px;
  background-color: ${(props) => (props.active ? Color.NEUTRAL_300 : Color.NEUTRAL_00)};
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    background-color: ${(props) => (props.active ? Color.NEUTRAL_300 : Color.NEUTRAL_100)};
  }
  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
  transition: 0.15s ease background-color;
  cursor: pointer;
`;
