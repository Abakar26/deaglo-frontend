import { format } from "date-fns";
import React from "react";
import styled from "styled-components";
import { CardIcon, CardIconColor } from "..";
import { Color, Typography } from "../../../styles";
import { getSimulationIcon, type SimulationType } from "../simulation";

interface Props {
  title: string;
  description: string;
  date: Date;
  type: SimulationType;
}

export const SimulationEntry: React.FunctionComponent<Props> = ({
  title,
  description,
  date,
  type,
}) => {
  return (
    <Container>
      <Simulation>
        <CardIcon {...getSimulationIcon(type)} color={CardIconColor.BRAND_300} />
        <Column>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Column>
      </Simulation>
      {format(date, "MMM dd yyyy")}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${Typography.LABEL_4};
  color: ${Color.NEUTRAL_700};
  white-space: nowrap;
`;

const Simulation = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.span`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_900};
  white-space: nowrap;
`;

const Description = styled.div`
  ${Typography.LABEL_4};
  color: ${Color.NEUTRAL_700};
  white-space: nowrap;
`;
