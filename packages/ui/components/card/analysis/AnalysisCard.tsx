"use client";

import { format } from "date-fns";
import React from "react";
import styled from "styled-components";
import { type SimulationType } from "..";
import { Checkbox, CurrencyLabel, Icon, IconButton } from "../../../components";
import { Color, Typography } from "../../../styles";
import { Card } from "../common/Card";
import { SimulationEntry } from "./SimulationEntry";

interface Props {
  name: string;
  baseCurrency: string;
  foreignCurrency: string;
  onView: () => void;
  onCreate: () => void;
  simulations: Array<{
    title: string;
    description: string;
    date: Date;
    type: SimulationType;
  }>;
  lastRun?: Date;
  limit?: number;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onRemove?: () => void;
  emptyMessage?: string;
}

export const AnalysisCard: React.FunctionComponent<Props> = ({
  name,
  baseCurrency,
  foreignCurrency,
  onView,
  onCreate,
  simulations,
  lastRun,
  limit = 2,
  selected,
  onSelect,
  onRemove,
  emptyMessage = "No simulations in analysis",
}) => {
  return (
    <Card
      hoverable
      borderColor={selected ? Color.BRAND_800 : undefined}
      onClick={!simulations.length ? onCreate : onView}
    >
      <Row>
        {name}
        <RowSection>
          <CurrencyLabel baseCurrency={baseCurrency} quoteCurrency={foreignCurrency} />
          {onRemove ? (
            <IconButton name="remove" color={Color.NEUTRAL_900} onClick={onRemove} />
          ) : onSelect ? (
            <Checkbox active={!!selected} onClick={onSelect} />
          ) : null}
        </RowSection>
      </Row>
      <SimulationSection>
        <Simulations>
          {simulations.length ? (
            simulations
              .slice(0, limit)
              .map((simulation, index) => <SimulationEntry key={index} {...simulation} />)
          ) : (
            <Empty>{emptyMessage}</Empty>
          )}
        </Simulations>
        <ActionButton onClick={!simulations.length ? onCreate : onView}>
          {!simulations.length && <Icon name="plus" color={Color.BRAND_800} size={20} />}
          {simulations.length > limit
            ? `View ${simulations.length - limit} more`
            : simulations.length > 0
              ? "View Analysis"
              : "Create Simulation"}
        </ActionButton>
      </SimulationSection>

      {lastRun && <LastRun>Last Run {format(lastRun, "MMM dd yyyy")}</LastRun>}
    </Card>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${Color.NEUTRAL_900};
  ${Typography.SUBHEAD_3};
`;

const RowSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

const SimulationSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 188px;
  background-color: ${Color.BRAND_50};
  border-radius: 4px;
  padding: 12px;
`;

const Simulations = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${Color.BRAND_800};
  ${Typography.SUBHEAD_2};
  display: flex;
  gap: 4px;
  padding: 0 4px;
  cursor: pointer;
  &:focus {
    text-decoration: underline;
  }
  width: min-content;
  white-space: nowrap;
`;

const LastRun = styled.div`
  ${Typography.LABEL_4};
  color: ${Color.NEUTRAL_700};
`;

const Empty = styled.span`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_700};
`;
