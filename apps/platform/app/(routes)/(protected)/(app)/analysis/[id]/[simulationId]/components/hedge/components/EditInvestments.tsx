"use client";
import { format } from "date-fns";
import React from "react";
import { styled } from "styled-components";
import { SmallButton, UploadItem } from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  startDate: Date;
  endDate: Date;
}

export const EditInvestments: React.FunctionComponent<Props> = ({ startDate, endDate }) => {
  return (
    <>
      <Container>
        <Section>
          <Heading>
            Uploaded Investments{" "}
            <SmallButton leadingIcon="pencil" label="Edit" onClick={() => null} />
          </Heading>
          <DateText>
            {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
          </DateText>
          <UploadItem fileName="xirr_sample.csv" />
        </Section>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const DateText = styled.p`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_900};
  margin-bottom: 8px;
`;
