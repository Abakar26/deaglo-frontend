import React from "react";
import styled from "styled-components";
import { Icon, IconButton, type IconName } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  label: string;
  icon: IconName;
  onDelete?: () => void;
  onClick: () => void;
}

export const ToolButton: React.FunctionComponent<Props> = ({ label, icon, onDelete, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Label>
        <Icon name={icon} size={20} color={Color.NEUTRAL_900} />
        {label}
      </Label>
      {onDelete && (
        <IconButton name="trash" onClick={onDelete} color={Color.NEUTRAL_900} size={20} />
      )}
    </Container>
  );
};

const Container = styled.button`
  max-width: 480px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  min-height: 40px;
  width: 100%;
  padding: 0 12px;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: ${Color.NEUTRAL_100};
  &:hover {
    background-color: ${Color.NEUTRAL_300};
  }
  transition: 0.15s ease background-color;
  overflow: hidden;
  cursor: pointer;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${Typography.BODY_1};
  color: ${Color.NEUTRAL_900};
`;
