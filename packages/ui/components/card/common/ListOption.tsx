import React, { type ReactNode } from "react";
import styled from "styled-components";
import { Checkbox, Icon, type IconName } from "../../../components";
import { RadioButton } from "../../../components/input/option/RadioButton";
import { Color, Typography } from "../../../styles";

interface Props {
  active: boolean;
  label: ReactNode;
  onClick: () => void;
  icon?: IconName;
  multi?: boolean;
  disabled?: boolean;
}

export const ListOption: React.FunctionComponent<Props> = ({
  active,
  label,
  onClick,
  icon,
  multi,
  disabled,
}) => {
  return (
    <Container active={active}>
      <Option>
        {icon && <Icon name={icon} color={Color.NEUTRAL_900} />}
        {label}
      </Option>
      {multi ? (
        <Checkbox disabled={disabled} active={active} onClick={onClick} />
      ) : (
        <RadioButton disabled={disabled} active={active} onClick={onClick} />
      )}
    </Container>
  );
};

const Container = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  min-height: 56px;
  width: 100%;
  padding: 0 16px;
  border: 1px solid ${(props) => (props.active ? Color.BRAND_800 : Color.NEUTRAL_400)};
  border-radius: 4px;
  &:hover {
    ${(props) => !props.active && `border-color: ${Color.NEUTRAL_500}`};
  }
  transition: 0.15s ease border-color;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_900};
`;
