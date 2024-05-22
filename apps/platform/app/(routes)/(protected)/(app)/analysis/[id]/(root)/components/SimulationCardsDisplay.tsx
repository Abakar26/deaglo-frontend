"use client";

import React from "react";
import {
  SimulationCard,
  SimulationMode,
  SimulationStatus,
  type SimulationType,
} from "ui/components";

import { useUrl } from "@/app/hooks/useUrl";
import { type SimulationInstance } from "@/app/interface";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { useSimulationCardMenu } from "../hooks";
import { SimulationCardGraph } from "./SimulationCardGraph";

interface SimulationCardsDisplayProps {
  simulations: SimulationInstance[];
  executeStrategy: boolean;
  selectedSimulations: string[];
  setSelectedSimulations: React.Dispatch<React.SetStateAction<string[]>>;
  listView: boolean;
}

const SimulationCardsDisplay: React.FC<SimulationCardsDisplayProps> = ({
  simulations,
  executeStrategy,
  selectedSimulations,
  setSelectedSimulations,
  listView,
}) => {
  const { append } = useUrl();
  const { id: analysisId } = useParams<{ id: string }>();
  const menuHandler = useSimulationCardMenu(analysisId);

  return (
    <>
      <GridContainer listView={listView}>
        {simulations.map((simulation, index) => {
          return (
            <SimulationCard
              title={simulation.name}
              description={simulation.status}
              type={simulation.type as SimulationType}
              key={simulation.id}
              menu={menuHandler(simulation)}
              status={
                simulation?.simulationStatus
                  ? (simulation.simulationStatus
                      .replace(" ", "_")
                      ?.toUpperCase() as SimulationStatus)
                  : SimulationStatus.ENQUEUED
              }
              pinned={simulation.pin}
              mode={executeStrategy ? SimulationMode.STRATEGY : SimulationMode.DEFAULT}
              selected={selectedSimulations.includes(index.toString())}
              onSelect={() => setSelectedSimulations([...selectedSimulations, index.toString()])}
              onClick={() => append(`${simulation.type}_${simulation.id}`)}
              lastRun={new Date(simulation.dateUpdated)}
            >
              <SimulationCardGraph simulation={simulation} />
            </SimulationCard>
          );
        })}
      </GridContainer>
    </>
  );
};

export default SimulationCardsDisplay;

const GridContainer = styled.div<{ listView: boolean }>`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${(props) => (props.listView ? "450px" : "328px")}, 1fr)
  );
`;
