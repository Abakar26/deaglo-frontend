"use client";

import styled from "styled-components";
import { Button, ButtonSize, ButtonType, Icon } from "ui/components";
import { Color, Typography } from "ui/styles";

export function SummaryEmptyState() {
  // TODO: Add feature when implemented
  function onAddAssets() {
    return alert("TODO");
  }

  function onExecuteStrategy() {
    // TODO: Add feature when implemented
    return alert("TODO");
  }

  return (
    <Container>
      <IconContainer>
        <Icon name="chart" size={24} color={Color.BRAND_800} />
      </IconContainer>

      <Title>Monitor your opened hedges here</Title>
      <Subtitle>
        {
          "Looks like we don't have any data to show you now. Start from adding your Assets and Liabilities or Execute your Strategies"
        }
      </Subtitle>

      <ButtonGroup>
        <Button label="Add Assets" resizeMode="fit" size={ButtonSize.LARGE} onClick={onAddAssets} />
        <Button
          label="Execute Strategy"
          resizeMode="fit"
          size={ButtonSize.LARGE}
          type={ButtonType.OUTLINE}
          onClick={onExecuteStrategy}
        />
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  align-items: center;
  background-color: ${Color.BRAND_100};
  border: 1px solid ${Color.BRAND_300};
  border-radius: 8px;
  display: flex;
  height: 48px;
  justify-content: center;
  width: 48px;
`;

const Title = styled.b`
  ${Typography.HEADER_2}
  margin-top: 24px;
`;

const Subtitle = styled.span`
  ${Typography.BODY_3}
  margin-top: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 32px;
`;
