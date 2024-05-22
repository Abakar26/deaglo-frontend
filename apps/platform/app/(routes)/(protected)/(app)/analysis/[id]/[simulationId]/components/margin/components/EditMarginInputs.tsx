"use client";

import { useValidation } from "@/app/hooks";
import { type StrategySimulation } from "@/app/interface";
import { formatAccounting } from "@/utilities/format";
import { useParams } from "next/navigation";
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
import { useMarginSimulation } from "../../../../margin-simulation/hooks/useMarginSimulation";
import { MarginSimulationShape } from "../../../../margin-simulation/validation";
import { useMarginSimulationStore } from "../store";

interface Props {
  strategies: Array<StrategySimulation>;
}

export const EditMarginInputs: React.FunctionComponent<Props> = ({ strategies }) => {
  const { editMargin, setEditMargin } = useMarginSimulationStore();
  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState<Array<StrategySimulation>>(strategies);
  const [strategy, setStrategy] = useState<Selectable | undefined>(
    editMargin
      ? { key: editMargin.strategySimulationId, value: editMargin.strategySimulation.name }
      : undefined
  );
  const [minTransfer, setMinTransfer] = useState<number | undefined>(
    editMargin ? parseFloat(`${editMargin.minimumTransferAmount}`) : undefined
  );
  const [initialMargin, setInitialMargin] = useState<number | undefined>(
    editMargin ? editMargin.initialMarginPercentage * 100 : undefined
  );
  const [variationMargin, setVariationMargin] = useState<number | undefined>(
    editMargin ? editMargin.variationMarginPercentage * 100 : undefined
  );
  const [name, setName] = useState<string>(editMargin?.name ?? "");
  const saveDisabled = !strategy || !minTransfer || !initialMargin || !variationMargin;
  const { id } = useParams<{
    id: string;
  }>();

  const { validate, errors } = useValidation(MarginSimulationShape);
  const { loading, update } = useMarginSimulation();

  const onSave = () => {
    if (!saveDisabled) {
      const data = {
        strategyId: strategy?.key,
        minTransfer,
        initialMargin,
        variationMargin,
        name,
      };
      validate(data, ({ minTransfer, initialMargin, variationMargin, strategyId }) => {
        update(id, editMargin?.id ?? "", {
          name,
          minimumTransferAmount: minTransfer,
          initialMarginPercentage: initialMargin / 100,
          variationMarginPercentage: variationMargin / 100,
          strategySimulationId: strategyId,
          status: "In Progress",
        }).catch((err) => console.error(err));
      });
    }
  };

  const onSearch = (value: string) => {
    setSearch(value);
    !value
      ? setFiltered(strategies)
      : setFiltered(
          strategies.filter((sim) => sim.name.toLowerCase().includes(value.toLowerCase()))
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
          selected={strategy}
          onSelect={setStrategy}
          options={strategies.map(({ name, id }) => ({
            key: id,
            value: name,
          }))}
          placeholder="Strategy Simulation"
          label="Strategy Simulation"
          tooltip={{
            label: "What is Strategy Simulation?",
            body: "Strategy Simulation is analysis tool that can be used to evaluate downside risks and potential payoffs on different strategies. To run Margin Simulation, you must provide a completed Strategy Simulation",
            icon: "info",
          }}
          onSearch={onSearch}
          search={search}
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
        <Button
          type={ButtonType.OUTLINE}
          label="Cancel"
          resizeMode="fit"
          onClick={() => setEditMargin(undefined)}
        />
        <Button
          label="Save"
          resizeMode="fit"
          disabled={saveDisabled}
          onClick={onSave}
          loading={loading}
        />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  width: 390px;
  padding-top: 48px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  text-align: end;
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
  gap: 16px;
  margin-top: 24px;
`;
