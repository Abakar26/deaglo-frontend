"use client";
import { useQueryParams } from "@/app/hooks";
import { type PartialHedgeSimulation } from "@/app/interface";
import { useState } from "react";
import styled from "styled-components";
import { Color } from "ui/styles";
import { usePageConfirmation } from "../../../hooks";
import { HedgeBuilder, type BuildStep } from "./builder";
import { Overview } from "./components";
import { LeaveHedgeIRRModal } from "./modals";

const HedgeSimulationPage = ({ params }: { params: { slug: string } }) => {
  const { update } = useQueryParams();
  const [overview, setOverview] = useState<boolean>(false);
  const [simulation, setSimulation] = useState<PartialHedgeSimulation>();

  usePageConfirmation("/hedge-simulation", LeaveHedgeIRRModal);

  const onSimulation = (simulation: PartialHedgeSimulation) => {
    setOverview(true);
    setSimulation(simulation);
  };

  const onEdit = (step: BuildStep) => {
    update("step", step);
    setTimeout(() => setOverview(false), 300);
  };

  return (
    <>
      {overview && simulation ? (
        <Overview hedge={simulation} onEdit={onEdit} />
      ) : (
        <Container>
          <HedgeBuilder
            simulation={simulation}
            onSave={onSimulation}
            onAbort={() => setOverview(true)}
          />
        </Container>
      )}
    </>
  );
};

export default HedgeSimulationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background: ${Color.NEUTRAL_00};
  width: 100%;
  border-radius: 8px;
`;
