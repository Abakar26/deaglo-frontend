"use client";

import { useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, ContentIcon, ContentIconColor, DropdownSelect } from "ui/components";
import { Color, Typography } from "ui/styles";
import { SectionContainer } from "../shared";

export function SimulationSection() {
  const [exposureId, setExposureId] = useState<string>();

  // TODO: Get options
  const options: string[] = [];

  function runSimulation() {
    // TODO: Missing implementation
    return alert("TODO");
  }

  return (
    <SectionContainer marginTop="32px">
      <Content>
        <ContentLeft>
          <ContentIcon color={ContentIconColor.BRAND_100} icon="strategy" />

          <div>
            <Title>Simulation performance</Title>
            <Description>Run simulation again and check how it's performing now</Description>
          </div>
        </ContentLeft>

        <ContentRight>
          <DropdownContainer>
            <DropdownSelect
              label="Exposure ID"
              options={options}
              selected={exposureId}
              onSelect={setExposureId}
            />
          </DropdownContainer>

          <Button
            disabled={exposureId === undefined}
            label="Run simulation"
            resizeMode="fit"
            type={ButtonType.OUTLINE}
            onClick={runSimulation}
          />
        </ContentRight>
      </Content>
    </SectionContainer>
  );
}

const Content = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ContentLeft = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
`;

const ContentRight = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;
`;

const Title = styled.h2`
  color: ${Color.NEUTRAL_900};
  ${Typography.SUBHEAD_1};
`;

const Description = styled.p`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
  margin-top: 4px;
`;

const DropdownContainer = styled.div`
  width: 400px;
`;
