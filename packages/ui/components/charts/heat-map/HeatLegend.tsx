import React from "react";
import styled from "styled-components";
import { HEAT_COLORS } from ".";
import { Color, Typography } from "../../../styles";

interface Props {
  min: string;
  max: string;
}

export const HeatLegend: React.FunctionComponent<Props> = ({ min, max }) => {
  return (
    <Container>
      {min}
      <HeatColors>
        {HEAT_COLORS.map((color) => (
          <HeatColor key={color} heatColor={color} />
        ))}
      </HeatColors>
      {max}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_900};
`;

const HeatColors = styled.div`
  border-radius: 2px;
  overflow: hidden;
  width: 104px;
  height: 10px;
  display: flex;
`;

const HeatColor = styled.div<{ heatColor: Color }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.heatColor};
`;
