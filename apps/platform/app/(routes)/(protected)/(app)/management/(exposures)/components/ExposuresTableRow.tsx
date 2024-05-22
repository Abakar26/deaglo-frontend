"use client";

import { differenceInCalendarDays } from "date-fns";
import styled from "styled-components";
import {
  Icon,
  NumberInputType,
  TableDateInput,
  TableDropdown,
  TableEntry,
  TableLabel,
  TableNumber,
  TableRow,
  type Selectable,
} from "ui/components";
import { Color } from "ui/styles";
import { useCurrencySelect } from "@/app/hooks/useCurrencySelect";
import type { Exposure } from "@/app/interface/management";
import { formatAccounting, formatNumericDate } from "@/utilities/format";

type ExposuresTableRowProps = {
  editable: boolean;
  errors?: Record<keyof Exposure, string>;
  exposure: Exposure;
  onChange: (name: keyof Exposure) => (value: unknown) => void;
  onClick?: () => void;
};

export function ExposuresTableRow({
  editable,
  errors,
  exposure,
  onChange,
  onClick,
}: ExposuresTableRowProps) {
  const {
    options: currencyOptions,
    search: currencySearch,
    currencyToSelectable,
    selectableToCurrency,
    onSearch: onCurrencySearch,
  } = useCurrencySelect();

  // TODO: Add options
  const exposureTypeOptions: string[] = ["option"];

  function onCurrencySelect(option: Selectable) {
    onCurrencySearch("");
    const currency = selectableToCurrency(option);
    return onChange("foreignCurrency")(currency);
  }

  function getStatus(date: Date) {
    const now = new Date();
    const diff = differenceInCalendarDays(date, now);

    if (diff > 15) return "positive";
    if (diff > 10) return "medium";
    if (diff > 0) return "negative";
    return "expired";
  }

  return editable ? (
    <TableRow>
      <TableDropdown
        error={Boolean(errors?.exposureType)}
        options={exposureTypeOptions}
        selected={exposure.exposureType}
        onSelect={onChange("exposureType")}
      />

      <TableDateInput
        date={exposure.theoreticalPaymentDate}
        error={Boolean(errors?.theoreticalPaymentDate)}
        onChange={onChange("theoreticalPaymentDate")}
      />

      <TableDateInput
        date={exposure.realizedPaymentDate}
        error={Boolean(errors?.realizedPaymentDate)}
        onChange={onChange("realizedPaymentDate")}
      />

      <TableDropdown
        error={Boolean(errors?.foreignCurrency)}
        icon={currencyToSelectable(exposure.foreignCurrency).flag}
        options={currencyOptions}
        search={currencySearch}
        selected={currencyToSelectable(exposure.foreignCurrency)}
        onSearch={onCurrencySearch}
        onSelect={onCurrencySelect}
      />

      <TableNumber
        error={Boolean(errors?.exposureId)}
        type={NumberInputType.INTEGER}
        value={exposure.exposureId}
        onChange={onChange("exposureId")}
      />

      <TableNumber
        align="end"
        error={Boolean(errors?.theoreticalInterestPayment)}
        value={exposure.theoreticalInterestPayment}
        onChange={onChange("theoreticalInterestPayment")}
      />

      <TableNumber
        align="end"
        error={Boolean(errors?.realizedInterestPayment)}
        value={exposure.realizedInterestPayment}
        onChange={onChange("realizedInterestPayment")}
      />

      <TableNumber
        align="end"
        error={Boolean(errors?.theoreticalPrincipalPayment)}
        value={exposure.theoreticalPrincipalPayment}
        onChange={onChange("theoreticalPrincipalPayment")}
      />

      <TableNumber
        align="end"
        error={Boolean(errors?.realizedPrincipalPayment)}
        value={exposure.realizedPrincipalPayment}
        onChange={onChange("realizedPrincipalPayment")}
      />
    </TableRow>
  ) : (
    <HoverableTableRow>
      <TableEntry align="space-between">
        {exposure.exposureType}
        <Button type="button" onClick={onClick}>
          <Icon name="pencil" color={Color.BRAND_800} />
        </Button>
      </TableEntry>

      <TableLabel status={getStatus(exposure.theoreticalPaymentDate)}>
        {formatNumericDate(exposure.theoreticalPaymentDate)}
      </TableLabel>

      <TableLabel status={getStatus(exposure.realizedPaymentDate)}>
        {formatNumericDate(exposure.realizedPaymentDate)}
      </TableLabel>

      <TableEntry>{exposure.foreignCurrency.code}</TableEntry>

      <TableEntry>{exposure.exposureId}</TableEntry>

      <TableLabel align="end" reverse status={getStatus(exposure.theoreticalPaymentDate)}>
        {formatAccounting(exposure.theoreticalInterestPayment)}
      </TableLabel>

      <TableLabel align="end" reverse status={getStatus(exposure.realizedPaymentDate)}>
        {formatAccounting(exposure.realizedInterestPayment)}
      </TableLabel>

      <TableEntry align="end">{formatAccounting(exposure.theoreticalPrincipalPayment)}</TableEntry>

      <TableEntry align="end">{formatAccounting(exposure.realizedPrincipalPayment)}</TableEntry>
    </HoverableTableRow>
  );
}

const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline-offset: 8px;
  visibility: hidden;
`;

const HoverableTableRow = styled(TableRow)`
  &:hover ${Button} {
    visibility: visible;
  }
`;
