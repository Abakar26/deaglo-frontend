"use server";

import { APIQuery, APIRoute } from "@/utilities";
import { type APIResponse } from "..";
import { type Flag } from "ui/components";

interface CurrencyList {
  code: string;
  name: string;
  countryName: Flag;
}

export const getAll = async (): Promise<APIResponse<Array<CurrencyList>>> => {
  const { reply, error } = await APIQuery<Array<CurrencyList>>(APIRoute.CURRENCIES_LIST);
  return [reply, error];
};
