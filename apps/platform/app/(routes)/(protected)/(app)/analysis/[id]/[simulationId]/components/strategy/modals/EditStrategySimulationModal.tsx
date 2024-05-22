"use client";

import { SimulationInteractor } from "@/app/interactors";
import { type Analysis } from "@/app/interface";
import { instanceToLegs } from "@/app/interface/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, Icon, SideModal, SmallButton, StrategyCard } from "ui/components";
import { Color, Typography } from "ui/styles";
import { BuildStep } from "../../../../strategy-simulation/builder";
import { useEditMode } from "../../../hooks/useEditMode";
import { AmountDisplay } from "../components";
import { Summary } from "../components/market/Summary";
import { useStrategySimulationStore } from "../store";

interface Props {
  analysis: Analysis;
}

export const EditStrategySimulationModal: React.FunctionComponent<Props> = ({ analysis }) => {
  const { editStrategy, setEditStrategy } = useStrategySimulationStore();
  const { setEditMode } = useEditMode();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const onEdit = (step: BuildStep) => {
    setEditMode(true, { key: "step", value: step });
  };

  const runSimulation = async () => {
    if (editStrategy) {
      setLoading(true);
      const [success, error] = await SimulationInteractor.strategy.update(
        analysis.analysisId,
        editStrategy.id,
        editStrategy
      );
      error && setError(error);
      if (success) {
        router.refresh();
        setEditStrategy(undefined);
      }
      setLoading(false);
    }
  };

  return (
    <SideModal
      onDismiss={() => setEditStrategy(undefined)}
      title={"Editing simulation parameters"}
      width={930}
    >
      <Warning>
        <Icon name="info" color={Color.BROWN_800} size={20} />
        <WarningBody>
          Changing parameters will start a new simulation and previous results will be lost
        </WarningBody>
      </Warning>
      {editStrategy && (
        <Content>
          <Section>
            <Heading>
              Name
              <SmallButton
                leadingIcon="pencil"
                label="Edit"
                onClick={() => onEdit(BuildStep.NOTIONAL)}
              />
            </Heading>
            <DateSection>{editStrategy.name}</DateSection>
          </Section>
          <Section>
            <Heading>
              Time frame
              <SmallButton
                leadingIcon="pencil"
                label="Edit"
                onClick={() => onEdit(BuildStep.NOTIONAL)}
              />
            </Heading>
            <DateSection>
              {editStrategy.startDate} - {editStrategy.endDate}
            </DateSection>
          </Section>
          <Section>
            <Heading>
              Amount
              <SmallButton
                leadingIcon="pencil"
                label="Edit"
                onClick={() => onEdit(BuildStep.NOTIONAL)}
              />
            </Heading>
            <AmountDisplay
              baseAmount={editStrategy.notional}
              quoteAmount={0}
              baseFlag={analysis.baseCurrency.countryName}
              quoteFlag={analysis.foreignCurrency.countryName}
              baseCurrency={analysis.baseCurrency.code}
              quoteCurrency={analysis.foreignCurrency.code}
            />
          </Section>
          <Section>
            <Heading>
              Selected Environment
              <SmallButton
                leadingIcon="pencil"
                label="Edit"
                onClick={() => onEdit(BuildStep.ENVIRONMENT)}
              />
            </Heading>
            <SummaryContainer>
              <Summary
                name={editStrategy.simulationEnvironment.name}
                segments={[
                  {
                    label: "Volatility Model",
                    value: "GBM",
                  },
                  {
                    label: "Historical Volatility",
                    value: `${(editStrategy.simulationEnvironment.volatility * 100).toFixed(2)}%`,
                  },
                  {
                    label: "Skew",
                    value: `${editStrategy.simulationEnvironment.skew}%`,
                  },
                  {
                    label: "Appreciation / Depreciation",
                    value: `${(
                      editStrategy.simulationEnvironment.appreciationPercent * 100
                    ).toFixed(2)}%`,
                  },
                ]}
              />
            </SummaryContainer>
          </Section>
          <Section>
            <Heading>
              Strategies
              <SmallButton
                leadingIcon="pencil"
                label="Edit"
                onClick={() => onEdit(BuildStep.STRATEGY)}
              />
            </Heading>
            <StrategyList>
              {editStrategy.strategyInstance.map(({ name, legs }) => (
                <StrategyCard
                  isPremium={false}
                  key={name}
                  title={name}
                  strategy={instanceToLegs(legs)}
                />
              ))}
            </StrategyList>
          </Section>
        </Content>
      )}
      <Row>
        Creating a new Simulation <br />
        result may take up to 1 minute
        <Button
          label="Cancel"
          type={ButtonType.OUTLINE}
          onClick={() => setEditStrategy(undefined)}
          resizeMode="fit"
        />
        <Button
          label="Simulate"
          onClick={() => void runSimulation()}
          resizeMode="fit"
          loading={loading}
        />
      </Row>
    </SideModal>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateSection = styled.span`
  ${Typography.SUBHEAD_3};
  color: ${Color.NEUTRAL_900};
`;

const StrategyList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-auto-rows: minmax(min-content, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const Warning = styled.div`
  gap: 4px;
  display: flex;
  margin-top: 8px;
`;

const WarningBody = styled.span`
  color: ${Color.BROWN_800};
  ${Typography.BODY_3};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 20px;
`;

const SummaryContainer = styled.div`
  width: 600px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  text-align: end;
  gap: 24px;
  color: ${Color.NEUTRAL_700};
  ${Typography.BODY_3};
  margin-top: 40px;
`;

const InsertAreaContainer = styled.div`
  height: 138px;
  min-width: 290px;
  width: 100%;
`;
