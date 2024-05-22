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
  NumberInput,
  SideModal,
  NumberInputType,
  type Selectable,
} from "ui/components";
import { useCurrencySelect } from "@/app/hooks/useCurrencySelect";
import type { Exposure } from "@/app/interface/management";
import { type ExposuresType, FIELD_MAP, tooltips } from "../utilities";

type AddExposureFormProps = {
  type: ExposuresType;
};

type FormState = Omit<Exposure, "foreignCurrency"> & {
  foreignCurrency: Selectable;
};

export function AddExposureForm({ type }: AddExposureFormProps) {
  const router = useRouter();

  const [formState, setFormState] = useState<Partial<FormState>>({});

  const {
    options: currencyOptions,
    search: currencySearch,
    onSearch: onCurrencySearch,
  } = useCurrencySelect();

  // TODO: Add options
  const exposureTypeOptions: string[] = [];

  function handleOnChange(name: keyof FormState) {
    return function (value: unknown) {
      setFormState((current) => ({ ...current, [name]: value }));
    };
  }

  function onCurrencySelect(option: Selectable) {
    onCurrencySearch("");
    return handleOnChange("foreignCurrency")(option);
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
    router.push(`/management/${type}`);
  }

  function saveAndReset() {
    save();
  }

  const uploadFile = () => router.push(`/management/${type}/upload`);

  function getTitle(type: ExposuresType) {
    switch (type) {
      case "assets":
        return "Add Asset";
      case "liabilities":
        return "Add Liability";
    }
  }

  return (
    <SideModal
      title={getTitle(type)}
      action={{ label: "Upload CSV", onClick: uploadFile }}
      onDismiss={cancel}
    >
      <Form>
        <InputWrapper>
          <NumberInput
            label={FIELD_MAP[type].exposureId.label}
            name="exposureId"
            tooltip={tooltips[type].exposureId}
            type={NumberInputType.INTEGER}
            value={formState.exposureId}
            onChange={handleOnChange("exposureId")}
          />
        </InputWrapper>

        <InputWrapper>
          <DropdownSelect
            label={FIELD_MAP[type].exposureType.label}
            options={exposureTypeOptions}
            selected={formState.exposureType}
            tooltip={tooltips[type].exposureType}
            onSelect={handleOnChange("exposureType")}
          />
        </InputWrapper>

        <InputWrapper>
          <DropdownSelect<Selectable>
            icon={formState.foreignCurrency?.flag}
            label={FIELD_MAP[type].foreignCurrency.label}
            options={currencyOptions}
            search={currencySearch}
            selected={formState.foreignCurrency}
            tooltip={tooltips[type].foreignCurrency}
            onSearch={onCurrencySearch}
            onSelect={onCurrencySelect}
          />
        </InputWrapper>

        <div />

        <InputWrapper>
          <DateInput
            aria-label={FIELD_MAP[type].theoreticalPaymentDate.label}
            date={formState.theoreticalPaymentDate}
            tooltip={tooltips[type].theoreticalPaymentDate}
            onChange={handleOnChange("theoreticalPaymentDate")}
          />
        </InputWrapper>

        <InputWrapper>
          <DateInput
            aria-label={FIELD_MAP[type].realizedPaymentDate.label}
            date={formState.realizedPaymentDate}
            tooltip={tooltips[type].realizedPaymentDate}
            onChange={handleOnChange("realizedPaymentDate")}
          />
        </InputWrapper>

        <InputWrapper>
          <NumberInput
            label={FIELD_MAP[type].theoreticalInterestPayment.label}
            name="theoreticalInterestPayment"
            tooltip={tooltips[type].theoreticalInterestPayment}
            value={formState.theoreticalInterestPayment}
            onChange={handleOnChange("theoreticalInterestPayment")}
          />
        </InputWrapper>

        <InputWrapper>
          <NumberInput
            label={FIELD_MAP[type].realizedInterestPayment.label}
            name="realizedInterestPayment"
            tooltip={tooltips[type].realizedInterestPayment}
            value={formState.realizedInterestPayment}
            onChange={handleOnChange("realizedInterestPayment")}
          />
        </InputWrapper>

        <InputWrapper>
          <NumberInput
            label={FIELD_MAP[type].theoreticalPrincipalPayment.label}
            name="theoreticalPrincipalPayment"
            tooltip={tooltips[type].theoreticalPrincipalPayment}
            value={formState.theoreticalPrincipalPayment}
            onChange={handleOnChange("theoreticalPrincipalPayment")}
          />
        </InputWrapper>

        <InputWrapper>
          <NumberInput
            label={FIELD_MAP[type].realizedPrincipalPayment.label}
            name="realizedPrincipalPayment"
            tooltip={tooltips[type].realizedPrincipalPayment}
            value={formState.realizedPrincipalPayment}
            onChange={handleOnChange("realizedPrincipalPayment")}
          />
        </InputWrapper>
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 32px;
  gap: 32px;
`;

const InputWrapper = styled.div`
  margin-top: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  margin-top: auto;
`;
