import { addDays } from "date-fns";
import { Color } from "ui/styles";

export type HedgingEfficiencyView = "percent" | "value";
export type AssetsAndLiabilitiesView = "totals" | "assets" | "liabilities";

async function getFilters() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    exposure_id: ["PSS AI"],
  };
}

async function getGeneralDashboardContent() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    hedged: 2300400,
    unhedged: 2300400,
    rateOfReturn: {
      change: 0.0004,
      data: [1, 2, 4, 8, 7, 6, 5, 4],
      period: "yesterday",
    },
    hedgeAssetRatio: 0.9,
    hedgeLiabilityRatio: 0.9,
    tradesOpened: 32,
  };
}

async function getHedgingEfficiency(type: "percent" | "value") {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (type === "percent") {
    return {
      date: new Date(),
      content: {
        value: 0.07,
        change: 0.03,
        data: [1, 2, 4, 8, 7, 6, 5, 4],
        period: "previous year",
      },
      chart: {
        lines: [
          {
            name: "Mean",
            color: { stroke: Color.NEUTRAL_900, dashed: true },
            data: [
              { date: addDays(new Date(), -4), value: 0.4 },
              { date: addDays(new Date(), -3), value: 0.5 },
              { date: addDays(new Date(), -2), value: 0.4 },
              { date: addDays(new Date(), -1), value: 0.5 },
              { date: new Date(), value: 0.6 },
            ],
          },
          {
            name: "0 and 1 SD",
            color: { stroke: Color.SUCCESS_700 },
            data: [
              { date: addDays(new Date(), -4), value: 0.5 },
              { date: addDays(new Date(), -3), value: 0.4 },
              { date: addDays(new Date(), -2), value: 0.5 },
              { date: addDays(new Date(), -1), value: 0.4 },
              { date: new Date(), value: 0.6 },
            ],
          },
        ],
        areas: [],
      },
    };
  }

  return {
    date: new Date(),
    content: {
      value: 2300400,
      change: 0.03,
      data: [1, 2, 4, 8, 7, 6, 5, 4],
      period: "previous year",
    },
    chart: {
      lines: [
        {
          name: "Hedged",
          color: { stroke: Color.BRAND_800, dashed: true },
          data: [
            { date: addDays(new Date(), -4), value: 140000 },
            { date: addDays(new Date(), -3), value: 145000 },
            { date: addDays(new Date(), -2), value: 130000 },
            { date: addDays(new Date(), -1), value: 125000 },
            { date: new Date(), value: 120000 },
          ],
        },
        {
          name: "Unhedged",
          color: { stroke: Color.NEUTRAL_700 },
          data: [
            { date: addDays(new Date(), -4), value: 139000 },
            { date: addDays(new Date(), -3), value: 129000 },
            { date: addDays(new Date(), -2), value: 125000 },
            { date: addDays(new Date(), -1), value: 132000 },
            { date: new Date(), value: 129500 },
          ],
        },
      ],
      areas: [],
    },
  };
}

async function getMarginChanges() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    date: new Date(),
    change: 0,
    chart: {
      lines: [
        {
          name: "Margin",
          color: { stroke: Color.BRAND_800 },
          data: [
            { date: addDays(new Date(), -4), value: 0.007 },
            { date: addDays(new Date(), -3), value: 0.012 },
            { date: addDays(new Date(), -2), value: 0.007 },
            { date: addDays(new Date(), -1), value: 0.014 },
            { date: new Date(), value: 0.013 },
          ],
        },
      ],
      areas: [],
    },
  };
}

async function getOpportunityCost() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    date: new Date(),
    change: 0.03,
    chart: {
      lines: [
        {
          name: "Actual",
          color: { stroke: Color.BRAND_800 },
          data: [
            { date: addDays(new Date(), -4), value: 0.25 },
            { date: addDays(new Date(), -3), value: 0.35 },
            { date: addDays(new Date(), -2), value: 0.25 },
            { date: addDays(new Date(), -1), value: 0.5 },
            { date: new Date(), value: 0.4 },
          ],
        },
        {
          name: "Stressed",
          color: { stroke: Color.NEUTRAL_700, dashed: true },
          data: [
            { date: addDays(new Date(), -4), value: 0.2 },
            { date: addDays(new Date(), -3), value: 0.25 },
            { date: addDays(new Date(), -2), value: 0.2 },
            { date: addDays(new Date(), -1), value: 0.4 },
            { date: new Date(), value: 0.5 },
          ],
        },
      ],
      areas: [],
    },
  };
}

async function getAssetsAndLiabilities(type: "totals" | "assets" | "liabilities") {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (type === "totals") {
    return {
      lines: [
        {
          name: "Total Liabilities",
          color: { stroke: Color.BRAND_800 },
          data: [
            { date: addDays(new Date(), -6), value: 123000 },
            { date: addDays(new Date(), -5), value: 130000 },
            { date: addDays(new Date(), -4), value: 140000 },
            { date: addDays(new Date(), -3), value: 145000 },
            { date: addDays(new Date(), -2), value: 130000 },
            { date: addDays(new Date(), -1), value: 125000 },
            { date: new Date(), value: 120000 },
          ],
        },
      ],
      areas: [
        {
          name: "Total Assets",
          color: { stroke: Color.TEAL_300, fill: Color.TEAL_100 },
          data: [
            { date: addDays(new Date(), -6), value: 130000 },
            { date: addDays(new Date(), -5), value: 125000 },
            { date: addDays(new Date(), -4), value: 139000 },
            { date: addDays(new Date(), -3), value: 129000 },
            { date: addDays(new Date(), -2), value: 125000 },
            { date: addDays(new Date(), -1), value: 132000 },
            { date: new Date(), value: 129500 },
          ],
        },
      ],
    };
  }

  if (type === "assets") {
    return {
      lines: [],
      areas: [
        {
          name: "Asset 1",
          color: { stroke: Color.TEAL_300, fill: Color.TEAL_100 },
          data: [
            { date: addDays(new Date(), -6), value: 130000 },
            { date: addDays(new Date(), -5), value: 125000 },
            { date: addDays(new Date(), -4), value: 139000 },
            { date: addDays(new Date(), -3), value: 129000 },
            { date: addDays(new Date(), -2), value: 125000 },
            { date: addDays(new Date(), -1), value: 132000 },
            { date: new Date(), value: 129500 },
          ],
        },
        {
          name: "Asset 2",
          color: { stroke: Color.BRAND_800, fill: Color.BRAND_100 },
          data: [
            { date: addDays(new Date(), -6), value: 123000 },
            { date: addDays(new Date(), -5), value: 130000 },
            { date: addDays(new Date(), -4), value: 140000 },
            { date: addDays(new Date(), -3), value: 145000 },
            { date: addDays(new Date(), -2), value: 130000 },
            { date: addDays(new Date(), -1), value: 125000 },
            { date: new Date(), value: 120000 },
          ],
        },
      ],
    };
  }

  if (type === "liabilities") {
    return {
      lines: [
        {
          name: "Asset 1",
          color: { stroke: Color.BRAND_800 },
          data: [
            { date: addDays(new Date(), -6), value: 123000 },
            { date: addDays(new Date(), -5), value: 130000 },
            { date: addDays(new Date(), -4), value: 140000 },
            { date: addDays(new Date(), -3), value: 145000 },
            { date: addDays(new Date(), -2), value: 130000 },
            { date: addDays(new Date(), -1), value: 125000 },
            { date: new Date(), value: 120000 },
          ],
        },
        {
          name: "Asset 2",
          color: { stroke: Color.TEAL_300 },
          data: [
            { date: addDays(new Date(), -6), value: 130000 },
            { date: addDays(new Date(), -5), value: 125000 },
            { date: addDays(new Date(), -4), value: 139000 },
            { date: addDays(new Date(), -3), value: 129000 },
            { date: addDays(new Date(), -2), value: 125000 },
            { date: addDays(new Date(), -1), value: 132000 },
            { date: new Date(), value: 129500 },
          ],
        },
      ],
      areas: [],
    };
  }

  return { lines: [], areas: [] };
}

async function getMarkToMarketContent() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    generalMtM: 5000000,
    optionsMtM: 2000000,
    fwdMtM: 2000000,
    liveFXRates: {
      currencies: ["USD", "BRL"],
      value: 5.2099,
    },
  };
}

async function getHistoricalMtM() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    lines: [
      {
        name: "MtM",
        color: { stroke: Color.BRAND_800 },
        data: [
          { date: addDays(new Date(), -4), value: 500000 },
          { date: addDays(new Date(), -3), value: 400000 },
          { date: addDays(new Date(), -2), value: 600000 },
          { date: addDays(new Date(), -1), value: 1000000 },
          { date: new Date(), value: 1500000 },
        ],
      },
      {
        name: "Threshold",
        color: { stroke: Color.DANGER_700, dashed: true },
        data: [
          { date: addDays(new Date(), -4), value: 100000 },
          { date: new Date(), value: 100000 },
        ],
      },
    ],
    areas: [],
  };
}

async function getNIMCascade() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      name: "Asset Return ",
      sections: [{ fill: Color.BRAND_400, stroke: "transparent" as Color, value: 0.6 }],
    },
    {
      name: "Cost Finance",
      sections: [
        { fill: "transparent" as Color, stroke: "transparent" as Color, value: 0.3 },
        { fill: Color.BROWN_300, stroke: "transparent" as Color, value: 0.3 },
      ],
    },
    {
      name: "Premium %",
      sections: [
        { fill: "transparent" as Color, stroke: "transparent" as Color, value: 0.4 },
        { fill: Color.PURPLE_300, stroke: "transparent" as Color, value: 0.2 },
      ],
    },
    {
      name: "Settlement %",
      sections: [
        { fill: "transparent" as Color, stroke: "transparent" as Color, value: 0.3 },
        { fill: Color.TEAL_300, stroke: "transparent" as Color, value: 0.3 },
      ],
    },
    {
      name: "Net Interset MG",
      sections: [{ fill: "#90BFE0" as Color, stroke: "transparent" as Color, value: 0.4 }],
    },
  ];
}

const MOCKS = {
  getFilters,
  getGeneralDashboardContent,
  getHedgingEfficiency,
  getMarginChanges,
  getOpportunityCost,
  getAssetsAndLiabilities,
  getMarkToMarketContent,
  getHistoricalMtM,
  getNIMCascade,
};

export default MOCKS;
