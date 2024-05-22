import React from "react";
import styled from "styled-components";
import { type Leg } from "..";
import { toAccountingFormat } from "../../../../../apps/platform/utilities/conversions";
import {
  NumberInput,
  Segment,
  SegmentedContentBlock,
  SuspenseBlock,
  Tooltip,
  useValidation,
} from "../../../components";
import { Color, Typography } from "../../../styles";
import { StrategyLeg } from "./StrategyLeg";
import { LegObject } from "./validation";

interface Props {
  parameters: Leg;
  editMode: boolean;
  onChange: (parameters: Leg) => void;
  errors?: Record<string, string>;
}

export const EditStrategyLeg: React.FunctionComponent<Props> = ({
  parameters,
  editMode,
  onChange,
}) => {
  const { premium, premiumCurrency, leverage, strike, title, option, action } = parameters;
  const { validate, errors } = useValidation(LegObject);

  const withTitle = !!(option && action) || !!title;

  const onStrikeChange = (value?: number) => {
    validate({ leverage: leverage ?? 0, strike: value ?? 0 }, () => null);
    onChange({ ...parameters, strike: value });
  };

  const onLeverageChange = (value?: number) => {
    validate({ leverage: value ?? 0, strike: strike ?? 0 }, () => null);
    onChange({ ...parameters, leverage: value });
  };

  return (
    <Container editMode={editMode}>
      {editMode ? (
        <DisplaySection>
          {withTitle && <Title>{title ?? `${String(option)} (${action})`}</Title>}
          {!title?.includes("Forward") && (
            <>
              <Tooltip
                label="What is premium?"
                body="Premium is the current market price of an option contract."
                icon="info"
              />
              <SegmentedContentBlock>
                <Segment label={`Premium (${action === "Bought" ? "Paid" : "Received"})`}>
                  {premium !== undefined ? (
                    toAccountingFormat(premium) + (" " + premiumCurrency ?? "")
                  ) : (
                    <SuspenseBlock width={"124px"} height={"20px"} />
                  )}
                </Segment>
              </SegmentedContentBlock>
            </>
          )}
        </DisplaySection>
      ) : (
        <StrategyLeg parameters={parameters} separated />
      )}
      <ParameterSection show={editMode}>
        <NumberInput
          label="Leverage"
          value={leverage}
          onChange={onLeverageChange}
          tooltip={{
            label: "What is leverage?",
            body: "Leverage defines hedge ratio. For instance 1 = 100% hedged, 0.5 = 50% hedged.",
            icon: "info",
          }}
          error={errors.leverage}
        />
        {}
        {!title?.includes("Forward") && (
          <NumberInput
            label="Strike (ITMS/OTMS%)"
            value={strike}
            onChange={onStrikeChange}
            tooltip={{
              label: "What is strike?",
              body: "Strike is the value at which the options contract is exercised. Positive percentage value means ITM, negative value means OTM.",
              icon: "info",
            }}
            error={errors.strike}
            unitLabel="%"
          />
        )}
      </ParameterSection>
    </Container>
  );
};

const Container = styled.div<{ editMode: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.editMode ? "16px" : 0)};
`;

const DisplaySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ParameterSection = styled.div<{ show: boolean }>`
  width: 100%;
  height: ${(props) => (props.show ? "52px" : "0px")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: calc(50% - 10px) calc(50% - 10px);
  margin-top: ${(props) => (props.show ? "32px" : "0px")};
  transition:
    0.3s ease height,
    0.3s ease opacity,
    0.3s ease padding-top;
`;

const Title = styled.span`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_700};
`;
