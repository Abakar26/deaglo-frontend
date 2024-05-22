"use client";
import { type FWDRate } from "@/app/interface";
import React from "react";
import styled from "styled-components";
import { FWDRatesGraph, Segment, SegmentedContentBlock } from "ui/components";

interface Props {
  fwdRates: FWDRate;
}

export const FWDRates: React.FunctionComponent<Props> = ({ fwdRates }) => {
  return (
    <Container>
      <SegmentedContentBlock title={"Forward points"} equalized>
        <Segment label="Day 0">{fwdRates[0]}</Segment>
        <Segment label="Day 365">{fwdRates[1]}</Segment>
        <Segment label="Day 730">{fwdRates[2]}</Segment>
      </SegmentedContentBlock>
      <FWDRatesGraph rates={fwdRates} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  width: 330px;
  height: 330px;
`;
