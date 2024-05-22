"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  FilterDateRange,
  FilterDropdown,
  FilterLabel,
  type DateInterval,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { useQueryParams } from "@/app/hooks/useQueryParams";

import MOCKS from "./_mocks";

const FILTERS = ["exposure_id", "exposure_type"] as const;
type Filters = (typeof FILTERS)[number];

const filterLabel: Record<Filters, string> = {
  exposure_id: "Exposure ID",
  exposure_type: "Exposure Type",
};

export function ExposureFilters() {
  const { params, append, update, remove, getAll } = useQueryParams();

  const [filterOptions, setFilterOptions] = useState<Record<Filters, string[]>>();
  const [dateInterval, setDateInterval] = useState(getDateInterval(params));

  const appliedDropdownFilters = (
    Object.entries(getAll([...FILTERS])) as [Filters, string[]][]
  ).filter(([, options]) => options.length > 0);

  function handleDropdownFilter(filter: Filters) {
    return (value: string) => {
      params.getAll(filter).includes(value) ? remove(filter, value) : append(filter, value);
    };
  }

  function getDateInterval(params: URLSearchParams) {
    const intervalString = params.get("interval");
    if (!intervalString) return undefined;

    const [startString, endString] = intervalString.split(" ");
    if (!startString || !endString) return undefined;

    const interval: DateInterval = { start: new Date(startString), end: new Date(endString) };
    return interval;
  }

  function onSelectDateInterval(interval: DateInterval | undefined) {
    setDateInterval(interval);

    if (interval?.start && interval?.end) {
      const start = interval.start.toISOString();
      const end = interval.end.toISOString();

      update("interval", `${start}+${end}`);
    } else {
      remove("interval");
    }
  }

  function onOpenSettings() {
    // TODO: Add feature when implemented
    return alert("TODO");
  }

  useEffect(() => {
    MOCKS.getFilters()
      .then((response) => setFilterOptions(response))
      .catch(() => setFilterOptions(undefined));
  }, []);

  return (
    <Container>
      <FiltersContainer>
        <LeftFilters>
          <FilterBy>Filter by</FilterBy>
          {FILTERS.map((filter) => (
            <FilterDropdown
              key={filter}
              active={params.getAll(filter) ?? []}
              filter={filterLabel[filter]}
              options={filterOptions?.[filter] ?? []}
              onSelect={handleDropdownFilter(filter)}
            />
          ))}
          <FilterDateRange interval={dateInterval} onChange={onSelectDateInterval} />
        </LeftFilters>
        <Button
          leadingIcon="settings"
          resizeMode="fit"
          type={ButtonType.OUTLINE}
          onClick={onOpenSettings}
        />
      </FiltersContainer>
      {appliedDropdownFilters.length > 0 ? (
        <AppliedFilters>
          {appliedDropdownFilters.map(([filter, filters]) => {
            return filters.map((value) => (
              <FilterLabel
                key={`${filter}:${value}`}
                filter={filterLabel[filter]}
                value={value}
                onDelete={() => remove(filter, value)}
              />
            ));
          })}
        </AppliedFilters>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 16px;
  justify-content: space-between;
`;

const FilterBy = styled.span`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_700};
`;

const LeftFilters = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

const AppliedFilters = styled.div`
  ${Typography.BODY_2};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
