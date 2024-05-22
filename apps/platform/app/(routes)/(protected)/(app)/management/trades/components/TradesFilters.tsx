"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, FilterDropdown, FilterLabel, Toggle } from "ui/components";
import { Color, Typography } from "ui/styles";
import { useQueryParams } from "@/app/hooks/useQueryParams";

import MOCKS from "./_mocks";

const DROPDOWN_FILTERS = ["exposure_id", "reference", "month"] as const;
const TOGGLE_FILTERS = ["editable_info", "ndf", "option"] as const;

type DropdownFilters = (typeof DROPDOWN_FILTERS)[number];
type ToggleFilters = (typeof TOGGLE_FILTERS)[number];
type TradesFilters = DropdownFilters | ToggleFilters;

const filterLabel: Record<TradesFilters, string> = {
  exposure_id: "Exposure ID",
  reference: "Reference",
  month: "Month",
  editable_info: "Editable info",
  ndf: "NDF",
  option: "Option",
};

export function TradesFilters() {
  const [filterOptions, setFilterOptions] = useState<Record<DropdownFilters, string[]>>();
  const { params, append, update, remove, getAll } = useQueryParams();

  const appliedDropdownFilters = (
    Object.entries(getAll([...DROPDOWN_FILTERS])) as [DropdownFilters, string[]][]
  ).filter(([, options]) => options.length > 0);

  function handleDropdownFilter(filter: DropdownFilters) {
    return (value: string) => {
      params.getAll(filter).includes(value) ? remove(filter, value) : append(filter, value);
    };
  }

  function handleToggleFilter(filter: ToggleFilters, value: boolean) {
    if (value) {
      update(filter, value.toString());
    } else {
      remove(filter);
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
          {DROPDOWN_FILTERS.map((filter) => (
            <FilterDropdown
              key={filter}
              active={params.getAll(filter) ?? []}
              filter={filterLabel[filter]}
              options={filterOptions?.[filter] ?? []}
              onSelect={handleDropdownFilter(filter)}
            />
          ))}
        </LeftFilters>
        <RightFilters>
          {TOGGLE_FILTERS.map((filter) => (
            <Toggle
              key={filter}
              active={params.has(filter)}
              label={filterLabel[filter]}
              onClick={(value) => handleToggleFilter(filter, value)}
            />
          ))}
          <Button
            leadingIcon="settings"
            resizeMode="fit"
            type={ButtonType.OUTLINE}
            onClick={onOpenSettings}
          />
        </RightFilters>
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

const RightFilters = styled.div`
  display: flex;
  gap: 20px;
`;

const AppliedFilters = styled.div`
  ${Typography.BODY_2};
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;
