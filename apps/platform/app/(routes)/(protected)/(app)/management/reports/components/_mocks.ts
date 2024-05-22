export type ReportsType = "assets" | "liabilities";

export type ReportItem = {
  id: string;
  name: string;
  category: string;
  thisYearAmount: number;
  lastYearAmount: number;
};

export type Reports = Record<ReportsType, ReportItem[]>;

const reports: Reports = {
  assets: [
    {
      id: "A1",
      name: "Cash and cash equivqlents",
      category: "Current Assets",
      thisYearAmount: 100000,
      lastYearAmount: 300000,
    },
    {
      id: "A2",
      name: "Accounts receivable",
      category: "Current Assets",
      thisYearAmount: 200000,
      lastYearAmount: 200000,
    },
    {
      id: "A3",
      name: "Inventory",
      category: "Current Assets",
      thisYearAmount: 300000,
      lastYearAmount: 100000,
    },
    {
      id: "A4",
      name: "Land",
      category: "Fixed Assets",
      thisYearAmount: 200000,
      lastYearAmount: 400000,
    },
    {
      id: "A5",
      name: "Plant, Property, equipment",
      category: "Fixed Assets",
      thisYearAmount: 300000,
      lastYearAmount: 300000,
    },
    {
      id: "A6",
      name: "Intangible assets",
      category: "Fixed Assets",
      thisYearAmount: 400000,
      lastYearAmount: 200000,
    },
  ],
  liabilities: [
    {
      id: "L1",
      name: "Account payable ",
      category: "Liabilities ",
      thisYearAmount: 100000,
      lastYearAmount: 300000,
    },
    {
      id: "L2",
      name: "Taxes payable ",
      category: "Liabilities ",
      thisYearAmount: 200000,
      lastYearAmount: 200000,
    },
    {
      id: "L3",
      name: "Long term bonds issued",
      category: "Liabilities ",
      thisYearAmount: 300000,
      lastYearAmount: 100000,
    },
    {
      id: "L4",
      name: "Commin stock",
      category: "Equity",
      thisYearAmount: 100000,
      lastYearAmount: 200000,
    },
    {
      id: "L5",
      name: "retained earnings",
      category: "Equity",
      thisYearAmount: 200000,
      lastYearAmount: 100000,
    },
  ],
};

type GetReportsArgs = {
  period: string | null;
};

async function getReports(args: GetReportsArgs) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return reports;
}

const MOCKS = { getReports };

export default MOCKS;
