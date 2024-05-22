import { addDays } from "date-fns";
import { Color } from "ui/styles";
import type { Currency } from "@/app/store/CurrencyStates";
import type { KeyTypes } from "../utilities/keys";

export type Trade = {
  currency_bought: Currency;
  currency_sold: Currency;
  execution_date: Date;
  exposure_id: number;
  fixing_date: Date;
  id: string;
  mtm_day: number;
  notional: number;
  position: string | null;
  premium: number | null;
  reference: string | null;
  counterparty: string;
  spot_ref: number;
  strike_price: number | null;
  trade_id: string;
  trade_type: string;
  value_date: Date;
};

export type Leg = Trade & { leg_id: string };
export type Derivative = Trade & { legs: Leg[] };
export type Trades = (Trade | Derivative)[];

async function getFilters() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    exposure_id: ["PSS AI"],
    reference: ["reference_1"],
    counterparty: "Counterparty",
    month: ["month_1"],
  };
}

type GetTradesArgs = Partial<{
  exposure_id: string;
  reference: string;
  counterparty: "Counterparty";
  month: string;
  page: string;
  [key: string]: string; // TODO: Replace with sorting keys
}>;

async function getTrades(args: GetTradesArgs) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data: Trades = [
    {
      id: "235",
      trade_id: "235",
      trade_type: "Put",
      fixing_date: addDays(new Date(), -1),
      position: "Long",
      execution_date: addDays(new Date(), -1),
      currency_bought: {
        code: "USD",
        countryName: "United States of America",
        name: "United States Dollar",
      },
      currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
      exposure_id: 10,
      reference: "Loan / bond",
      counterparty: "Counterparty",
      notional: 2000000,
      value_date: addDays(new Date(), -1),
      strike_price: 0,
      spot_ref: 0,
      premium: 2000000,
      mtm_day: 2000000,
    },
    {
      id: "564",
      trade_id: "564",
      trade_type: "FwdEx",
      fixing_date: addDays(new Date(), 1),
      position: null,
      execution_date: addDays(new Date(), 1),
      currency_bought: {
        code: "USD",
        countryName: "United States of America",
        name: "United States Dollar",
      },
      currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
      exposure_id: 20,
      reference: "Loan / bond",
      counterparty: "Counterparty",
      notional: 2000000,
      value_date: addDays(new Date(), 1),
      strike_price: 0,
      spot_ref: 0,
      premium: 2000000,
      mtm_day: 2000000,
    },
    {
      id: "365",
      trade_id: "365",
      trade_type: "knock-out put (barrier)",
      fixing_date: addDays(new Date(), 11),
      position: null,
      execution_date: addDays(new Date(), 11),
      currency_bought: {
        code: "USD",
        countryName: "United States of America",
        name: "United States Dollar",
      },
      currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
      exposure_id: 30,
      reference: "Loan / bond",
      counterparty: "Counterparty",
      notional: 2000000,
      value_date: addDays(new Date(), 11),
      strike_price: 0,
      spot_ref: 0,
      premium: 2000000,
      mtm_day: 2000000,
    },
    {
      id: "678",
      trade_id: "678",
      trade_type: "Seagull",
      fixing_date: addDays(new Date(), 16),
      position: null,
      execution_date: addDays(new Date(), 16),
      currency_bought: {
        code: "USD",
        countryName: "United States of America",
        name: "United States Dollar",
      },
      currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
      exposure_id: 40,
      reference: "Loan / bond",
      counterparty: "Counterparty",
      notional: 2000000,
      value_date: addDays(new Date(), 16),
      strike_price: null,
      spot_ref: 0,
      premium: 2000000,
      mtm_day: 2000000,
      legs: [
        {
          id: "678",
          trade_id: "678",
          leg_id: "678-1",
          trade_type: "Put",
          fixing_date: addDays(new Date(), -1),
          position: "Short",
          execution_date: addDays(new Date(), -1),
          currency_bought: {
            code: "USD",
            countryName: "United States of America",
            name: "United States Dollar",
          },
          currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
          exposure_id: 40,
          reference: null,
          counterparty: "Counterparty",
          notional: 2000000,
          value_date: addDays(new Date(), -1),
          strike_price: 3,
          spot_ref: 0,
          premium: null,
          mtm_day: 2000000,
        },
        {
          id: "678",
          trade_id: "678",
          leg_id: "678-2",
          trade_type: "Put",
          fixing_date: addDays(new Date(), -1),
          position: "Long",
          execution_date: addDays(new Date(), -1),
          currency_bought: {
            code: "USD",
            countryName: "United States of America",
            name: "United States Dollar",
          },
          currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
          exposure_id: 40,
          reference: null,
          counterparty: "Counterparty",
          notional: 2000000,
          value_date: addDays(new Date(), -1),
          strike_price: 2,
          spot_ref: 0,
          premium: null,
          mtm_day: 2000000,
        },
        {
          id: "678",
          trade_id: "678",
          leg_id: "678-3",
          trade_type: "Call",
          fixing_date: addDays(new Date(), -1),
          position: "Short",
          execution_date: addDays(new Date(), -1),
          currency_bought: {
            code: "USD",
            countryName: "United States of America",
            name: "United States Dollar",
          },
          currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
          exposure_id: 40,
          reference: null,
          counterparty: "Counterparty",
          notional: 2000000,
          value_date: addDays(new Date(), -1),
          strike_price: 5,
          spot_ref: 0,
          premium: null,
          mtm_day: 2000000,
        },
      ],
    },
    {
      id: "576",
      trade_id: "576",
      trade_type: "Forward",
      fixing_date: new Date(),
      position: "Long",
      execution_date: new Date(),
      currency_bought: {
        code: "USD",
        countryName: "United States of America",
        name: "United States Dollar",
      },
      currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
      exposure_id: 10,
      reference: "Loan / bond",
      counterparty: "Counterparty",
      notional: 2000000,
      value_date: new Date(),
      strike_price: 0,
      spot_ref: 0,
      premium: 2000000,
      mtm_day: 2000000,
    },
  ];

  const page = args.page ? Number(args.page) : 1;
  const RESULTS_PER_PAGE = 4;
  const pageStart = (page - 1) * RESULTS_PER_PAGE;
  const pageEnd = page * RESULTS_PER_PAGE;
  const getTradesByPage = () => data.slice(pageStart, pageEnd);
  const totalPages = Math.ceil(data.length / RESULTS_PER_PAGE);

  return {
    trades: getTradesByPage(),
    page,
    totalPages,
  };
}

async function getMarkToMarket() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    date: new Date(),
    content: {
      currency: "BRL",
      value: 39485767,
      change_percent: 0.0004,
      change_value: 5767,
      data: [1, 2, 4, 8, 7, 6, 5, 4],
    },
    chart: {
      lines: [
        {
          name: "MtM",
          color: { stroke: Color.BRAND_800 },
          data: [
            { date: addDays(new Date(), -4), value: 140000 },
            { date: addDays(new Date(), -3), value: 145000 },
            { date: addDays(new Date(), -2), value: 130000 },
            { date: addDays(new Date(), -1), value: 125000 },
            { date: new Date(), value: 120000 },
          ],
        },
      ],
      areas: [],
    },
  };
}

async function getUploadResults(page: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data: KeyTypes[] = [
    {
      id: "1",
      trade_id: "235",
      trade_type: "Put",
      fixing_date: addDays(new Date(), -1),
      position: "Long",
      execution_date: addDays(new Date(), -1),
      currency_bought: {
        code: "USD",
        countryName: "United States of America",
        name: "United States Dollar",
      },
      currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
      exposure_id: 10,
      counterparty: "Counterparty",
      notional: 2000000,
      value_date: addDays(new Date(), -1),
      strike_price: 0,
      spot_ref: 0,
      premium: 2000000,
    },
    {
      id: "2",
      trade_id: "564",
      trade_type: "FwdEx",
      fixing_date: addDays(new Date(), 1),
      position: "Long",
      execution_date: addDays(new Date(), 1),
      currency_bought: {
        code: "USD",
        countryName: "United States of America",
        name: "United States Dollar",
      },
      currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
      exposure_id: 20,
      counterparty: "Counterparty",
      notional: 2000000,
      value_date: addDays(new Date(), 1),
      strike_price: 0,
      spot_ref: 0,
      premium: 2000000,
    },
    {
      id: "3",
      trade_id: "365",
      trade_type: "knock-out put (barrier)",
      fixing_date: addDays(new Date(), 11),
      position: "Long",
      execution_date: addDays(new Date(), 11),
      currency_bought: {
        code: "USD",
        countryName: "United States of America",
        name: "United States Dollar",
      },
      currency_sold: { code: "BRL", countryName: "Brazil", name: "Brazilian Real" },
      exposure_id: 30,
      counterparty: "Counterparty",
      notional: 2000000,
      value_date: addDays(new Date(), 11),
      strike_price: 0,
      spot_ref: 0,
      premium: 2000000,
    },
  ];

  const errors = [
    {
      id: "3",
      key: "fixing_date",
      message: "Data format should be YYYY-MM-DD",
    },
  ];

  const RESULTS_PER_PAGE = 4;
  const pageStart = (page - 1) * RESULTS_PER_PAGE;
  const pageEnd = page * RESULTS_PER_PAGE;
  const getResultsByPage = () => data.slice(pageStart, pageEnd);
  const totalPages = Math.ceil(data.length / RESULTS_PER_PAGE);

  return {
    results: getResultsByPage(),
    errors,
    page,
    totalPages,
  };
}

const MOCKS = {
  getFilters,
  getTrades,
  getMarkToMarket,
  getUploadResults,
};

export default MOCKS;
