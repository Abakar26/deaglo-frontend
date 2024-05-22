"use client";

import { useQueryParams } from "@/app/hooks/useQueryParams";
import React from "react";
import styled from "styled-components";
import { FilterDropdown, FilterLabel } from "ui/components";
import { Color, Typography } from "ui/styles";

export enum SimulationFilter {
  Type = "type",
  Status = "status",
  Date = "date",
  Order = "order_by",
}

export const SimulationFilters: React.FunctionComponent = () => {
  const { params, append, remove, getAll, update } = useQueryParams();

  const simulationSort = (value?: string) => {
    switch (value) {
      case "Most recent":
        return "date_added";
      case "Last updated":
        return "date_updated";
      case "Alphabetical":
        return "name";
      default:
        return "";
    }
  };
  const addFilter = (filter: SimulationFilter) => {
    return (value: string) => {
      params.getAll(filter).includes(value) ? remove(filter, value) : append(filter, value);
    };
  };

  const sortSimulations = (filter: SimulationFilter) => {
    return (value: string) => {
      params.getAll(filter).includes(simulationSort(value))
        ? remove(filter)
        : update(filter, simulationSort(value));
    };
  };

  const filters = getAll([SimulationFilter.Type, SimulationFilter.Status, SimulationFilter.Date]);

  return (
    <Container>
      <Row>
        <RowSection>
          Filter by
          <FilterDropdown
            filter="Type"
            onSelect={addFilter(SimulationFilter.Type)}
            active={params.getAll(SimulationFilter.Type) ?? []}
            options={["Strategy Simulation", "Margin Simulation", "Hedge IRR"]}
          />
          <FilterDropdown
            filter="Status"
            onSelect={addFilter(SimulationFilter.Status)}
            active={params.getAll(SimulationFilter.Status) ?? []}
            options={["In Progress", "Complete"]}
          />
        </RowSection>
        <FilterDropdown
          filter={"Order By"}
          options={["Most recent", "Last updated", "Alphabetical"]}
          onSelect={sortSimulations(SimulationFilter.Order)}
          active={params.getAll(SimulationFilter.Order) ?? []}
        />
      </Row>
      <RowSection>
        {Object.entries(filters).map(([filter, filters]) => {
          return filters.map((value) => (
            <FilterLabel
              key={`${filter}:${value}`}
              filter={filter.replace("_", " ")}
              value={value}
              onDelete={() => remove(filter, value)}
            />
          ));
        })}
      </RowSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
`;

const RowSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px 16px;
  flex-wrap: wrap;
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_700};
  white-space: nowrap;
`;
