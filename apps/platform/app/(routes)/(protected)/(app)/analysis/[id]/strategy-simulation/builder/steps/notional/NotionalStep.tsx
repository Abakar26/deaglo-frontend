"use client";

import { useQueryParams, useValidation } from "@/app/hooks";
import { formatAccounting } from "@/utilities/format";
import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  DateRangeInput,
  DropdownSelect,
  IconButton,
  NumberInput,
  TextInput,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { BuildStep } from "../..";
import { useAnalysisCurrencies } from "../../hooks";
import { useStrategyBuilderStore } from "../../store";
import { useNotionalStore } from "./store/useNotionalStore";
import { NotionalObject } from "./validation";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

export const NotionalStep: React.FunctionComponent<Props> = ({ onComplete, onCancel }) => {
  const { validate, errors } = useValidation(NotionalObject);

  const { update } = useQueryParams();
  const { notional, setNotional, completeStep, editMode } = useStrategyBuilderStore();
  const {
    setNotional: updateNotional,
    notional: { name, amount, isBaseSold, startDate, endDate },
  } = useNotionalStore();

  const { loading, error, currencies } = useAnalysisCurrencies();

  useEffect(() => {
    notional && updateNotional(notional);
  }, [notional, updateNotional]);

  const onNext = () => {
    if (amount && startDate && endDate && name) {
      validate({ amount, name, startDate, endDate }, (_) => {
        setNotional({
          name,
          amount,
          isBaseSold: isBaseSold ?? false,
          startDate,
          endDate,
        });
        completeStep(BuildStep.NOTIONAL);
        editMode ? onComplete() : update("step", BuildStep.ENVIRONMENT);
      });
    }
  };

  return (
    <Container>
      <Section>
        <Header>
          <Title>1. Enter a name for this simulation</Title>
          <Description>Choose a name to identify this simulation</Description>
        </Header>
        <TextInput
          label={"Name"}
          placeholder={"Simulation Name"}
          value={name ?? ""}
          onChange={(name) => updateNotional({ name })}
          error={errors.name}
        />
      </Section>
      <Section>
        <Header>
          <Title>2. Set your tenor</Title>
          <Description>
            Select a time frame in which you would want to see your strategy take place
          </Description>
        </Header>

        <DateRangeInput
          interval={{ start: startDate, end: endDate }}
          onChange={(tenor) => updateNotional({ endDate: tenor?.end, startDate: tenor?.start })}
          error={errors.tenor}
        />
      </Section>
      <Section>
        <Header>
          <Title>3. Provide currency pair direction and notional</Title>
          <Description>
            Provide currency pair direction and amount expressed in base currency
          </Description>
        </Header>
        <Row>
          <DropdownSelect
            selected={(isBaseSold ? currencies?.base.code : currencies?.foreign.code) ?? ""}
            onSelect={() => null}
            icon={isBaseSold ? currencies?.base.countryName : currencies?.foreign.countryName}
            disabled={!!error || loading}
            label={"Sold"}
            options={[]}
            changeable={false}
          />
          <IconButton
            name="exchange"
            onClick={() => updateNotional({ isBaseSold: !isBaseSold })}
            disabled={!!error || loading}
          />
          <DropdownSelect
            selected={(isBaseSold ? currencies?.foreign.code : currencies?.base.code) ?? ""}
            onSelect={() => null}
            icon={isBaseSold ? currencies?.foreign.countryName : currencies?.base.countryName}
            disabled={!!error || loading}
            label={"Bought"}
            options={[]}
            changeable={false}
          />
        </Row>
        <NumberInput
          label={"Amount"}
          placeholder={"Enter amount"}
          value={amount}
          onChange={(amount) => updateNotional({ amount })}
          error={errors.amount}
          formatter={(val: number) => formatAccounting(val, 0)}
          unitLabel={currencies?.base.code}
        />
      </Section>
      <Row end>
        <Button
          onClick={onCancel}
          type={ButtonType.OUTLINE}
          label={editMode ? "Cancel" : "Back"}
          disabled={!editMode}
          resizeMode="fit"
        />
        <Button
          onClick={onNext}
          disabled={!(amount && startDate && endDate && name)}
          label={editMode ? "Save Parameter" : "Next"}
          resizeMode="fit"
        />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 830px;
`;

const Title = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Row = styled.div<{ end?: boolean }>`
  display: flex;
  width: 100%;
  gap: 24px;
  justify-content: end;
`;
