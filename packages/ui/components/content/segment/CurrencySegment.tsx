import React from "react";
import styled from "styled-components";
import { Segment, SegmentedContentSize } from ".";
import { Icon, type Flag } from "../..";
import { Color } from "../../../styles";

interface Props {
  label?: string;
  baseCurrency: string;
  baseFlag: Flag;
  foreignCurrency?: string;
  foreignFlag?: Flag;
  size?: SegmentedContentSize;
}

export const CurrencySegment: React.FunctionComponent<Props> = ({
  label,
  baseCurrency,
  baseFlag,
  foreignCurrency,
  foreignFlag,
  size = SegmentedContentSize.SMALL,
}) => {
  return (
    <Segment label={label} size={size}>
      <Content size={size}>
        <Icon name={baseFlag} size={24} />
        {baseCurrency}
        {foreignCurrency && (
          <>
            <Icon name="arrow-right" size={20} color={Color.NEUTRAL_700} />
            {foreignFlag && <Icon name={foreignFlag} size={24} />}
            {foreignCurrency}
          </>
        )}
      </Content>
    </Segment>
  );
};

const Content = styled.div<{ size: SegmentedContentSize }>`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;
