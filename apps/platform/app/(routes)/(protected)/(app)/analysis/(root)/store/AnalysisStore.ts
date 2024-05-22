import { create } from "zustand";
// import type { Workspace } from "../page";
import { type Workspace } from "@/app/interface";

interface AnalysisState {
  createAnalysis: boolean;
  createWorkspace: boolean;
  analysisCount: number;
  workspace?: Workspace;
  workspaceList?: Array<Workspace>;
  showWorkspace: boolean;
  workspaceCount: number;

  setCreateAnalysis: (createAnalysis: boolean) => void;
  setCreateWorkspace: (createWorkspace: boolean) => void;
  setAnalysisCount: (analysisCount: number) => void;
  setWorkspace: (workspace?: Workspace) => void;
  setShowWorkspace: (showWorkspace: boolean) => void;
  setWorkspaceCount: (workspaceCount: number) => void;
  setWorkspaceList: (workspaceList?: Array<Workspace>) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  createAnalysis: false,
  createWorkspace: false,
  analysisCount: 0,
  workspace: undefined,
  workspaceList: [],
  showWorkspace: false,
  workspaceCount: 0,

  setCreateAnalysis: (createAnalysis: boolean) => set(() => ({ createAnalysis })),
  setCreateWorkspace: (createWorkspace: boolean) => set(() => ({ createWorkspace })),
  setAnalysisCount: (analysisCount: number) => set(() => ({ analysisCount })),
  setWorkspace: (workspace?: Workspace) => set(() => ({ workspace })),
  setShowWorkspace: (showWorkspace: boolean) => set(() => ({ showWorkspace })),
  setWorkspaceCount: (workspaceCount: number) => set(() => ({ workspaceCount })),
  setWorkspaceList: (workspaceList?: Array<Workspace>) => set(() => ({ workspaceList })),
}));
