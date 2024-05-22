"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { type StrategySimulation } from "../../../../interface";
import { useQueryParams } from "@/app/hooks";
import { useStrategySimulationStore } from "../../store";
import { Amount, Environment, Tenor } from "./sections";
import { Button, ButtonType } from "ui/components";
import { useEditMode } from "../../../../hooks/useEditMode";
import { EditStrategyStepper } from "./EditStrategyStepper";
import {
  StrategiesTabBar,
  StrategyList,
} from "@/app/(routes)/(protected)/(app)/analysis/[id]/strategy-simulation/components";
import {
  getStrategies,
  type Strategies,
} from "@/app/(routes)/(protected)/(app)/analysis/[id]/strategy-simulation/page";
import { useSelectedStrategiesStore } from "@/app/(routes)/(protected)/(app)/analysis/[id]/strategy-simulation/store";

export enum EditStrategyStep {
  TENOR = "TENOR",
  AMOUNT = "AMOUNT",
  ENVIRONMENT = "ENVIRONMENT",
  STRATEGY = "STRATEGY",
}

interface Props {
  simulation: StrategySimulation;
}

export const EditStrategySimulation: React.FunctionComponent<Props> = ({ simulation }) => {
  const { editStrategy, setEditStrategy } = useStrategySimulationStore();
  const { selectedStrategies } = useSelectedStrategiesStore();
  const { setEditMode } = useEditMode();
  const { params } = useQueryParams();
  const [strategies, setStrategies] = useState<Strategies[]>([]);
  useEffect(() => {
    setEditStrategy(simulation);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSave = () => {
    const temp = selectedStrategies.map((value) => {
      return {
        name: value.title,
        legs: value.legs[0] ?? [],
      };
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setEditStrategy({ ...editStrategy, strategies: temp });
    setEditStrategy(strategy as StrategySimulation);

    useEffect(() => {
      getStrategies({
        status: params.get("status") ?? "",
      })
        .then((response) => {
          setStrategies(response);
        })
        .catch((reason) => console.log(reason));
    }, [params]);

    return (
      <Container>
        <Content>
          <EditStrategyStepper />
          {strategies &&
            getEditStep(
              params.get("step") ?? EditStrategyStep.TENOR,
              params.get("status") ?? "VANILLA",
              strategies
            )}
        </Content>
        <Row>
          <Button
            label="Cancel"
            type={ButtonType.OUTLINE}
            resizeMode="fit"
            onClick={() => setEditMode(false)}
          />
          <Button label="Save Parameters" resizeMode="fit" onClick={onSave} />
        </Row>
      </Container>
    );
  };

  const getEditStep = (step: string, status: string, strategies: Strategies[]) => {
    switch (step) {
      case EditStrategyStep.TENOR:
        return <Tenor />;
      case EditStrategyStep.AMOUNT:
        return <Amount />;
      case EditStrategyStep.ENVIRONMENT:
        return <Environment />;
      case EditStrategyStep.STRATEGY:
        return (
          <>
            <StrategiesTabBar />
            <StrategyList strategies={strategies} strategyType={status} />
          </>
        );
      default:
        return <Tenor />;
    }
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  height: calc(100vh - 164px);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 24px;
`;
