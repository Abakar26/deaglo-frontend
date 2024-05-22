"use client";

import { useQueryParams } from "@/app/hooks";
import { EnvironmentName, type SimulationEnvironment } from "@/app/interface";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, SegmentedControl, useValidation } from "ui/components";
import { Color, Typography } from "ui/styles";
import { BuildStep } from "../..";
import { DEFAULT_ENVIRONMENT } from "../../../../strategy-simulation/builder/steps";
import {
  EnvironmentDisplay,
  EnvironmentInput,
} from "../../../../strategy-simulation/builder/steps/environment/components";
import { EnvironmentObject } from "../../../../strategy-simulation/builder/steps/environment/validation";
import { useHedgeBuilderStore } from "../../../store";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

export const EnvironmentStep: React.FunctionComponent<Props> = ({ onComplete, onCancel }) => {
  const { environment, setEnvironment, editMode, completeStep } = useHedgeBuilderStore();

  // const [displayMode, setDisplayMode] = useState<boolean>(!!environment);
  // const [envInstances, setEnvInstances] =
  //   useState<Record<EnvironmentName, SimulationEnvironment>>(DEFAULT_ENVIRONMENTS);

  // const [tab, setTab] = useState<EnvironmentName>(environment?.name ?? EnvironmentName.CUSTOM);

  const { update } = useQueryParams();

  const { validate, errors } = useValidation(EnvironmentObject);

  // useEffect(() => setDisplayMode(!!environment), [environment]);

  const onNext = () => {
    if (environment) {
      completeStep(BuildStep.ENVIRONMENT);
      editMode ? onComplete() : update("step", BuildStep.FWD_RATES);
    }
  };

  const onBack = () => (editMode ? onCancel() : update("step", BuildStep.HARVEST));

  // const onSelect = (env: SimulationEnvironment) => {
  //   validate(env, (_) => {
  //     setEnvironment(env);
  //     setDisplayMode(true);
  //   });
  // };

  // const onEdit = () => {
  //   setEnvInstances({
  //     ...DEFAULT_ENVIRONMENTS,
  //     ...(environment ? { [environment.name]: environment } : {}),
  //   });
  //   setDisplayMode(false);
  // };

  return (
    <Container>
      <Content>
        <TitleSection>
          <Title>Set the environment</Title>
          <Description>Set the market environment of your strategy</Description>
        </TitleSection>
        {/* {displayMode && environment ? (
          <EnvironmentDisplay environment={environment} onChange={onEdit} />
        ) : ( */}
        <InputContainer>
          {/* <SegmentedControl
              segments={Object.keys(DEFAULT_ENVIRONMENTS).map((name) => ({
                key: name,
                label: name,
              }))}
              initial={tab}
              onChange={({ key }) => setTab(key as EnvironmentName)}
            /> */}
          <EnvironmentInput
            environment={environment ?? DEFAULT_ENVIRONMENT}
            onChange={(env) => {
              validate(env, () => null);
              // setEnvInstances({ ...envInstances, [tab]: env });
              setEnvironment(env);
            }}
            // custom={tab === EnvironmentName.CUSTOM}
            custom={true}
            errors={errors}
          />
          {/* <Row>
              <Button
                label="Select Environment"
                onClick={() => onSelect(envInstances[tab])}
                resizeMode="fit"
              />
            </Row> */}
        </InputContainer>
        {/* )} */}
      </Content>

      <Row>
        <Button
          label={editMode ? "Cancel" : "Back"}
          onClick={onBack}
          type={ButtonType.OUTLINE}
          resizeMode="fit"
        />
        <Button
          label={editMode ? "Save Parameter" : "Next"}
          onClick={onNext}
          resizeMode="fit"
          // disabled={!environment || !displayMode}
        />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: calc(100vh - 220px);
  gap: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 700px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.div`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 24px;
`;
