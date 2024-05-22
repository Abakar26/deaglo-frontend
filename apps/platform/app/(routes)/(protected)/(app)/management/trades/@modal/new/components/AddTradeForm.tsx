"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonSize,
  ButtonType,
  DateInput,
  DropdownSelect,
  IconButton,
  NumberInput,
  SideModal,
  TextInput,
  NumberInputType,
  type Selectable,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { useCurrencySelect } from "@/app/hooks/useCurrencySelect";
import { KEY_MAP, type KeyTypes } from "../../../utilities/keys";
import { tooltips } from "../utilities/tooltips";

export type Fields =
  | "counterparty"
  | "execution_date"
  | "exposure_id"
  | "fixing_date"
  | "notional"
  | "position"
  | "premium"
  | "spot_ref"
  | "strike_price"
  | "trade_id"
  | "trade_type"
  | "value_date";

type FormState = Pick<KeyTypes, Fields> & {
  currency_bought: Selectable;
  currency_sold: Selectable;
};

export function AddTradeForm() {
  const router = useRouter();

  const [formState, setFormState] = useState<Partial<FormState>>({});

  const {
    options: currencyBoughtOptions,
    search: currencyBoughtSearch,
    onSearch: onCurrencyBoughtSearch,
  } = useCurrencySelect();
  const {
    options: currencySoldOptions,
    search: currencySoldSearch,
    onSearch: onCurrencySoldSearch,
  } = useCurrencySelect();

  function handleOnChange(name: keyof FormState) {
    return function (value: unknown) {
      setFormState((current) => ({ ...current, [name]: value }));
    };
  }

  function onCurrencyBoughtSelect(option: Selectable) {
    onCurrencyBoughtSearch("");
    return handleOnChange("currency_bought")(option);
  }

  function onCurrencySoldSelect(option: Selectable) {
    onCurrencySoldSearch("");
    return handleOnChange("currency_sold")(option);
  }

  function filterSelectedCurrencies(option: Selectable) {
    return (
      option.value !== formState.currency_bought?.value &&
      option.value !== formState.currency_sold?.value
    );
  }

  function swapCurrencies() {
    const [currency_sold, currency_bought] = [formState.currency_bought, formState.currency_sold];
    setFormState((current) => ({ ...current, currency_sold, currency_bought }));
  }

  const clearForm = () => setFormState({});

  function cancel() {
    clearForm();
    router.back();
  }

  function save() {
    clearForm();
  }

  function saveAndExit() {
    save();
    router.push("/management/trades");
  }

  function saveAndReset() {
    save();
  }

  const uploadFile = () => router.push("/management/trades/upload");

  return (
    <SideModal
      title="Add trade"
      action={{ label: "Upload CSV", onClick: uploadFile }}
      onDismiss={cancel}
    >
      <Form>
        <FieldSet>
          <Legend>Trade IDs</Legend>

          <InputWrapper>
            <TextInput
              label={KEY_MAP.trade_id.label}
              name="trade_id"
              tooltip={tooltips.trade_id}
              value={formState.trade_id ?? ""}
              onChange={handleOnChange("trade_id")}
            />
          </InputWrapper>
          <InputWrapper>
            <NumberInput
              label={KEY_MAP.exposure_id.label}
              name="exposure_id"
              tooltip={tooltips.exposure_id}
              type={NumberInputType.INTEGER}
              value={formState.exposure_id}
              onChange={handleOnChange("exposure_id")}
            />
          </InputWrapper>
          <InputWrapper>
            <TextInput
              label={KEY_MAP.counterparty.label}
              name="counterparty"
              tooltip={tooltips.counterparty}
              value={formState.counterparty ?? ""}
              onChange={handleOnChange("counterparty")}
            />
          </InputWrapper>
        </FieldSet>

        <CurrencyPair>
          <Legend>Currency pair of the trade</Legend>

          <DropdownSelect
            icon={formState.currency_sold?.flag}
            label={KEY_MAP.currency_sold.label}
            options={currencySoldOptions.filter(filterSelectedCurrencies)}
            search={currencySoldSearch}
            selected={formState.currency_sold}
            onSearch={onCurrencySoldSearch}
            onSelect={onCurrencySoldSelect}
          />

          <IconButton
            aria-label="Swap currencies"
            color={Color.NEUTRAL_700}
            hoverable
            name="exchange"
            onClick={swapCurrencies}
          />

          <DropdownSelect
            icon={formState.currency_bought?.flag}
            label={KEY_MAP.currency_bought.label}
            options={currencyBoughtOptions.filter(filterSelectedCurrencies)}
            search={currencyBoughtSearch}
            selected={formState.currency_bought}
            onSearch={onCurrencyBoughtSearch}
            onSelect={onCurrencyBoughtSelect}
          />
        </CurrencyPair>

        <FieldSet>
          <Legend>Trade type and position</Legend>

          <InputWrapper>
            <TextInput
              label={KEY_MAP.trade_type.label}
              name="trade_type"
              tooltip={tooltips.trade_type}
              value={formState.trade_type ?? ""}
              onChange={handleOnChange("trade_type")}
            />
          </InputWrapper>
          <InputWrapper>
            <TextInput
              label={KEY_MAP.position.label}
              name="position"
              tooltip={tooltips.position}
              value={formState.position ?? ""}
              onChange={handleOnChange("position")}
            />
          </InputWrapper>
        </FieldSet>

        <FieldSet>
          <Legend>Time info</Legend>

          <InputWrapper>
            <DateInput
              aria-label={KEY_MAP.execution_date.label}
              date={formState.execution_date}
              tooltip={tooltips.execution_date}
              onChange={handleOnChange("execution_date")}
            />
          </InputWrapper>
          <InputWrapper>
            <DateInput
              aria-label={KEY_MAP.fixing_date.label}
              date={formState.fixing_date}
              disabled={formState.execution_date === undefined}
              minDate={formState.execution_date}
              tooltip={tooltips.fixing_date}
              onChange={handleOnChange("fixing_date")}
            />
          </InputWrapper>
          <InputWrapper>
            <DateInput
              aria-label={KEY_MAP.value_date.label}
              date={formState.value_date}
              disabled={formState.fixing_date === undefined}
              minDate={formState.fixing_date}
              tooltip={tooltips.value_date}
              onChange={handleOnChange("value_date")}
            />
          </InputWrapper>
        </FieldSet>

        <FieldSet>
          <Legend>Other info</Legend>

          <InputWrapper>
            <NumberInput
              label={KEY_MAP.notional.label}
              name="notional"
              tooltip={tooltips.notional}
              value={formState.notional}
              onChange={handleOnChange("notional")}
            />
          </InputWrapper>
          <InputWrapper>
            <NumberInput
              label={KEY_MAP.strike_price.label}
              name="strike_price"
              tooltip={tooltips.strike_price}
              value={formState.strike_price}
              onChange={handleOnChange("strike_price")}
            />
          </InputWrapper>
          <InputWrapper>
            <NumberInput
              label={KEY_MAP.spot_ref.label}
              name="spot_ref"
              tooltip={tooltips.spot_ref}
              value={formState.spot_ref}
              onChange={handleOnChange("spot_ref")}
            />
          </InputWrapper>
          <InputWrapper>
            <NumberInput
              label={KEY_MAP.premium.label}
              name="premium"
              tooltip={tooltips.premium}
              value={formState.premium}
              onChange={handleOnChange("premium")}
            />
          </InputWrapper>
        </FieldSet>
      </Form>

      <ButtonGroup>
        <Button
          label="Cancel"
          resizeMode="fit"
          size={ButtonSize.LARGE}
          type={ButtonType.OUTLINE}
          onClick={cancel}
        />
        <Button label="Save" resizeMode="fit" size={ButtonSize.LARGE} onClick={saveAndExit} />
        <Button
          label="Save & Add New One"
          resizeMode="fit"
          size={ButtonSize.LARGE}
          onClick={saveAndReset}
        />
      </ButtonGroup>
    </SideModal>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  gap: 32px;
`;

const FieldSet = styled.fieldset`
  border: 0;
  display: grid;
  gap: 32px 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const CurrencyPair = styled.fieldset`
  align-items: center;
  border: 0;
  display: flex;
  gap: 8px;
`;

const Legend = styled.legend`
  ${Typography.SUBHEAD_2}
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  margin-top: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  margin-top: 40px;
`;
