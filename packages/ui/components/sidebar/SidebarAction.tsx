import React from "react";
import styled from "styled-components";
import { Button, ButtonType, Icon, type IconName } from "..";
import { Color, Typography } from "../../styles";

export interface SidebarActionProps {
  title: string;
  icon: IconName;
  label: string;
  onClick: () => void;
}

interface Props {
  open: boolean;
}

export const SidebarAction: React.FunctionComponent<SidebarActionProps & Props> = ({
  title,
  icon,
  label,
  open,
  onClick,
}) => {
  return (
    <Container>
      <Content open={open}>
        <Icon name={icon} color={Color.NEUTRAL_700} />
        {title}
      </Content>
      <Button
        onClick={onClick}
        label={open ? label : undefined}
        leadingIcon={open ? undefined : icon}
        type={ButtonType.OUTLINE}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 12px;
`;

const Content = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_900};
  text-align: center;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: 0.15s ease opacity;
  white-space: nowrap;
  overflow: hidden;
`;
