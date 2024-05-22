"use client";

import { useQueryParams } from "@/app/hooks";
import { type FWDRate } from "@/app/interface";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, ButtonType } from "ui/components";
import { Color, Typography } from "ui/styles";
import { BuildStep } from "../..";
import { useHedgeBuilderStore } from "../../../store";
import { FWDRatesInput } from "./components";
import { usePartialFWDRates } from "./hooks";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

export const FWDRatesStep: React.FunctionComponent<Props> = ({ onComplete, onCancel }) => {
  const { fwdRates, setFwdRates, editMode, completeStep } = useHedgeBuilderStore();
  const { rates, onChange, initialize } = usePartialFWDRates();
  const { update, remove } = useQueryParams();

  useEffect(() => {
    fwdRates !== undefined && initialize(fwdRates);
  }, [fwdRates]);

  const onBack = () => (editMode ? onCancel() : update("step", BuildStep.ENVIRONMENT));
  const onNext = () => {
    setFwdRates(rates as [FWDRate, FWDRate, FWDRate]);
    completeStep(BuildStep.FWD_RATES);
    // remove("step");
    onComplete();
  };

  return (
    <Container>
      <Content>
        <Section>
          <Title>Scenario Setting</Title>
          <Description>
            3 scenarios will be ran in order to compare results with different future forward point
            assumptions for each scenario.
          </Description>
        </Section>
        <InputContainer>
          {Array(3)
            .fill(null)
            .map((_, scenario) => (
              <FWDRatesInput
                key={scenario}
                index={scenario}
                rates={rates.at(scenario) ?? []}
                onChange={(day, value) => onChange(scenario, day, value)}
              />
            ))}
        </InputContainer>
      </Content>
      <Row>
        <Button
          label={editMode ? "Cancel" : "Back"}
          type={ButtonType.OUTLINE}
          resizeMode="fit"
          onClick={onBack}
        />
        <Button
          label={editMode ? "Save Parameter" : "Next"}
          resizeMode="fit"
          onClick={onNext}
          disabled={rates
            .flatMap((rates) => rates)
            .some((point) => point === undefined || (point ?? 0) < -10000 || (point ?? 0) > 10000)}
        />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
