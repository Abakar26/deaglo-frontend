"use client";
import { useConfirmationStore } from "@/app/(routes)/(protected)/(app)/store";
import { SimulationInteractor } from "@/app/interactors";
import { type PartialHedgeSimulation } from "@/app/interface";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  FWDRatesGraph,
  Segment,
  SegmentedContentBlock,
  SmallButton,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { BuildStep } from "../../builder";
import { HarvestDownload } from "../../builder/steps/harvest/components";

interface Props {
  hedge: PartialHedgeSimulation;
  onEdit: (step: BuildStep) => void;
}

export const Overview: React.FunctionComponent<Props> = ({ hedge, onEdit }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const { unregisterModal } = useConfirmationStore();

  const runSimulation = async () => {
    setLoading(true);
    unregisterModal("/hedge-simulation");
    const analysisId = pathname.split("/").at(-2) ?? "";
    const [success, error] = await SimulationInteractor.hedge.create(analysisId, hedge);
    success && router.push(`/analysis/${analysisId}/HEDGE_${success.id}`);
    if (error) {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <Title>Overview</Title>
        <Body4>Review the details below and apply any necessary changes.</Body4>
        <EditContainer>
          <Subhead1>Uploaded Investments</Subhead1>
          <SmallButton
            label="Edit"
            leadingIcon="pencil"
            onClick={() => onEdit(BuildStep.HARVEST)}
          />
        </EditContainer>
        <HarvestDownload
          fileName={`${hedge.name.replace(" ", "_")}.csv`}
          data={hedge.harvest ?? []}
        />
        <EditContainer>
          <Subhead1>Selected Environment</Subhead1>
          <SmallButton
            label="Edit"
            leadingIcon="pencil"
            onClick={() => onEdit(BuildStep.ENVIRONMENT)}
          />
        </EditContainer>
        <SegmentedContainer>
          <SegmentedContentBlock
            separated
            size={1}
            // title={hedge.simulationEnvironment.name}
            equalized
          >
            <Segment label="Volatility Model">GBM</Segment>
            <Segment label="Historical volatility">
              {(hedge.simulationEnvironment.volatility * 100).toFixed(2)}%
            </Segment>
            <Segment label="Skew">{hedge.simulationEnvironment.skew}%</Segment>
            <Segment label="Appreciation / Depreciation">
              {(hedge.simulationEnvironment.appreciationPercent * 100).toFixed(2)}%
            </Segment>
          </SegmentedContentBlock>
        </SegmentedContainer>
      </HeaderWrapper>
      <EditContainer>
        <Subhead1>Scenarios</Subhead1>
        <SmallButton
          label="Edit"
          leadingIcon="pencil"
          onClick={() => onEdit(BuildStep.FWD_RATES)}
        />
      </EditContainer>
      <GraphContainer>
        {hedge.fwdRates.map((scenarioNumber, index) => (
          <Graph key={`scenario-${index + 1}`}>
            <Subhead2>Scenario {index + 1}</Subhead2>
            <SegmentedContentBlock size={1} title="Forward points">
              {scenarioNumber.map((value, dayIndex) => (
                <Segment
                  key={`scenario-${index + 1}-day-${dayIndex}`}
                  label={`Day ${dayIndex * 365}`}
                >
                  {value}
                </Segment>
              ))}
            </SegmentedContentBlock>
            <ChartContainer>
              <FWDRatesGraph rates={hedge.fwdRates.at(index) ?? [0, 0, 0]} />
            </ChartContainer>
          </Graph>
        ))}
      </GraphContainer>
      <Row>
        <Button
          label={"Back"}
          type={ButtonType.OUTLINE}
          resizeMode={"fit"}
          onClick={() => onEdit(BuildStep.FWD_RATES)}
        />
        <Button
          label={"Simulate"}
          resizeMode={"fit"}
          loading={loading}
          onClick={() => void runSimulation()}
        />
      </Row>
    </Container>
  );
};

const Title = styled.span`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 20px;
  background: white;
  width: 100%;
  border-radius: 8px;
`;

const HeaderWrapper = styled.div`
  align-self: flex-start;
`;

const Subhead1 = styled.div`
  ${Typography.SUBHEAD_1};
  color: ${Color.NEUTRAL_900};
`;

const Subhead2 = styled.div`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

const EditContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 2em;
  align-self: stretch;
`;

const SegmentedContainer = styled.div`
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_300};
  margin-top: 10px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const GraphContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const Graph = styled.div`
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_300};
  margin-top: 10px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const ChartContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  height: 190px;
`;

const Row = styled.div`
  display: flex;
  gap: 24px;
  justify-content: end;
  width: 100%;
  margin-top: 24px;
`;

const Body4 = styled.p`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
  margin-bottom: 10px;
  margin-top: 1em;
`;
