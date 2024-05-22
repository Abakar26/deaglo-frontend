import React from "react";
import styled from "styled-components";
import { Icon, type IconName } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  icon: IconName;
  label: string;
  onClick: () => void;
  open: boolean;
  active?: boolean;
}

export const SidebarItem: React.FunctionComponent<Props> = ({
  icon,
  label,
  onClick,
  open,
  active = false,
}) => {
  return (
    <Container onClick={onClick} active={active}>
      <IconContainer>
        <Icon name={icon} color={active ? Color.BRAND_800 : Color.NEUTRAL_700} />
      </IconContainer>
      <Label open={open} active={active}>
        {label}
      </Label>
    </Container>
  );
};

const Container = styled.button<{ active: boolean }>`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 48px;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  margin: 0 20px;
  overflow: hidden;
  gap: 12px;
  padding: 0 12px;
  background-color: ${(props) => (props.active ? Color.BRAND_100 : Color.NEUTRAL_00)};
  &:hover {
    background-color: ${(props) => (props.active ? Color.BRAND_100 : Color.NEUTRAL_100)};
  }
  transition: 0.15s ease background-color;
`;

const Label = styled.span<{ open: boolean; active: boolean }>`
  ${Typography.SUBHEAD_3};
  color: ${(props) => (props.active ? Color.BRAND_800 : Color.NEUTRAL_700)};
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition:
    0.3s ease opacity,
    0.3s ease color;
`;

const IconContainer = styled.div`
  width: max-content;
  height: max-content;
`;
