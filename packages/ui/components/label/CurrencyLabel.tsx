import React from "react";
import styled from "styled-components";
import { type Flag, Icon } from "..";
import { Color, Typography } from "../../styles";

interface Props {
  baseFlag?: Flag;
  quoteFlag?: Flag;
  baseCurrency: string;
  quoteCurrency?: string;
  transparent?: boolean;
}

export const CurrencyLabel: React.FunctionComponent<Props> = ({
  baseFlag,
  quoteFlag,
  baseCurrency,
  quoteCurrency,
  transparent,
}) => {
  return (
    <Container transparent={transparent}>
      {baseFlag && (
        <Icon name={baseFlag} aria-label={"Base currency flag"} size={20} defaultSize={26} />
      )}
      <Currency>
        {baseCurrency}
        {quoteCurrency && (
          <>
            <Icon name="arrow-right" color={Color.NEUTRAL_700} size={16} />
            {quoteFlag && (
              <Icon
                name={quoteFlag}
                aria-label={"Quote currency flag"}
                size={20}
                defaultSize={26}
              />
            )}
            {quoteCurrency}
          </>
        )}
      </Currency>
    </Container>
  );
};

const Container = styled.div<{ transparent: boolean | undefined }>`
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: ${(props) => (props.transparent ? "" : "min-content")};
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 4px 8px;
  gap: 6px;
  background-color: ${(props) => (props.transparent ? "" : Color.NEUTRAL_150)};
`;

const Currency = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${Color.NEUTRAL_700};
  ${Typography.BODY_2};
  text-transform: uppercase;
`;
