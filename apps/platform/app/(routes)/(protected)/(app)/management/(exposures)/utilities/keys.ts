import type { CellAlignment } from "ui/components";
import type { Exposure } from "@/app/interface/management";

export type ExposuresType = "assets" | "liabilities";

type FieldProperties = {
  align?: CellAlignment;
  key?: string;
  label: string;
};

type FieldMap = Record<keyof Exposure, FieldProperties>;

// TODO: Remove key property from unsortable fields
const SHARED_FIELD_MAP: FieldMap = {
  id: { key: "id", label: "ID" },
  exposureId: { key: "exposure_id", label: "Exposure ID" },
  foreignCurrency: { key: "foreign_currency", label: "Foreign Currency" },
  exposureType: { key: "exposure_type", label: "Exposure Type" },
  realizedInterestPayment: {
    align: "end",
    key: "realized_interest_payment",
    label: "Realized Interest Payment",
  },
  realizedPaymentDate: { key: "realized_payment_date", label: "Realized Payment Date" },
  realizedPrincipalPayment: {
    align: "end",
    key: "realized_principal_payment",
    label: "Realized Principal Payment",
  },
  theoreticalInterestPayment: {
    align: "end",
    key: "theoretical_interest_payment",
    label: "Theoretical Interest Payment",
  },
  theoreticalPaymentDate: { key: "theoretical_payment_date", label: "Theoretical Payment Date" },
  theoreticalPrincipalPayment: {
    align: "end",
    key: "theoretical_principal_payment",
    label: "Theoretical Principal Payment",
  },
};

export const FIELD_MAP: Record<ExposuresType, FieldMap> = {
  assets: {
    ...SHARED_FIELD_MAP,
    exposureType: { key: "exposure_type", label: "Asset Type" },
  },
  liabilities: {
    ...SHARED_FIELD_MAP,
    exposureType: { key: "exposure_type", label: "Liability Type" },
  },
};
