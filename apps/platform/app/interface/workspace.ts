import type { Analysis } from ".";

export interface Workspace {
  workspaceId?: string;
  name: string;
  analysis?: Array<WorkspaceAnalysis>;
  isDeleted?: boolean;
  dateAdded?: Date;
  dateUpdated?: Date;
  baseCurrency?: {
    code: string;
    countryName: string;
  };
}

export type WorkspaceAnalysis = Omit<Analysis, "simulations" | "organization">;
