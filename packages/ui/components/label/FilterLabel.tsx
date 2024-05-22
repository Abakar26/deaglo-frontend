import React from "react";
import styled from "styled-components";
import { Icon, type IconName } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  filter: string;
  value: string | JSX.Element;
  icon?: IconName;
  onDelete: () => void;
}

export const FilterLabel: React.FunctionComponent<Props> = ({ filter, value, icon, onDelete }) => {
  return (
    <Container>
      {filter}
      <Value>
        {icon && <Icon name={icon} size={20} defaultSize={26} />}
        {value}
        <Exit onClick={onDelete} aria-label={"Delete filter"}>
          <Icon name="x" color={Color.NEUTRAL_900} size={20} />
        </Exit>
      </Value>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: min-content;
  min-height: 28px;
  padding-left: 8px;
  gap: 8px;
  background-color: ${Color.NEUTRAL_400};
  border-radius: 4px;
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_900};
  overflow: hidden;
  white-space: nowrap;
  text-transform: capitalize;
`;

const Value = styled.div`
  background-color: ${Color.NEUTRAL_300};
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 28px;
  padding: 2px 8px;
  width: min-content;
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_900};
  white-space: nowrap;
`;

const Exit = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
