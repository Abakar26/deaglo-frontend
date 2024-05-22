"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { FilterDropdown, FilterLabel } from "ui/components";
import { Color, Typography } from "ui/styles";
import { useQueryParams } from "@/app/hooks/useQueryParams";

import MOCKS from "./_mocks";

const SUMMARY_FILTERS = ["exposure_id"] as const;
type SummaryFilter = (typeof SUMMARY_FILTERS)[number];

const filterLabel: Record<SummaryFilter, string> = {
  exposure_id: "Exposure ID",
};

export function SummaryFilters() {
  const [filterOptions, setFilterOptions] = useState<Record<SummaryFilter, string[]>>();
  const { params, append, remove, getAll } = useQueryParams();

  const appliedFilters = (
    Object.entries(getAll([...SUMMARY_FILTERS])) as [SummaryFilter, string[]][]
  ).filter(([, options]) => options.length > 0);

  function addFilter(filter: SummaryFilter) {
    return (value: string) => {
      params.getAll(filter).includes(value) ? remove(filter, value) : append(filter, value);
    };
  }

  useEffect(() => {
    MOCKS.getFilters()
      .then((response) => setFilterOptions(response))
      .catch(() => setFilterOptions(undefined));
  }, []);

  return (
    <Container>
      <Row>
        <FilterBy>Filter by</FilterBy>
        {SUMMARY_FILTERS.map((filter) => (
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
