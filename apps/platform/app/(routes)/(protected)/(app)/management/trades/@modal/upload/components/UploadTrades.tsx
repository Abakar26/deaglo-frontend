"use client";

import MOCKS from "../../../components/_mocks";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DataTable,
  SuspenseBlock,
  TableDateInput,
  TableDropdown,
  TableHeader,
  TableInput,
  TableNumber,
  TableRow,
  NumberInputType,
  type Selectable,
  type SortDescriptor,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { useQueryParams } from "@/app/hooks";
import { UploadFile } from "../../../../components/upload-file";
import { type KeyTypes, KEY_MAP } from "../../../utilities/keys";
import { useCurrencySelect } from "@/app/hooks/useCurrencySelect";

const fields = [
  "trade_id",
  "trade_type",
  "fixing_date",
  "position",
  "execution_date",
  "currency_sold",
  "currency_bought",
  "exposure_id",
  "counterparty",
  "notional",
  "value_date",
  "strike_price",
  "spot_ref",
  "premium",
] as const;

type Fields = (typeof fields)[number];
type FormState = Pick<KeyTypes, "id" | Fields>;

type UploadError = {
  id: string;
  key: string;
  message: string;
};

export function UploadTrades() {
  const { params, update } = useQueryParams();
  const router = useRouter();

  const page = parseInt(params.get("page") ?? "1", 10);

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<FormState[]>([]);
  const [errors, setErrors] = useState<UploadError[]>([]);
  const [totalPages, setTotalPages] = useState<number>();

  const {
    options: currencyBoughtOptions,
    search: currencyBoughtSearch,
    onSearch: onCurrencyBoughtSearch,
    currencyToSelectable,
    selectableToCurrency,
  } = useCurrencySelect();
  const {
    options: currencySoldOptions,
    search: currencySoldSearch,
    onSearch: onCurrencySoldSearch,
  } = useCurrencySelect();

  function getSortDescriptor() {
    const sortString = params.get("sort");
    if (sortString === null) return undefined;

    const [key, direction] = sortString.split(" ");
    return { key, direction } as SortDescriptor;
  }

  function handleSorting(descriptor: SortDescriptor) {
    const sortString = `${descriptor.key}+${descriptor.direction}`;
    update("sort", sortString);
  }

  function changePage(page: number) {
    setLoading(true);

    update("page", page.toString());
    MOCKS.getUploadResults(page)
      .then(({ results }) => setFormState(results))
      .catch(() => setFormState([]));
  }

  function handleChange(id: string, name: Fields) {
    return function (value: unknown) {
      setFormState((current) => {
        return current.map((trade) => {
          return trade.id === id ? { ...trade, [name]: value } : trade;
        });
      });
    };
  }

  function filterSelectedCurrencies(option: Selectable, form: FormState) {
    return (
      option.value !== currencyToSelectable(form.currency_bought).value &&
      option.value !== currencyToSelectable(form.currency_sold).value
    );
  }

  function onCurrencyBoughtSelect(tradeId: string, option: Selectable) {
    onCurrencyBoughtSearch("");
    const currency = selectableToCurrency(option);
    return handleChange(tradeId, "currency_bought")(currency);
  }

  function onCurrencySoldSelect(tradeId: string, option: Selectable) {
    onCurrencySoldSearch("");
    const currency = selectableToCurrency(option);
    return handleChange(tradeId, "currency_sold")(currency);
  }

  function save() {
    router.push("/management/trades");
  }

  function isErrorCell(id: string, key: string) {
    return errors.some((error) => error.id === id && error.key === key);
  }

  useEffect(() => {
    setLoading(true);
    MOCKS.getUploadResults(page)
      .then(({ results, errors, totalPages }) => {
        setFormState(results);
        setErrors(errors);
        setTotalPages(totalPages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  const TableForm = (
    <>
      {!loading && formState.length > 0 ? (
        <DataTable page={page} totalPages={totalPages} setPage={changePage} sticky={[1, 1]}>
          <thead>
            <TableRow>
              {fields.map((field) => (
                <TableHeader
                  key={field}
                  sort={getSortDescriptor()}
                  sortKey={field}
                  onSort={handleSorting}
                  align={KEY_MAP[field].align}
                >
                  {KEY_MAP[field].label}
                </TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {formState.map((trade) => (
              <TableRow key={trade.id}>
                <TableInput
                  error={isErrorCell(trade.id, "trade_id")}
                  value={trade.trade_id}
                  onChange={handleChange(trade.id, "trade_id")}
                />

                <TableInput
                  error={isErrorCell(trade.id, "trade_type")}
                  value={trade.trade_type}
                  onChange={handleChange(trade.id, "trade_type")}
                />

                <TableDateInput
                  date={trade.fixing_date}
                  error={isErrorCell(trade.id, "fixing_date")}
                  onChange={handleChange(trade.id, "fixing_date")}
                />

                <TableInput
                  error={isErrorCell(trade.id, "position")}
                  value={trade.position ?? ""}
                  onChange={handleChange(trade.id, "position")}
                />

                <TableDateInput
                  date={trade.execution_date}
                  error={isErrorCell(trade.id, "execution_date")}
                  onChange={handleChange(trade.id, "execution_date")}
                />

                <TableDropdown
                  icon={currencyToSelectable(trade.currency_sold).flag}
                  label={KEY_MAP.currency_sold.label}
                  options={currencySoldOptions.filter((option) =>
                    filterSelectedCurrencies(option, trade)
                  )}
                  search={currencySoldSearch}
                  selected={currencyToSelectable(trade.currency_sold)}
                  onSearch={onCurrencySoldSearch}
                  onSelect={(option) => onCurrencySoldSelect(trade.id, option)}
                />

                <TableDropdown
                  icon={currencyToSelectable(trade.currency_bought).flag}
                  label={KEY_MAP.currency_bought.label}
                  options={currencyBoughtOptions.filter((option) =>
                    filterSelectedCurrencies(option, trade)
                  )}
                  search={currencyBoughtSearch}
                  selected={currencyToSelectable(trade.currency_bought)}
                  onSearch={onCurrencyBoughtSearch}
                  onSelect={(option) => onCurrencyBoughtSelect(trade.id, option)}
                />

                <TableNumber
                  error={isErrorCell(trade.id, "exposure_id")}
                  type={NumberInputType.INTEGER}
                  value={trade.exposure_id}
                  onChange={handleChange(trade.id, "exposure_id")}
                />

                <TableInput
                  error={isErrorCell(trade.id, "counterparty")}
                  value={trade.counterparty ?? ""}
                  onChange={handleChange(trade.id, "counterparty")}
                />

                <TableNumber
                  align="end"
                  error={isErrorCell(trade.id, "notional")}
                  value={trade.notional}
                  onChange={handleChange(trade.id, "notional")}
                />

                <TableDateInput
                  date={trade.value_date}
                  error={isErrorCell(trade.id, "value_date")}
                  onChange={handleChange(trade.id, "value_date")}
                />

                <TableNumber
                  align="end"
                  error={isErrorCell(trade.id, "strike_price")}
                  value={trade.strike_price ?? undefined}
                  onChange={handleChange(trade.id, "strike_price")}
                />

                <TableNumber
                  align="end"
                  error={isErrorCell(trade.id, "spot_ref")}
                  value={trade.spot_ref ?? undefined}
                  onChange={handleChange(trade.id, "spot_ref")}
                />

                <TableNumber
                  align="end"
                  error={isErrorCell(trade.id, "premium")}
                  value={trade.premium ?? undefined}
                  onChange={handleChange(trade.id, "premium")}
                />
              </TableRow>
            ))}
          </tbody>
        </DataTable>
      ) : (
        <SuspenseBlock height="480px" />
      )}

      {errors.length > 0 ? (
        <ErrorContainer>
          <ErrorTitle>
            {errors.length > 1 ? `${errors.length} errors` : "1 error"} occurred:
          </ErrorTitle>
          <ErrorList>
            {errors.map((error, index) => (
              <li key={`${error.id}_${error.key}`}>
                {index + 1}. {error.message}
              </li>
            ))}
          </ErrorList>
        </ErrorContainer>
      ) : null}
    </>
  );

  return <UploadFile type="trades" save={save} slot={TableForm} />;
}

const ErrorContainer = styled.div`
  color: ${Color.DANGER_700};
`;

const ErrorTitle = styled.span`
  ${Typography.LABEL_3}
`;

const ErrorList = styled.ol`
  ${Typography.LABEL_4}
  list-style: none;
  margin-top: 8px;
`;
