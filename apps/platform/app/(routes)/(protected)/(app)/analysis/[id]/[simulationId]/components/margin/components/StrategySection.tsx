"use client";

import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";
import {
  Button,
  ButtonType,
  Card,
  CardIcon,
  CardIconColor,
  ContentBlock,
  Label,
  LabelColor,
  LabelType,
} from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  name: string;
  status: string;
  dateUpdated: string;
  simulationId: string;
}

export const StrategySection: React.FunctionComponent<Props> = ({
  name,
  status,
  dateUpdated,
  simulationId,
}) => {
  const { id } = useParams();
  const router = useRouter();

  return (
    <ContentBlock
      title="This Margin Simulation is based on the Strategy Simulation below"
      description="You can check Strategy Simulation details by clicking the button to the right."
    >
      <Card>
        <Row>
          <RowSection>
            <CardIcon icon="strategy" color={CardIconColor.BRAND_100} />
            <Column>
              <Name>{name}</Name>
              <Caption>Strategy Simulation</Caption>
            </Column>

            <Column>
              <Label
                // TODO: well defined status labels
                label={status}
                color={LabelColor.SUCCESS}
                type={LabelType.BLANK}
              />
              <Caption>{format(new Date(dateUpdated), "MMM d, yyyy")}</Caption>
            </Column>
          </RowSection>
          <Button
            label="View Strategy Simulation"
            onClick={() => router.push(`STRATEGY_${simulationId}`)}
            resizeMode="fit"
            type={ButtonType.OUTLINE}
          />
        </Row>
      </Card>
    </ContentBlock>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RowSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: 44px;
  justify-content: space-between;
  margin-right: 28px;
  color: ${Color.NEUTRAL_900};
  ${Typography.BODY_2};
`;

const Caption = styled.span`
  color: ${Color.NEUTRAL_700};
  ${Typography.LABEL_4};
`;

const Name = styled.span`
  margin-top: 2px;
  color: ${Color.NEUTRAL_900};
  ${Typography.BODY_2};
`;
