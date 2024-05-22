"use client";
import React from "react";
import { styled } from "styled-components";
import { Button, ButtonType, InsertArea, SmallButton } from "ui/components";
import { Color, Typography } from "ui/styles";
import { useHedgeSimulationStore } from "../store";

interface Props {
  fwdPoints: Array<{
    date: Date;
    points: number;
  }>;
}

export const EditScenarios: React.FunctionComponent<Props> = ({ fwdPoints }) => {
  const { setEditHedge } = useHedgeSimulationStore();

  return (
    <Container>
      <Section>
        <Heading>
          Selected Environment{" "}
          <SmallButton leadingIcon="pencil" label="Edit" onClick={() => null} />
        </Heading>
        <CardsContainer>
          {fwdPoints.map((_) => (
            <>
              <Chart>
                <InsertArea label="Hedge FWD points cards" />
              </Chart>
            </>
          ))}
        </CardsContainer>
      </Section>
      <Row>
        Creating a new Simulation <br />
        result may take up to 1 minute
        <Button
          label="Cancel"
          type={ButtonType.OUTLINE}
          onClick={() => setEditHedge(undefined)}
          resizeMode="fit"
        />
        <Button label="Save" onClick={() => setEditHedge(undefined)} resizeMode="fit" />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 32px;
  gap: 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const Chart = styled.div`
  width: 316px;
  height: 374px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  text-align: end;
  gap: 24px;
  color: ${Color.NEUTRAL_700};
  ${Typography.BODY_3};
  margin-top: 40px;
`;
