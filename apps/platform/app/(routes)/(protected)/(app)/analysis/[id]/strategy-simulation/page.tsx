"use client";
import { useState } from "react";
import { type BuildStep, StrategyBuilder } from "./builder";
import styled from "styled-components";
import { Color } from "ui/styles";
import { type PartialStrategySimulation } from "@/app/interface";
import { useQueryParams } from "@/app/hooks";
import { StrategyOverview } from "./components";
import { usePageConfirmation } from "../../../hooks";
import { useParams } from "next/navigation";
import { LeaveStrategySimulationModal } from "./modals";

const CreateStrategySimulation = () => {
  const { update } = useQueryParams();
  const [overview, setOverview] = useState<boolean>(false);
  const [simulation, setSimulation] = useState<PartialStrategySimulation>();

  usePageConfirmation("/strategy-simulation", LeaveStrategySimulationModal);

  const onSimulation = (simulation: PartialStrategySimulation) => {
    setOverview(true);
    setSimulation(simulation);
  };

  const onEdit = (step: BuildStep) => {
    update("step", step);
    setTimeout(() => setOverview(false), 300);
  };

  return (
    <Container>
      {overview && simulation ? (
        <StrategyOverview strategy={simulation} onEdit={onEdit} />
      ) : (
        <StrategyBuilder
          simulation={simulation}
          onSave={onSimulation}
          onAbort={() => setOverview(true)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${Color.NEUTRAL_00};
  border-radius: 8px;
`;

export default CreateStrategySimulation;
