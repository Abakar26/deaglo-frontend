import { format } from "date-fns";

export function formatAccounting(value: number, minimumFractionDigits = 2) {
  const options: Intl.NumberFormatOptions = { minimumFractionDigits };
  return new Intl.NumberFormat("en-US", options).format(value);
}

export function formatCurrency(value: number, minimumFractionDigits?: number) {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
  };
  return new Intl.NumberFormat("en-US", options).format(value).replace(/^(\D+)/, "$1 ");
}

export function formatPercent(value: number) {
  const options: Intl.NumberFormatOptions = { style: "percent", maximumFractionDigits: 2 };
  return new Intl.NumberFormat("en-US", options).format(value);
}

export function formatShortDate(date: Date) {
  return format(date, "MMM d, yyyy");
}

export function formatNumericDate(date: Date) {
  return format(date, "yyyy/MM/dd");
}
