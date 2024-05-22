"use client";

import { AnalysisInteractor } from "@/app/interactors";
import type { PartialAnalysis } from "@/app/interface";
import { useRouter } from "next/navigation";
import { AnalysisModal } from "../analysis/(root)/modals";
import { useAnalysisStore } from "../analysis/(root)/store/AnalysisStore";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { createAnalysis, setCreateAnalysis } = useAnalysisStore();

  const router = useRouter();

  const createNewAnalysis = async (analysis: PartialAnalysis) => {
    const [response, error] = await AnalysisInteractor.create(analysis);

    if (error) {
      console.error(error);
    }

    if (response) {
      router.push(`/analysis/${response.analysisId}`);
    }
  };

  return (
    <>
      {children}
      {createAnalysis && (
        <AnalysisModal
          onDismiss={() => setCreateAnalysis(false)}
          onCreate={(analysis: PartialAnalysis) => createNewAnalysis(analysis)}
        />
      )}
    </>
  );
}
