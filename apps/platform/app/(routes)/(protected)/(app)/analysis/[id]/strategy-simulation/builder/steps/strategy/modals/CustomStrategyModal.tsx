"use client";

import { type PartialStrategy, type Strategy, type Leg as StrategyLeg } from "@/app/interface";
import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  InsertArea,
  LegCard,
  SideModal,
  SuspenseBlock,
  TextInput,
  type Leg,
} from "ui/components";
import { useCustomStrategy } from "../../../hooks/useCustomStrategy";
import { StrikeGraph } from "../components/StrikeGraph";
import { useHistoricalSpot } from "../hooks";

interface Props {
  strategy?: Strategy;
  onDismiss: () => void;
  onUpsert: (strategy: Strategy) => void;
}

const INITIAL_LEG: Leg = {
  id: "1",
  action: "Bought",
  leverage: 1,
  option: "Call",
  strike: 0,
  type: "Vanilla",
};

export const CustomStrategyModal: React.FunctionComponent<Props> = ({
  strategy,
  onUpsert,
  onDismiss,
}) => {
  const [strategyName, setStrategyName] = useState<string>(strategy?.name ?? "");
  const [legs, setLegs] = useState<Array<Leg>>(
    strategy ? legAdaptor(strategy.legs) : [INITIAL_LEG]
  );
  const [highlightedLegId, setHighlightedLegId] = useState<string>("-1");
  const { update, create, loading } = useCustomStrategy();

  const { spotHistoryData } = useHistoricalSpot();

  const onSave = async () => {
    const _legs = strategyLegAdaptor(legs);
    const _strategy: PartialStrategy = {
      name: strategyName,
      legs: _legs,
      description: "Custom Strategy",
    };
    const success = await (strategy
      ? update(strategy?.strategyId ?? "", _strategy)
      : create(_strategy));
    success && onUpsert(success);
    onDismiss();
  };

  const onDragStart = (legId: string) => {
    setHighlightedLegId(legId);
  };

  const addNewLeg = () => {
    setLegs((currentLegs) => [
      ...currentLegs,
      {
        ...INITIAL_LEG,
        id: String(legs.reduce((maxId, leg) => Math.max(maxId, parseInt(leg.id!, 10)), 0) + 1),
      },
    ]);
  };

  const onDelete = (legId: string) => {
    setHighlightedLegId((currentDraggedLegId) =>
      currentDraggedLegId === legId ? "-1" : currentDraggedLegId
    );
    setLegs((currentLegs) => currentLegs.filter((leg) => leg.id !== legId));
  };

  const onChange = (leg: Leg, index: number) => {
    setLegs((currentLegs) => [
      ...currentLegs.slice(0, index),
      leg,
      ...currentLegs.slice(index + 1),
    ]);
  };

  return (
    <SideModal
      onDismiss={onDismiss}
      title={strategy ? "Edit Custom Strategy" : "Create Custom Strategy"}
      description="Customize your desired functionality. You can add upto 4 legs"
      width={822}
    >
      <Container>
        <Row>
          <TextInput
            label={"Name"}
            placeholder={"Strategy Name"}
            value={strategyName}
            onChange={setStrategyName}
          />
          <Button
            label={strategy ? "Save changes" : "Create strategy"}
            resizeMode="fit"
            onClick={() => void onSave()}
            disabled={legs.some((leg) => !isLegValid(leg)) || !strategyName}
            loading={loading}
          />
        </Row>

        <GraphSection>
          {spotHistoryData ? (
            <StrikeGraph
              legs={legs}
              spotHistoryData={spotHistoryData}
              onChange={(leg: Leg, id: string) =>
                onChange(
                  leg,
                  legs.findIndex((leg) => leg.id === id)
                )
              }
              onDragStart={onDragStart}
            />
          ) : (
            <SuspenseBlock width={"100%"} height={"452px"} />
          )}
        </GraphSection>

        {/* Render only the highlighted card if it exists */}
        {highlightedLegId &&
          legs
            .filter((leg) => leg.id === highlightedLegId)
            .map((leg) => (
              <LegCard
                key={leg.id}
                title={`Leg ${legs.findIndex((l) => l.id === leg.id) + 1}`}
                parameters={leg}
                onDelete={() => onDelete(leg.id!)}
                onChange={(updatedLeg) =>
                  onChange(
                    updatedLeg,
                    legs.findIndex((l) => l.id === leg.id)
                  )
                }
                highlighted={true}
              />
            ))}

        {/* Render the rest of the cards */}
        {legs.map(
          (leg, index) =>
            leg.id !== highlightedLegId && (
              <LegCard
                key={leg.id}
                title={`Leg ${index + 1}`}
                parameters={leg}
                onDelete={() => onDelete(leg.id!)}
                onChange={(updatedLeg) => onChange(updatedLeg, index)}
                highlighted={false}
              />
            )
        )}

        {legs.length < 4 && (
          <AddContainer>
            <InsertArea label="Add Leg" icon="plus" onClick={addNewLeg} />
          </AddContainer>
        )}
      </Container>
    </SideModal>
  );
};

const isLegValid = (leg: Leg) => {
  if (
    leg.action &&
    leg.option &&
    leg.leverage !== undefined &&
    leg.strike !== undefined &&
    (!leg.barrierType || leg.barrierLevel)
  ) {
    return (
      leg.leverage >= 0 &&
      leg.leverage <= 1 &&
      leg.strike >= -100 &&
      leg.strike <= 100 &&
      (!leg.barrierLevel || (leg.barrierLevel <= 100 && leg.barrierLevel >= -100))
    );
  }
  return false;
};

export const strategyLegAdaptor = (legs: Array<Leg>): Array<StrategyLeg> => {
  return legs.map((leg) => {
    return {
      strategyLegId: leg.id ?? "",
      isBought: leg.action === "Bought",
      isCall: leg.option === "Call" ? true : leg.option === "Put" ? false : null,
      premium: leg.premium ?? 0,
      leverage: leg.leverage ?? 0,
      strike: leg.strike ?? 0,
      ...leg,
    };
  });
};

export const legAdaptor = (legs: Array<StrategyLeg>): Array<Leg> => {
  return legs.map((leg) => ({
    id: leg.strategyLegId,
    type: !!leg.barrierType ? "Barrier" : "Vanilla",
    action: leg.isBought ? "Bought" : "Sold",
    option: leg.isCall === null ? "Forward" : leg.isCall ? "Call" : "Put",
    ...leg,
  }));
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
`;

const AddContainer = styled.div`
  width: 100%;
  height: 64px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const GraphSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
