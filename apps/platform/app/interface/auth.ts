import { Selectable } from "ui/components";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
}

export interface JWTPayload {
  exp: number;
  iat: number;
  jti: string;
  token_type: "refresh" | "access";
  user_id: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  verified?: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
  code?: string;
  new_password?: string;
}

export enum CompanyType {
  BF = "BF",
  MNC = "MNC",
  IE = "IE",
  HEDGE = "HEDGE",
  ALT = "ALT",
  FAM_OFF = "FAM_OFF",
  INST_INV = "INST_INV",
  SME = "SME",
  GNP = "GNP",
  TECH = "TECH",
  CONS = "CONS",
  NGO = "NGO",
  CHAR = "CHAR",
}

export const COMPANY_TYPES: Array<Selectable> = [
  {
    key: CompanyType.BF,
    value: "Banks and Financial Institutions",
  },
  {
    key: CompanyType.MNC,
    value: "Multinational Corporations",
  },
  {
    key: CompanyType.IE,
    value: "Import/Export Businesses",
  },
  {
    key: CompanyType.HEDGE,
    value: "Hedge Funds",
  },
  {
    key: CompanyType.ALT,
    value: "Alternative Asset Managers (Private Equity, Credit, etc.)",
  },
  {
    key: CompanyType.FAM_OFF,
    value: "Family Offices / Multi-Family Offices",
  },
  {
    key: CompanyType.INST_INV,
    value: "Institutional Investors (Pension Funds, Insurance Companies, etc.)",
  },
  {
    key: CompanyType.SME,
    value: "SMEs with International Exposure",
  },
  {
    key: CompanyType.GNP,
    value: "Government and Non-Profit Organizations",
  },
  {
    key: CompanyType.TECH,
    value: "Technology and Software Companies",
  },
  {
    key: CompanyType.CONS,
    value: "Consulting and Advisory Firms",
  },
  {
    key: CompanyType.NGO,
    value: "Non-Governmental Organizations",
  },
  {
    key: CompanyType.CHAR,
    value: "Charities",
  },
];

export interface User {
  isVerified: boolean;
  sso?: string;
  preferences: UserPreferences;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
  company: string;
  jobTitle: string;
  companyType: CompanyType;
  typeUserRole: TypeUserRole;
  organization?: Organization;
}

export type ValueDisplayMode = "itms" | "itmf" | "numeric";

export interface UserPreferences {
  valueDisplayMode: ValueDisplayMode;
  simulationToolbarStrategyAdded: boolean;
  simulationToolbarMarginAdded: boolean;
  simulationToolbarHedgeIrrAdded: boolean;
}

// eslint-disable-next-line
export interface Organization {
  // TODO
}

interface TypeUserRole {
  typeUserRoleId: string;
  dateAdded: string;
  dateUpdated: string;
  isDeleted: boolean;
  name: string;
  level: number;
  description: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
