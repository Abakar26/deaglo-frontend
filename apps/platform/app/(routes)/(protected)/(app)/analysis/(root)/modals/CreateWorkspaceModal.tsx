"use client";

import type { Workspace } from "@/app/interface";
import { useCurrencyStore } from "@/app/store/CurrencyStates";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  DropdownSelect,
  Modal,
  TextInput,
  Toggle,
  type Selectable,
} from "ui/components";

interface Props {
  onCreate: (workspace: Workspace) => void;
  onDismiss: () => void;
}

export const CreateWorkspaceModal: React.FunctionComponent<Props> = ({ onCreate, onDismiss }) => {
  const { currencies } = useCurrencyStore();
  const [withCurrency, setWithCurrency] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [baseCurrencySearch, setBaseCurrencySearch] = useState("");
  const [baseCurrency, setBaseCurrency] = useState<Selectable | undefined>();

  const availableCurrencies = useMemo(
    () =>
      currencies
        .map(({ code, name, countryName }) => ({
          key: code,
          value: `${code} - ${name}`,
          flag: countryName,
        }))
        .sort((a, b) => a.key.localeCompare(b.key)),
    [currencies]
  );

  const [filteredBaseCurrencies, setFilteredBaseCurrencies] = useState(availableCurrencies);

  const createWorkspace = () => {
    onCreate(
      withCurrency
        ? {
            name: name,
            description: "Default",
            baseCurrency: baseCurrency
              ? {
                  code: baseCurrency?.key ?? "",
                  countryName: baseCurrency?.flag ?? "",
                }
              : { code: "", countryName: "" },
            analysis: [],
          }
        : {
            name: name,
            description: "Default",
            analysis: [],
          }
    );
    onDismiss();
  };

  useEffect(() => {
    const filteredBase = availableCurrencies.filter((currency) =>
      currency.value.toLowerCase().includes(baseCurrencySearch.toLowerCase())
    );
    setFilteredBaseCurrencies(filteredBase);
  }, [baseCurrencySearch, availableCurrencies]);

  const handleBaseCurrencySearch = (searchTerm: string) => {
    setBaseCurrencySearch(searchTerm);
  };

  return (
    <Modal
      title={"Create Workspace"}
      description={"Fill out all the necessary fields"}
      onDismiss={onDismiss}
    >
      <TextInput label={"Name"} placeholder="Workspace name" value={name} onChange={setName} />
      <Toggle
        active={withCurrency}
        onClick={() => setWithCurrency(!withCurrency)}
        label="Currency-based"
      />
      <BaseCurrency visible={withCurrency}>
        <DropdownSelect
          label="Base currency"
          placeholder="Select currency"
          icon={baseCurrency?.flag}
          options={filteredBaseCurrencies}
          selected={baseCurrency}
          onSelect={setBaseCurrency}
          onSearch={handleBaseCurrencySearch}
          search={baseCurrencySearch}
        />
      </BaseCurrency>
      <Row>
        <Button label="Cancel" onClick={onDismiss} type={ButtonType.OUTLINE} resizeMode="fit" />
        <Button
          label="Create Workspace"
          onClick={createWorkspace}
          resizeMode="fit"
          disabled={!(name && (!withCurrency || baseCurrency))}
        />
      </Row>
    </Modal>
  );
};

const BaseCurrency = styled.div<{ visible: boolean }>`
  overflow: ${(props) => (props.visible ? "visible" : "hidden")};
  height: ${(props) => (props.visible ? 52 : 0)}px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition:
    0.2s ease opacity,
    0.3s ease height;
  padding-top: 2px;
`;

const Row = styled.div`
  display: flex;
  justify-content: end;
  gap: 24px;
`;
