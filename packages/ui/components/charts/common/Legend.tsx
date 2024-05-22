import React from "react";
import styled from "styled-components";
import { Color, Typography } from "../../../styles";

export interface LegendItem {
  name: string;
  color: Color;
  dashed?: boolean;
  filled?: boolean;
}

interface Props {
  items: LegendItem[];
}

export const Legend: React.FunctionComponent<Props> = ({ items }) => {
  return (
    <Container>
      {items.map(({ color, dashed, filled, name }) => (
        <Item key={name}>
          <ColorDisplay color={color} dashed={dashed} filled={filled} />
          {name}
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 20px;
  justify-content: end;
`;

const Item = styled.li`
  ${Typography.BODY_3};
  align-items: center;
  color: ${Color.NEUTRAL_900};
  display: flex;
  gap: 8px;
`;

export const ColorDisplay = styled.div<{
  color: Color;
  dashed: boolean | undefined;
  filled: boolean | undefined;
}>`
  background-color: ${(props) => (props.filled ? props.color : "transparent")};
  border-color: ${(props) => props.color};
  border-radius: 2px;
  border-style: ${(props) => (props.dashed ? "dashed" : "solid")};
  border-width: 1.5px;
  height: 10px;
  width: 10px;
`;
