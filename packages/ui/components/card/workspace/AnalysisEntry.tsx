import React from "react";
import styled from "styled-components";
import { CardIcon, CardIconColor, Icon, IconButton } from "../../../components";
import { Color, Typography } from "../../../styles";

interface Props {
  title: string;
  baseCurrency: string;
  quoteCurrency: string;
  onRemove: () => void;
}

export const AnalysisEntry: React.FunctionComponent<Props> = ({
  title,
  baseCurrency,
  quoteCurrency,
  onRemove,
}) => {
  return (
    <Container>
      <Analysis>
        <CardIcon color={CardIconColor.NEUTRAL_300} icon="analysis" />
        <Column>
          <Title>{title}</Title>
          <Currency>
            {baseCurrency}
            <Icon name="arrow-right" color={Color.NEUTRAL_700} size={16} />
            {quoteCurrency}
          </Currency>
        </Column>
      </Analysis>
      <IconButton name="remove" size={20} onClick={onRemove} color={Color.NEUTRAL_900} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Analysis = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Currency = styled.div`
  display: flex;
  ${Typography.LABEL_4};
  color: ${Color.NEUTRAL_700};
  text-transform: uppercase;
  gap: 4px;
  width: min-content;
  white-space: nowrap;
`;

const Title = styled.span`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_900};
  white-space: nowrap;
`;
