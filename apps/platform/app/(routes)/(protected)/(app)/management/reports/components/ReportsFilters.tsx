"use client";

import styled from "styled-components";
import { FilterDropdown } from "ui/components";
import { Color, Typography } from "ui/styles";
import { useQueryParams } from "@/app/hooks/useQueryParams";

export function ReportsFilters() {
  const { params, update } = useQueryParams();

  const period = params.get("period");
  const options = ["Today", "Yesterday", "Last Week", "Last Month", "Last Year"];

  return (
    <Container>
      <FilterBy>Filter by</FilterBy>
      <FilterDropdown
        active={period ? [period] : []}
        filter="Period"
        multiple={false}
        onSelect={(filter) => update("period", filter)}
        options={options}
      />
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-left: auto;
`;

const FilterBy = styled.span`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_700};
`;
