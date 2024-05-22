export * as AnalysisInteractor from "./analysis";
export * as AuthInteractor from "./auth";
export * as MarketInteractor from "./market";
export * as SimulationInteractor from "./simulation";
export * as StrategyInteractor from "./strategy";
export * as WorkspaceInteractor from "./workspace";

export type APIResponse<T> = [T?, string?, Record<string, string[]>?];
export type PaginatedData<T> = {
  count: number;
  next: string | undefined;
  previous: string | undefined;
  results: Array<T>;
};
