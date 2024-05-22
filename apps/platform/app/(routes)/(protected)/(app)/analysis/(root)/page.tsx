/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AnalysisInteractor, WorkspaceInteractor } from "@/app/interactors";
import { type Analysis } from "@/app/interface";
import { type Flag } from "ui/components";
import { AnalysisList, CreateAnalysis, WorkspaceGrid } from "./components";

export interface Workspace {
  id: string;
  title: string;
  analyses: Array<Analysis>;
  currency?: {
    flag: Flag;
    symbol: string;
  };
}

export default async function AnalysisListPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const [response, error] = await AnalysisInteractor.getPaginatedData(1, searchParams);
  const [workspace, workspaceError] = await WorkspaceInteractor.getPaginatedData(1, searchParams);
  const analyses = response?.results;
  const count = response?.count;
  const workspaces = workspace?.results;
  const workspaceCount = workspace?.count;

  if (error) {
    return error;
  }

  if (workspaceError) {
    return error;
  }

  return analyses?.length ? (
    <>
      <AnalysisList
        showLoadMoreBtn={true}
        analyses={analyses}
        count={count}
        searchParams={searchParams}
      />
      <WorkspaceGrid count={workspaceCount ?? 0} workspaces={workspaces ?? []} />
    </>
  ) : (
    <CreateAnalysis />
  );
}
