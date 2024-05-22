"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { FilterDropdown, FilterLabel } from "ui/components";
import { Color, Typography } from "ui/styles";
import { useQueryParams } from "@/app/hooks/useQueryParams";

import MOCKS from "./_mocks";

const FILTERS = ["base_currency", "foreign_currency", "exposure_id", "category"] as const;
type Filter = (typeof FILTERS)[number];

const filterLabel: Record<Filter, string> = {
  base_currency: "Base currency",
  foreign_currency: "Foreign currency",
  exposure_id: "Exposure ID",
  category: "Category",
};

export function DashboardFilters() {
  const [filterOptions, setFilterOptions] = useState<Record<Filter, string[]>>();
  const { params, append, remove, getAll } = useQueryParams();

  const filterEntries = Object.entries(getAll([...FILTERS])) as [Filter, string[]][];
  const appliedFilters = filterEntries.filter(([, options]) => options.length > 0);

  function addFilter(filter: Filter) {
    return (value: string) => {
      params.getAll(filter).includes(value) ? remove(filter, value) : append(filter, value);
    };
  }

  useEffect(() => {
    MOCKS.getFilterOptions()
      .then((response) => setFilterOptions(response))
      .catch(() => setFilterOptions(undefined));
  }, []);

  return (
    <Container>
      <Row>
        <FilterBy>Filter by</FilterBy>
        {FILTERS.map((filter) => (
          <FilterDropdown
            key={filter}
            filter={filterLabel[filter]}
            options={filterOptions?.[filter] ?? []}
            onSelect={addFilter(filter)}
            active={params.getAll(filter) ?? []}
          />
        ))}
      </Row>
      {appliedFilters.length > 0 ? (
        <Row>
          {appliedFilters.map(([filter, filters]) => {
            return filters.map((value) => (
              <FilterLabel
                key={`${filter}:${value}`}
                filter={filterLabel[filter]}
                value={value}
                onDelete={() => remove(filter, value)}
              />
            ));
          })}
        </Row>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  ${Typography.BODY_2};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const FilterBy = styled.span`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_700};
`;
