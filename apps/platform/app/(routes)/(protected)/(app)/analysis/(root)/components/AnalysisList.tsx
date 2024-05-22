"use client";

import { AnalysisInteractor } from "@/app/interactors";
import type { Analysis, WorkspaceAnalysis } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { AnalysisCard, SnackbarLevel, type SimulationType } from "ui/components";
import { Color, Typography } from "ui/styles";
import { AnalysisGrid, LoadMore } from ".";
import { usePaginate } from "../../../hooks";
import { useAnalysisStore } from "../store/AnalysisStore";

interface Props {
  analyses: Array<Analysis>;
  searchParams: URLSearchParams;
  count?: number;
  showLoadMoreBtn?: boolean;
}

export const AnalysisList: React.FunctionComponent<Props> = ({
  analyses,
  count,
  searchParams,
  showLoadMoreBtn,
}) => {
  const { analysisCount, setAnalysisCount, workspace, setWorkspace } = useAnalysisStore();
  const { setSnack } = useSnackbarStore();
  const router = useRouter();

  const paginatedDataFetcher = useCallback(
    (current: number, _: string, searchParams: URLSearchParams) => {
      return AnalysisInteractor.getPaginatedData(current, searchParams);
    },
    []
  );

  const { nextPage, paginatedData } = usePaginate<Analysis>(
    analyses ?? [],
    "",
    searchParams,
    paginatedDataFetcher
  );

  useEffect(() => {
    if (count) {
      setAnalysisCount(count);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analyses]);

  const onSelect = (analysis: Analysis) => {
    return (selected: boolean) => {
      if (
        workspace?.baseCurrency?.code === analysis.baseCurrency.code ||
        workspace?.baseCurrency === null
      ) {
        const newAnalysisArray: Array<WorkspaceAnalysis> = selected
          ? [...(workspace?.analysis ?? []), analysis]
          : workspace?.analysis?.filter(
              (_analysis) => _analysis.analysisId !== analysis.analysisId
            ) ?? [];

        setWorkspace(
          workspace && newAnalysisArray
            ? {
                ...(workspace ?? []),
                analysis: newAnalysisArray ?? [],
              }
            : undefined
        );

        setSnack({
          message: `${newAnalysisArray.length} selected`,
          description: `from ${analysisCount} analyses`,
          duration: 2,
        });
      } else {
        setSnack({
          message: "Incompatible currency",
          icon: "x",
          level: SnackbarLevel.ERROR,
          duration: 2,
        });
      }
    };
  };

  const onClick = (analysis: Analysis) => {
    if (!workspace) {
      router.push(`analysis/${analysis.analysisId}`, { scroll: true });
    }
  };

  return (
    <Container>
      Analyses
      <AnalysisGrid>
        {paginatedData?.map((analysis) => (
          <AnalysisCard
            {...analysis}
            baseCurrency={analysis.baseCurrency.code}
            foreignCurrency={analysis.foreignCurrency.code}
            key={analysis.analysisId}
            onView={() => onClick(analysis)}
            onCreate={() => onClick(analysis)}
            selected={
              workspace
                ? !!workspace.analysis?.find((_analysis) =>
                    typeof _analysis === "string"
                      ? _analysis === analysis.analysisId
                      : _analysis.analysisId === analysis.analysisId
                  )
                : undefined
            }
            onSelect={workspace ? onSelect(analysis) : undefined}
            simulations={
              analysis?.simulations?.map((sim) => ({
                title: sim.name,
                description: sim.status,
                type: sim.type as SimulationType,
                date: new Date(sim.dateUpdated),
              })) ?? []
            }
          />
        ))}
      </AnalysisGrid>
      {count !== paginatedData?.length && showLoadMoreBtn && (
        <LoadMore nextPage={nextPage} text={"Load more Analyses"} />
      )}
    </Container>
  );
};

const Container = styled.div`
  ${Typography.SUBHEAD_3};
  color: ${Color.NEUTRAL_700};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
