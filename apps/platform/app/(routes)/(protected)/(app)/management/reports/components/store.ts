import type { ReportItem, Reports, ReportsType } from "./_mocks";

import { create } from "zustand";

type ReportsState = {
  reports: Reports;
  renamingReports: Record<ReportsType, ReportItem[]>;
  setReports: (reports: Reports) => void;
  setReportAsRenaming: (type: ReportsType, report: ReportItem) => void;
  setRenamingReports: (type: ReportsType, report: ReportItem) => void;
  resetRenamingReports: () => void;
  renameReports: () => void;
};

export const useReportsStore = create<ReportsState>((set, get) => ({
  reports: { assets: [], liabilities: [] },
  renamingReports: { assets: [], liabilities: [] },

  setReports: (reports: Reports) => set(() => ({ reports })),

  setReportAsRenaming: (type: ReportsType, report: ReportItem) => {
    const alreadyRenaming = get().renamingReports[type].some((renamingReport) => {
      return renamingReport.id === report.id;
    });

    if (alreadyRenaming) return;

    set((state) => ({
      renamingReports: {
        ...state.renamingReports,
        [type]: [...state.renamingReports[type], report],
      },
    }));
  },

  setRenamingReports: (type: ReportsType, report: ReportItem) => {
    set((state) => {
      return {
        renamingReports: {
          ...state.renamingReports,
          [type]: state.renamingReports[type].map((renamingReport) => {
            return renamingReport.id === report.id ? report : renamingReport;
          }),
        },
      };
    });
  },

  resetRenamingReports: () => set(() => ({ renamingReports: { assets: [], liabilities: [] } })),

  renameReports: () => {
    set((state) => {
      const renamedAssets = state.reports.assets.map((report) => {
        const renamedReport = state.renamingReports.assets.find((renamedReport) => {
          return renamedReport.id === report.id;
        });
        return renamedReport ?? report;
      });

      const renamedLiabilities = state.reports.liabilities.map((report) => {
        const renamedReport = state.renamingReports.liabilities.find((renamedReport) => {
          return renamedReport.id === report.id;
        });
        return renamedReport ?? report;
      });

      return {
        reports: { assets: renamedAssets, liabilities: renamedLiabilities },
        renamingReports: { assets: [], liabilities: [] },
      };
    });
  },
}));
