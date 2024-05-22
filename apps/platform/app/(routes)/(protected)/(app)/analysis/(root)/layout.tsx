"use client";

import { useQueryParams } from "@/app/hooks/useQueryParams";
import { AnalysisInteractor, WorkspaceInteractor } from "@/app/interactors";
import type { PartialAnalysis, WorkspaceAnalysis } from "@/app/interface";
import { type Workspace } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { SnackbarLevel } from "ui/components";
import { AnalysisFilters, AnalysisLoader, AnalysisTabBar } from "./components";
import { AnalysisModal, CreateWorkspaceModal } from "./modals";
import { WorkspaceModal } from "./modals/WorkspaceModal";
import { useAnalysisStore } from "./store/AnalysisStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { suspenseKey } = useQueryParams();
  const router = useRouter();
  const { setSnack } = useSnackbarStore();
  const {
    createAnalysis,
    setCreateAnalysis,
    createWorkspace,
    setCreateWorkspace,
    showWorkspace,
    setShowWorkspace,
    workspace,
    setWorkspace,
    setWorkspaceList,
    workspaceList,
  } = useAnalysisStore();

  const onCreateWorkspace = async (workspace: Workspace) => {
    const [response, error] = await WorkspaceInteractor.create(workspace);

    if (error) {
      console.error(error);
    }

    if (response) {
      setCreateWorkspace(false);
      setWorkspace(response);
      setWorkspaceList([...(workspaceList ?? []), response]);
      setShowWorkspace(true);
    }
  };

  const onSaveWorkspace = () => {
    setWorkspace(undefined);
    setShowWorkspace(false);
    router.refresh();
  };

  const onRemoveFromWorkspace = async (analysis: WorkspaceAnalysis) => {
    const [response, error] = await WorkspaceInteractor.removeWorkspaceAnalysis(
      workspace?.workspaceId ?? "",
      analysis.analysisId ?? ""
    );
    if (!response) {
      workspace &&
        setWorkspace({
          ...workspace,
          analysis: workspace?.analysis?.filter(
            (_analysis) => _analysis.analysisId !== analysis.analysisId
          ),
        });
    }
    if (error) {
      setSnack({
        message: "Couldn't remove entries from workspace",
        level: SnackbarLevel.ERROR,
        icon: "x",
        duration: 5,
      });
    }
  };

  const onAddAnalyses = () => {
    setShowWorkspace(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const createNewAnalysis = async (analysis: PartialAnalysis) => {
    const [response, error] = await AnalysisInteractor.create(analysis);

    if (error) {
      console.error(error);
    }

    if (response) {
      const ref = `/analysis/${response.analysisId}`;
      router.push(ref);
    }
  };

  const updateAnalysis = async (analysisId: string, analysis: PartialAnalysis) => {
    const [, error] = await AnalysisInteractor.update(analysisId, analysis);

    if (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AnalysisTabBar />
      <AnalysisFilters />
      <Suspense fallback={<AnalysisLoader count={6} />} key={suspenseKey}>
        {children}
      </Suspense>
      {createAnalysis && (
        <AnalysisModal
          onDismiss={() => setCreateAnalysis(false)}
          onCreate={(analysis: PartialAnalysis) => createNewAnalysis(analysis)}
          onSave={(analysisId: string, analysis: PartialAnalysis) =>
            updateAnalysis(analysisId, analysis)
          }
        />
      )}
      {createWorkspace && (
        <CreateWorkspaceModal
          onDismiss={() => setCreateWorkspace(false)}
          onCreate={(workspace) => void onCreateWorkspace(workspace)}
        />
      )}
      {showWorkspace && workspace && (
        <WorkspaceModal
          workspace={workspace}
          onAdd={onAddAnalyses}
          onSave={onSaveWorkspace}
          onRemove={(analysis) => void onRemoveFromWorkspace(analysis)}
        />
      )}
    </>
  );
}
