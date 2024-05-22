import React from "react";
import styled from "styled-components";
import { Color, Typography } from "../../../styles";

interface Item {
  name: string;
  color: {
    stroke: Color;
    fill?: Color;
    dashed?: boolean;
  };
}

interface Props {
  items: Item[];
}

function getLegend(color: Item["color"]) {
  if (color.fill) return { color: color.fill, type: "filled" };
  if (color.dashed) return { color: color.stroke, type: "dashed" };
  return { color: color.stroke, type: "regular" };
}

export const Legend: React.FunctionComponent<Props> = ({ items }) => {
  return (
    <Container>
      {items.map(({ color, name }) => (
        <Item key={name}>
          <ColorDisplay color={getLegend(color).color} type={getLegend(color).type} />
          {name}
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px 20px;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${Color.NEUTRAL_900};
  ${Typography.BODY_3};
`;

export const ColorDisplay = styled.div<{ color: Color; type: string }>`
  background-color: ${(props) => (props.type === "filled" ? props.color : "transparent")};
  border-color: ${(props) => props.color};
  border-style: ${(props) => (props.type === "dashed" ? "dashed" : "solid")};
  border-width: 1.5px;
  border-radius: 2px;
  height: 10px;
  width: 10px;
`;
