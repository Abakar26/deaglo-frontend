"use client";

import { SimulationInteractor } from "@/app/interactors";
import type { SimulationInstance } from "@/app/interface";
import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "ui/components";
import { Color } from "ui/styles";
import { LoadMore } from ".";
import { usePaginate } from "../../../../hooks/usePaginate";
import { useAnalysisDetailStore } from "../store";
import { RunSimulationCard } from "./RunSimulationCard";
import SimulationCardsDisplay from "./SimulationCardsDisplay";
import { SimulationFilters } from "./SimulationFilters";

interface Props {
  simulations: Array<SimulationInstance>;
  id: string;
  searchParams: URLSearchParams;
  count?: number;
  order?: string;
}

export const AppViewSimulations: React.FunctionComponent<Props> = ({
  simulations,
  id,
  searchParams,
  count,
}) => {
  const [listView, setListView] = useState(false);
  const [selectedSimulations, setSelectedSimulations] = useState<string[]>([]);
  const { executeStrategy } = useAnalysisDetailStore();
  const { getPaginatedData } = SimulationInteractor.strategy;

  const { nextPage, paginatedData } = usePaginate<SimulationInstance>(
    simulations ?? [],
    id,
    searchParams,
    getPaginatedData
  );

  return (
    <>
      <SimulationFilters />
      <IconContainer>
        <IconButton
          name="list"
          stroke={listView ? Color.BRAND_800 : Color.NEUTRAL_700}
          onClick={() => setListView(true)}
        />
        <IconButton
          name="grid"
          stroke={!listView ? Color.BRAND_800 : Color.NEUTRAL_700}
          onClick={() => setListView(false)}
        />
      </IconContainer>
      {!simulations.length ? (
        <RunSimulationCard />
      ) : (
        <>
          <SimulationCardsDisplay
            simulations={paginatedData ?? []}
            executeStrategy={executeStrategy}
            selectedSimulations={selectedSimulations}
            setSelectedSimulations={setSelectedSimulations}
            listView={listView}
          />
          {count !== paginatedData?.length && (
            <LoadMore nextPage={nextPage} text={"Load more Simulations"} />
          )}
        </>
      )}
    </>
  );
};

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
`;
