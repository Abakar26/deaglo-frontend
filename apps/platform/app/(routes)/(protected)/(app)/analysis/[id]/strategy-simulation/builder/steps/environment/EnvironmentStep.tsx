"use client";

import { useQueryParams, useValidation } from "@/app/hooks";
import { EnvironmentName, type SimulationEnvironment } from "@/app/interface";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, SegmentedControl } from "ui/components";
import { Color, Typography } from "ui/styles";
import { BuildStep } from "../..";
import { useStrategyBuilderStore } from "../../store";
import { EnvironmentDisplay, EnvironmentInput } from "./components";
import { EnvironmentObject } from "./validation";

interface Props {
  onComplete: () => void;
  onCancel: () => void;
}

// export const DEFAULT_ENVIRONMENTS: Record<EnvironmentName, SimulationEnvironment> = {
//   [EnvironmentName.LOW_VOL]: {
//     name: EnvironmentName.LOW_VOL,
//     volatility: 7.6,
//     skew: 0,
//     appreciationPercent: 7,
//   },
//   [EnvironmentName.MED_VOL]: {
//     name: EnvironmentName.MED_VOL,
//     volatility: 7.6,
//     skew: 0,
//     appreciationPercent: 7,
//   },
//   [EnvironmentName.MED_VOL_TAIL]: {
//     name: EnvironmentName.MED_VOL_TAIL,
//     volatility: 7.6,
//     skew: 0,
//     appreciationPercent: 7,
//   },
//   [EnvironmentName.HIGH_VOL]: {
//     name: EnvironmentName.HIGH_VOL,
//     volatility: 7.6,
//     skew: 0,
//     appreciationPercent: 7,
//   },
//   [EnvironmentName.CUSTOM]: {
//     name: EnvironmentName.CUSTOM,
//     volatility: 7.6,
//     skew: 0,
//     appreciationPercent: 0,
//   },
// };

export const DEFAULT_ENVIRONMENT = {
  name: "Custom",
  volatility: 0,
  skew: 0,
  appreciationPercent: 0,
} as SimulationEnvironment;

export const EnvironmentStep: React.FunctionComponent<Props> = ({ onComplete, onCancel }) => {
  const { environment, setEnvironment, editMode, completeStep } = useStrategyBuilderStore();

  // const [displayMode, setDisplayMode] = useState<boolean>(!!environment);
  // const [envInstances, setEnvInstances] =
  //   useState<Record<EnvironmentName, SimulationEnvironment>>(DEFAULT_ENVIRONMENTS);

  // const [tab, setTab] = useState<EnvironmentName>(environment?.name ?? EnvironmentName.LOW_VOL);

  const { update } = useQueryParams();

  const { validate, errors } = useValidation(EnvironmentObject);

  // useEffect(() => setDisplayMode(!!environment), [environment]);

  const onNext = () => {
    if (environment) {
      completeStep(BuildStep.ENVIRONMENT);
      editMode ? onComplete() : update("step", BuildStep.STRATEGY);
    }
  };

  const onBack = () => (editMode ? onCancel() : update("step", BuildStep.NOTIONAL));

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
