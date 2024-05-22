"use client";
import { type FWDRate, type HedgeResultsSummary } from "@/app/interface";
import React, { useState } from "react";
import { keyframes, styled } from "styled-components";
import {
  ButtonSize,
  DualDensityGraph,
  Segment,
  SegmentedContentBlock,
  SegmentedContentColor,
  SegmentedControl,
  SmallButton,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { HedgeDataTable } from "../data/HedgeDataTable";
import { FWDRates } from "./FWDRates";

interface Props {
  title: string;
  hedged: Array<number>;
  unhedged: Array<number>;
  summary: Record<string, HedgeResultsSummary>;
  fwdRate: FWDRate;
}

export const ScenarioCards: React.FunctionComponent<Props> = ({
  title,
  hedged,
  unhedged,
  summary,
  fwdRate,
}) => {
  const [showTable, setShowTable] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const hedgedMedian = summary[title]?.median ?? 0;
  const unhedgedMedian = summary["Unhedged IRR"]?.median ?? 0;

  return (
    <>
      <Container showDetails={showDetails}>
        <Row>
          <Title>{title}</Title>
          <Control>
            <SmallButton
              label={showDetails ? "Hide" : "Show"}
              leadingIcon={showDetails ? "hide" : "show"}
              onClick={() => setShowDetails(!showDetails)}
              size={ButtonSize.SMALL}
            />
            <SegmentedControl
              onChange={(event) => setShowTable(event.key === "1" ? false : true)}
              segments={[
                {
                  key: "1",
                  label: "",
                  icon: "chart",
                },
                {
                  key: "2",
                  label: "",
                  icon: "grid",
                },
              ]}
            />
          </Control>
        </Row>
        {showDetails && (
          <>
            <SegmentedContentBlock separated color={SegmentedContentColor.BRAND_100} equalized>
              {/* <Segment>
                <Block>
                  <Text>
                    Distribution of IRR is <Bold>far narrower</Bold> in the hedged IRR This is the
                    very essence of risk management- the reduction of variance
                  </Text>
                </Block>
              </Segment> */}
              <Segment>
                <Block>
                  <Text>
                    The average cost of the hedged share class (Median IRR) is{" "}
                    {hedgedMedian > unhedgedMedian ? "greater" : "less"} than unhedged by
                    <Bold>
                      {" "}
                      {((Math.abs(hedgedMedian - unhedgedMedian) * 100) / unhedgedMedian).toFixed(
                        2
                      )}
                      %
                    </Bold>
                  </Text>
                </Block>
              </Segment>
            </SegmentedContentBlock>
            <Row>
              <Graph>
                {showTable ? (
                  <FadeIn>
                    <HedgeDataTable data={summary} />
                  </FadeIn>
                ) : (
                  <FadeIn>
                    <DualDensityGraph
                      selected={title}
                      left={{
                        name: "Unhedged IRR",
                        data: unhedged,
                      }}
                      right={[
                        {
                          name: title,
                          data: hedged,
                        },
                      ]}
                    />
                  </FadeIn>
                )}
              </Graph>
              <FWDRates fwdRates={fwdRate} />
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div<{ showDetails: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  background: ${Color.NEUTRAL_00};
  padding: 20px;
  height: ${(props) => (!props.showDetails ? "80px" : "505px")};
  transition: 0.15s ease;
  width: 100%;
  gap: 12px;
`;

const Title = styled.h1`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
  width: 753px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Block = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
`;

const Text = styled.p`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_900};
`;

const Bold = styled.span`
  font-family: "HelveticaBold";
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Graph = styled.div`
  width: 100%;
  height: 330px;
  margin-top: 12px;
`;

const appear = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const FadeIn = styled.div`
  width: 100%;
  height: 330px;
  animation: ${appear} 1.2s ease;
`;
