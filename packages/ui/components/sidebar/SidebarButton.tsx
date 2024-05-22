import React from "react";
import styled from "styled-components";
import { Icon } from "..";
import { Color } from "../../styles";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SiderbarButton: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  return (
    <Container
      onClick={() => setOpen(!open)}
      aria-label={open ? "Sidebar collapse" : "Sidebar expand"}
    >
      <Icon name={open ? "sidebar-collapse" : "sidebar-expand"} color={Color.NEUTRAL_700} />
    </Container>
  );
};

const Container = styled.button`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -24px;
  top: 32px;
  background-color: ${Color.NEUTRAL_00};
  border: 1px solid ${Color.NEUTRAL_400};
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${Color.NEUTRAL_100};
  }
  transition: 0.15s ease background-color;
`;
