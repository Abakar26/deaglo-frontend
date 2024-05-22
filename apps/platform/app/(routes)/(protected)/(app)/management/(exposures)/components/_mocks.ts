import type { Exposure } from "@/app/interface/management";

async function getFilters() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    exposure_id: ["Exposure ID"],
    exposure_type: ["Exposure Type"],
  };
}

const exposures: Exposure[] = [
  {
    id: "1",
    exposureType: "Loan / bond",
    theoreticalPaymentDate: new Date(),
    realizedPaymentDate: new Date(),
    foreignCurrency: {
      code: "BRL",
      name: "Brazilian Real",
      countryName: "Brazil",
    },
    exposureId: 1,
    theoreticalInterestPayment: 2000000,
    realizedInterestPayment: 2000000,
    theoreticalPrincipalPayment: 2000000,
    realizedPrincipalPayment: 2000000,
  },
  {
    id: "2",
    exposureType: "Loan / bond",
    theoreticalPaymentDate: new Date(),
    realizedPaymentDate: new Date(),
    foreignCurrency: {
      code: "USD",
      name: "United States Dollar",
      countryName: "United States of America",
    },
    exposureId: 2,
    theoreticalInterestPayment: 2000000,
    realizedInterestPayment: 2000000,
    theoreticalPrincipalPayment: 2000000,
    realizedPrincipalPayment: 2000000,
  },
  {
    id: "3",
    exposureType: "-",
    theoreticalPaymentDate: new Date(),
    realizedPaymentDate: new Date(),
    foreignCurrency: {
      code: "USD",
      name: "United States Dollar",
      countryName: "United States of America",
    },
    exposureId: 3,
    theoreticalInterestPayment: 2000000,
    realizedInterestPayment: 2000000,
    theoreticalPrincipalPayment: 2000000,
    realizedPrincipalPayment: 2000000,
  },
  {
    id: "4",
    exposureType: "Government loan",
    theoreticalPaymentDate: new Date(),
    realizedPaymentDate: new Date(),
    foreignCurrency: {
      code: "USD",
      name: "United States Dollar",
      countryName: "United States of America",
    },
    exposureId: 4,
    theoreticalInterestPayment: 2000000,
    realizedInterestPayment: 2000000,
    theoreticalPrincipalPayment: 2000000,
    realizedPrincipalPayment: 2000000,
  },
];

type GetExposuresArgs = Partial<{
  exposure_id: string;
  interval: string;
  exposure_type: string;
  page: string;
  [key: string]: string; // TODO: Replace with sorting keys
}>;

async function getExposures(args: GetExposuresArgs) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    exposures,
    page: 1,
    totalPages: 1,
  };
}

async function getUploadResults(page: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const errors = [
    {
      id: "3",
      key: "theoreticalPaymentDate",
      message: "Data format should be YYYY-MM-DD",
    },
    {
      id: "4",
      key: "realizedPaymentDate",
      message: "Data format should be YYYY-MM-DD",
    },
  ];

  return {
    results: exposures,
    errors,
    page: 1,
    totalPages: 1,
  };
}

const MOCKS = {
  getFilters,
  getExposures,
  getUploadResults,
};

export default MOCKS;
