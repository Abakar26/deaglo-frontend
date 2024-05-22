"use client";

import { useQueryParams } from "@/app/hooks/useQueryParams";
import { useCurrencyStore } from "@/app/store/CurrencyStates";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FilterDropdown, FilterLabel, type Selectable } from "ui/components";
import { Color, Typography } from "ui/styles";

export enum AnalysisFilter {
  BASE = "base_currency",
  FOREIGN = "foreign_currency",
  ORGANIZATION = "organization",
  CATEGORY = "category",
  ORDER = "order_by",
}

export const AnalysisFilters: React.FunctionComponent = () => {
  const { params, append, update, remove, getAll } = useQueryParams();
  const { currencies } = useCurrencyStore();

  const availableCurrencies: Array<Selectable> = useMemo(
    () =>
      currencies.map(({ code, name, countryName }) => ({
        key: code,
        value: `${code} - ${name}`,
        flag: countryName,
      })),
    [currencies]
  );

  const [baseCurrencySearch, setBaseCurrencySearch] = useState("");
  const [foreignCurrencySearch, setForeignCurrencySearch] = useState("");
  const [filteredBaseCurrencies, setFilteredBaseCurrencies] =
    useState<Array<Selectable>>(availableCurrencies);
  const [filteredForeignCurrencies, setFilteredForeignCurrencies] =
    useState<Array<Selectable>>(availableCurrencies);

  const analysisSortType = (value?: string) => {
    switch (value) {
      case "Most recent":
        return "-date_added";
      case "Last updated":
        return "-date_updated";
      case "Alphabetical":
        return "name";
      default:
        return "";
    }
  };

  const addFilter = (filter: AnalysisFilter) => {
    return (value: string) => {
      params.getAll(filter).includes(value) ? remove(filter, value) : append(filter, value);
    };
  };

  const sortAnalysis = (filter: AnalysisFilter) => {
    return (value: string) => {
      params.getAll(filter).includes(analysisSortType(value))
        ? remove(filter)
        : update(filter, analysisSortType(value));
    };
  };

  const filters = getAll([
    AnalysisFilter.BASE,
    AnalysisFilter.FOREIGN,
    AnalysisFilter.ORGANIZATION,
    AnalysisFilter.CATEGORY,
  ]);

  useEffect(() => {
    const filteredBase = availableCurrencies.filter((currency) =>
      currency.value.toLowerCase().includes(baseCurrencySearch.toLowerCase())
    );
    setFilteredBaseCurrencies(filteredBase);
    const filteredForeign = availableCurrencies.filter((currency) =>
      currency.value.toLowerCase().includes(foreignCurrencySearch.toLowerCase())
    );
    setFilteredForeignCurrencies(filteredForeign);
  }, [baseCurrencySearch, foreignCurrencySearch, availableCurrencies]);

  const handleBaseCurrencySearch = (searchTerm: string) => {
    setBaseCurrencySearch(searchTerm);
  };

  const handleForeignCurrencySearch = (searchTerm: string) => {
    setForeignCurrencySearch(searchTerm);
  };

  return (
    <Container>
      <Row>
        <RowSection>
          Filter by
          <FilterDropdown
            filter={"Base currency"}
            options={filteredBaseCurrencies}
            onSelect={(currency) => addFilter(AnalysisFilter.BASE)(currency.key)}
            active={availableCurrencies.filter(({ key }) =>
              (params.getAll(AnalysisFilter.BASE) ?? []).includes(key)
            )}
            onSearch={handleBaseCurrencySearch}
            search={baseCurrencySearch}
          />
          <FilterDropdown
            filter={"Foreign currency"}
            options={filteredForeignCurrencies}
            onSelect={(currency) => addFilter(AnalysisFilter.FOREIGN)(currency.key)}
            active={availableCurrencies.filter(({ key }) =>
              (params.getAll(AnalysisFilter.FOREIGN) ?? []).includes(key)
            )}
            onSearch={handleForeignCurrencySearch}
            search={foreignCurrencySearch}
          />
          {/* <FilterDropdown
            filter={"Organization"}
            options={["Deaglo"]}
            onSelect={addFilter(AnalysisFilter.ORGANIZATION)}
            active={params.getAll(AnalysisFilter.ORGANIZATION) ?? []}
          /> */}
          <FilterDropdown
            filter={"Category"}
            options={["Foreign share class", "Operational FX", "Foreign investment"]}
            onSelect={addFilter(AnalysisFilter.CATEGORY)}
            active={params.getAll(AnalysisFilter.CATEGORY) ?? []}
          />
        </RowSection>

        <FilterDropdown
          filter={"Order By"}
          options={["Most recent", "Last updated", "Alphabetical"]}
          onSelect={sortAnalysis(AnalysisFilter.ORDER)}
          active={params.getAll(AnalysisFilter.ORDER) ?? []}
        />
      </Row>
      <RowSection>
        {Object.entries(filters).map(([filter, filters]) => {
          return filters.map((value) => (
            <FilterLabel
              key={`${filter}:${value}`}
              filter={filter.replace("_", " ")}
              value={value}
              icon={availableCurrencies.find(({ key }) => key === value)?.icon}
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
  margin-bottom: 24px;
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
