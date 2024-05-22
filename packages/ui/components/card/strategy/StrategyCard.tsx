import React, { type PropsWithChildren } from "react";
import styled from "styled-components";
import { type Strategy } from "..";
import { Button, ButtonSize, ButtonType, PayoffDiagram } from "../../../components";
import { Color, Typography } from "../../../styles";
import { Card } from "../common";
import { StrategyLeg } from "./StrategyLeg";

interface Props {
  title: string;
  description?: string;
  strategy?: Strategy;
  onAdd?: () => void;
  onEdit?: () => void | undefined;
  onDelete?: () => void | undefined;
  added?: number;
  overview?: boolean;
  isPremium?: boolean;
}

export const StrategyCard: React.FunctionComponent<Props & PropsWithChildren> = ({
  title,
  description,
  strategy,
  onAdd,
  onEdit,
  onDelete,
  added,
  overview = true,
  isPremium = true,
}) => {
  return (
    <Card borderColor={added ? Color.BRAND_800 : Color.NEUTRAL_400}>
      <Row>
        {title}
        {onAdd && (
          <RowSection>
            {added && `${added} added`}
            <ButtonContainer>
              {onDelete && (
                <Button
                  size={ButtonSize.SMALL}
                  type={ButtonType.OUTLINE}
                  leadingIcon="trash"
                  onClick={onDelete}
                />
              )}
              {onEdit && (
                <Button
                  size={ButtonSize.SMALL}
                  type={ButtonType.OUTLINE}
                  leadingIcon="settings"
                  onClick={onEdit}
                />
              )}
              <Button
                size={ButtonSize.SMALL}
                type={ButtonType.OUTLINE}
                leadingIcon={added ? "pencil" : "plus"}
                onClick={onAdd}
              />
            </ButtonContainer>
          </RowSection>
        )}
      </Row>
      <Content>
        {overview && strategy && (
          <LegSection>
            {strategy.map((leg, index) => (
              <StrategyLeg parameters={leg} key={index} />
            ))}
          </LegSection>
        )}
        <Diagram>
          <PayoffDiagram
            legs={
              strategy?.map((leg) => ({
                ...leg,
                premium: isPremium ? leg.premium ?? 0 : 0,
                isBought: leg.action === "Bought",
                isCall: leg.option === "Forward" ? null : leg.option === "Call",
                leverage: 1,
                strike: leg.strike ?? 1,
              })) ?? []
            }
          />
        </Diagram>
      </Content>
      {!overview && <Description>{description}</Description>}
    </Card>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Typography.SUBHEAD_1};
`;

const RowSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  ${Typography.SUBHEAD_2};
  color: ${Color.BRAND_800};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-auto-columns: 32px;
  grid-auto-rows: 1fr;
  grid-column-gap: 12px;
  grid-auto-flow: column;
`;

const LegSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Diagram = styled.div`
  width: 100%;
  height: 138px;
`;
