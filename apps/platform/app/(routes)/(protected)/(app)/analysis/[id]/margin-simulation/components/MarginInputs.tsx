"use client";

import { useUrl } from "@/app/hooks";
import { useValidation } from "@/app/hooks/useValidation";
import { type StrategySimulation } from "@/app/interface";
import { formatAccounting } from "@/utilities/format";
import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  DropdownSelect,
  NumberInput,
  TextInput,
  type Selectable,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { useMarginSimulation } from "../hooks/useMarginSimulation";
import { MarginSimulationShape } from "../validation";
interface Props {
  simulations: Array<StrategySimulation>;
  analysisId: string;
}

export const MarginInputs: React.FunctionComponent<Props> = ({ simulations, analysisId }) => {
  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState<Array<StrategySimulation>>(simulations);
  const [strategy, setStrategy] = useState<Selectable>();
  const [minTransfer, setMinTransfer] = useState<number>();
  const [initialMargin, setInitialMargin] = useState<number>();
  const [variationMargin, setVariationMargin] = useState<number>();
  const [name, setName] = useState<string>("");
  const { backtrack } = useUrl();
  const disabled = !simulations.length;
  const submitDisabled = !strategy || !minTransfer || !initialMargin || !variationMargin;

  const { validate, errors } = useValidation(MarginSimulationShape);
  const { loading, create } = useMarginSimulation();

  const runSimulation = () => {
    if (!submitDisabled) {
      const data = {
        strategyId: strategy?.key,
        minTransfer,
        initialMargin,
        variationMargin,
        name,
      };
      validate(data, ({ initialMargin, variationMargin, name, strategyId, minTransfer }) => {
        void create(analysisId, {
          initialMarginPercentage: initialMargin / 100,
          variationMarginPercentage: variationMargin / 100,
          minimumTransferAmount: minTransfer,
          status: "In Progress",
          name,
          strategySimulationId: strategyId,
          pin: false,
        });
      });
    }
  };

  const onSearch = (value: string) => {
    setSearch(value);
    !value
      ? setFiltered(simulations)
      : setFiltered(
          simulations.filter((sim) => sim.name.toLowerCase().includes(value.toLowerCase()))
        );
  };

  const handleValueChange = <T,>(valueUpdater: (text: T) => void, value: T) => {
    valueUpdater(value);
    validateOnChange();
  };

  const validateOnChange = () => {
    const data = {
      strategyId: strategy?.key ?? "",
      name: name ?? "",
      minTransfer: minTransfer ?? 0,
      initialMargin: initialMargin ?? 0,
      variationMargin: variationMargin ?? 0,
    };
    validate(data, () => null);
  };

  return (
    <Container>
      <InputContainer>
        <DropdownSelect
          disabled={disabled}
          selected={strategy}
          onSelect={setStrategy}
          options={filtered.map(({ name, id }) => ({
            key: id,
            value: name,
          }))}
          onSearch={onSearch}
          search={search}
          placeholder="Strategy Simulation"
          label="Strategy Simulation"
          tooltip={{
            label: "What is Strategy Simulation?",
            body: "Strategy Simulation is analysis tool that can be used to evaluate downside risks and potential payoffs on different strategies. To run Margin Simulation, you must provide a completed Strategy Simulation",
            icon: "info",
          }}
          error={errors.strategyId}
        />
        <TextInput
          onChange={(n) => handleValueChange<string>(setName, n)}
          label="Name"
          tooltip={{
            label: "Margin Simulation name?",
            body: "Name your simulation with something unique and descriptive for easy identification on the analysis page.",
            icon: "info",
          }}
          value={name}
          error={errors.name}
        />

        <NumberInput
          label="Minimum Transfer Amount (MTA)"
          value={minTransfer}
          onChange={(mta) => handleValueChange<number>(setMinTransfer, mta ?? 0)}
          tooltip={{
            label: "What is Minimum Transfer Amount?",
            body: "Minimum Transfer Amount (MTA) is the minimum amount that can be transferred for any margin call.",
            icon: "info",
          }}
          error={errors.minTransfer}
          formatter={(val: number) => formatAccounting(val, 0)}
        />

        <NumberInput
          label="Initial Margin %"
          value={initialMargin}
          onChange={(im) => handleValueChange<number>(setInitialMargin, im ?? 0)}
          disabled={disabled}
          tooltip={{
            label: "What is Initial Margin %?",
            body: "Initial Margin % (IM%) specifies the required minimum percentage of collateral upfront to mitigate credit risk.",
            icon: "info",
          }}
          error={errors.initialMargin}
        />
        <NumberInput
          label="Variation Margin %"
          value={variationMargin}
          onChange={(vm) => handleValueChange<number>(setVariationMargin, vm ?? 0)}
          disabled={disabled}
          tooltip={{
            label: "What is Variation Margin %?",
            body: "Variation Margin % (VM%) is the collateral adjustment amount needed to cover potential valuation losses.",
            icon: "info",
          }}
          error={errors.variationMargin}
        />
      </InputContainer>

      <Row>
        Creating a new Simulation <br />
        result may take up to 2 minutes
        <Button type={ButtonType.OUTLINE} label="Back" resizeMode="fit" onClick={backtrack} />
        <Button
          label="Simulate"
          onClick={runSimulation}
          resizeMode="fit"
          disabled={submitDisabled}
          loading={loading}
        />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  margin-top: 48px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 390px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  text-align: end;
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
  gap: 16px;
`;
