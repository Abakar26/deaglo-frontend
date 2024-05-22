import { Color } from "ui/styles";
import { type Currency } from "@/app/store/CurrencyStates";

export type Action = {
  id: string;
  type: string;
  message: string;
  tradeId: string;
};

async function getActions() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      id: "1",
      type: "Trade expire",
      message: "PSS AI trade will expire in 2 days",
      tradeId: "235",
    },
    {
      id: "2",
      type: "Trade expire",
      message: "PSS AI trade will expire in 2 days",
      tradeId: "564",
    },
    {
      id: "3",
      type: "Trade expire",
      message: "PSS AI trade will expire in 2 days",
      tradeId: "365",
    },
    {
      id: "4",
      type: "Trade expire",
      message: "PSS AI trade will expire in 2 days",
      tradeId: "678",
    },
  ];
}

async function getFilterOptions() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    base_currency: [],
    foreign_currency: [],
    exposure_id: [],
    category: [],
  };
}

async function getAnalysesDashboard() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    hedged: 2300400,
    unhedged: 2300400,
    rateOfReturn: {
      change: 0.0004,
      data: [1, 2, 4, 8, 7, 6, 5, 4],
      period: "yesterday",
    },
    hedgingEfficiency: {
      value: 0.07,
      change: 0.03,
      data: [1, 2, 4, 8, 7, 6, 5, 4],
      period: "previous year",
    },
    marginChanges: {
      change: 0.01,
      data: [1, 2, 4, 8, 7, 6, 5, 4],
      period: "yesterday",
    },
  };
}

async function getAssetsAndLiabilities() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    segments: {
      hedgeAssetRatio: 0.9,
      hedgeLiabilityRatio: 0.9,
      totalAssets: {
        change: 0.12,
        data: [1, 2, 4, 8, 7, 6, 5, 4],
        value: 5000000,
      },
      totalLiabilities: 2000000,
    },
    chart: [
      {
        name: "Liabilities",
        sections: [
          {
            value: 9200000,
            stroke: Color.BROWN_300,
            fill: Color.BROWN_300,
          },
          {
            value: 2405000,
            stroke: Color.BROWN_300,
            fill: Color.BROWN_200,
          },
          {
            value: 9500300,
            stroke: Color.BROWN_300,
            fill: Color.BROWN_100,
          },
        ],
      },
      {
        name: "Assets",
        sections: [
          {
            value: 1000000,
            stroke: Color.BRAND_400,
            fill: Color.BRAND_400,
          },
          {
            value: 2500500,
            stroke: Color.BRAND_400,
            fill: Color.BRAND_300,
          },
          {
            value: 9000300,
            stroke: Color.BRAND_400,
            fill: Color.BRAND_100,
          },
        ],
      },
    ],
  };
}

async function getMarkToMarket() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    segments: {
      generalMtM: 5000000,
      optionsMtM: 2000000,
      fwdMtM: 2000000,
      liveFXRates: {
        localCurrency: {
          code: "BRL",
          name: "Brazilian Real",
          countryName: "Brazil",
        } as Currency,
        foreignCurrency: {
          code: "USD",
          name: "United States Dollar",
          countryName: "United States of America",
        } as Currency,
        rate: 5.2099,
      },
    },
    chart: [
      {
        name: "Options MtM",
        threshold: 1600000,
        sections: [{ fill: Color.BRAND_400, stroke: "transparent" as Color, value: 1200000 }],
      },
      {
        name: "Fwd MtM",
        threshold: 1700000,
        sections: [{ fill: Color.BRAND_400, stroke: "transparent" as Color, value: 1500000 }],
      },
    ],
  };
}

const MOCKS = {
  getActions,
  getFilterOptions,
  getAnalysesDashboard,
  getAssetsAndLiabilities,
  getMarkToMarket,
};

export default MOCKS;
