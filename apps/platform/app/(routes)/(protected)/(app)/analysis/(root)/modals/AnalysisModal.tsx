"use client";

import { useValidation } from "@/app/hooks/useValidation";
import { type Analysis, type PartialAnalysis } from "@/app/interface";
import { useCurrencyStore } from "@/app/store/CurrencyStates";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  DropdownSelect,
  Icon,
  Modal,
  TextInput,
  type Selectable,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { AnalysisShape } from "../validation";

interface Props {
  analysis?: Analysis;
  onDismiss: () => void;
  onCreate?: (analysis: PartialAnalysis) => Promise<void>;
  onSave?: (analysisId: string, analysis: PartialAnalysis) => Promise<void>;
}

export const AnalysisModal: React.FunctionComponent<Props> = ({
  analysis,
  onDismiss,
  onSave,
  onCreate,
}) => {
  const { currencies } = useCurrencyStore();
  const router = useRouter();

  const availableCurrencies = useMemo(
    () =>
      currencies.map(({ code, name, countryName }) => ({
        key: code,
        value: `${code} - ${name}`,
        flag: countryName,
      })),
    [currencies]
  );

  const [name, setName] = useState<string>(analysis?.name ?? "");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string | undefined>(analysis?.category);
  const [baseCurrency, setBaseCurrency] = useState<Selectable | undefined>(
    availableCurrencies.find((curr) => curr.key === analysis?.baseCurrency.code)
  );
  const [foreignCurrency, setForeignCurrency] = useState<Selectable | undefined>(
    availableCurrencies.find((curr) => curr.key === analysis?.foreignCurrency.code)
  );
  const [baseCurrencySearch, setBaseCurrencySearch] = useState("");
  const [foreignCurrencySearch, setForeignCurrencySearch] = useState("");
  const [filteredBaseCurrencies, setFilteredBaseCurrencies] = useState(availableCurrencies);
  const [filteredForeignCurrencies, setFilteredForeignCurrencies] = useState(availableCurrencies);

  const { validate, errors } = useValidation(AnalysisShape);

  const handleNameChange = (newName: string) => {
    setName(newName);
    validate({ name: newName }, () => null);
  };

  const isNameValid = !errors.name;
  const savable = isNameValid && name && category && baseCurrency && foreignCurrency;
  const editMode = !!analysis;

  const saveAnalysis = async () => {
    validate({ name }, () => null);
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (savable && analysis && onSave) {
      await onSave(analysis?.analysisId ?? "", {
        name,
        category,
        baseCurrency: { code: baseCurrency.key, countryName: baseCurrency.flag! },
        foreignCurrency: { code: foreignCurrency.key, countryName: foreignCurrency.flag! },
      });
    } else if (savable && !analysis && onCreate) {
      await onCreate({
        name,
        category,
        baseCurrency: { code: baseCurrency.key, countryName: baseCurrency.flag! },
        foreignCurrency: { code: foreignCurrency.key, countryName: foreignCurrency.flag! },
      });
    }

    if (editMode) {
      router.refresh();
    }
    onDismiss();
  };

  useEffect(() => {
    const filteredBase = availableCurrencies.filter((currency) =>
      currency.value.toLowerCase().includes(baseCurrencySearch.toLowerCase())
    );
    setFilteredBaseCurrencies(filteredBase);
    const filteredForeign = availableCurrencies.filter((currency) =>
      currency.value.toLowerCase().includes(foreignCurrencySearch.toLowerCase())
    );
    setFilteredForeignCurrencies(filteredForeign);
  }, [baseCurrencySearch, foreignCurrencySearch, availableCurrencies]);

  const handleBaseCurrencySearch = (searchTerm: string) => {
    setBaseCurrencySearch(searchTerm);
  };

  const handleForeignCurrencySearch = (searchTerm: string) => {
    setForeignCurrencySearch(searchTerm);
  };

  return (
    <Modal
      title={editMode ? "Edit Analysis" : "Create Analysis"}
      description={"Fill out all the necessary fields"}
      onDismiss={onDismiss}
    >
      <Content>
        <TextContainer>
          <TextInput
            label="Name"
            placeholder="Analysis Name"
            value={name}
            onChange={handleNameChange}
            error={errors.name}
          />
        </TextContainer>
        <DropdownSelect
          label="Category"
          placeholder="Select category"
          options={["Foreign share class", "Operational FX", "Foreign investment"]}
          selected={category}
          onSelect={setCategory}
        />

        <Row>
          <Column>
            <DropdownSelect
              label="Base currency"
              placeholder="Select currency"
              disabled={editMode}
              icon={baseCurrency?.flag}
              options={filteredBaseCurrencies}
              selected={baseCurrency}
              onSelect={setBaseCurrency}
              onSearch={handleBaseCurrencySearch}
              search={baseCurrencySearch}
              tooltip={{
                label:
                  "The resulting currency pair may or may not be ISO standard; but it's important to follow these conventions for correct results.",
              }}
            />
            The organization's base currency
          </Column>
          <IconContainer>
            <Icon name="arrow-right" color={Color.NEUTRAL_700} />
          </IconContainer>

          <Column>
            <DropdownSelect
              label="Foreign currency"
              placeholder="Select currency"
              disabled={editMode}
              icon={foreignCurrency?.flag}
              options={filteredForeignCurrencies}
              selected={foreignCurrency}
              onSelect={setForeignCurrency}
              onSearch={handleForeignCurrencySearch}
              search={foreignCurrencySearch}
            />
            Select the local (foreign) currency. This is the currency of the region where the
            investment or cash flow is.
          </Column>
        </Row>
        <Row reverse>
          <Button
            label={editMode ? "Save" : "Create Analysis"}
            disabled={!savable}
            loading={loading}
            onClick={() => {
              setLoading(true);
              void saveAnalysis().then(() => setLoading(false));
            }}
            resizeMode="fit"
          />
          <Button label={"Cancel"} onClick={onDismiss} type={ButtonType.OUTLINE} resizeMode="fit" />
        </Row>
      </Content>
    </Modal>
  );
};

const Row = styled.div<{ reverse?: boolean }>`
  display: flex;
  align-items: start;
  gap: 24px;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  margin-top: 36px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${Color.NEUTRAL_700};
  ${Typography.LABEL_4};
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const IconContainer = styled.div`
  padding-top: 12px;
`;

const TextContainer = styled.div`
  margin-bottom: 12px;
`;
