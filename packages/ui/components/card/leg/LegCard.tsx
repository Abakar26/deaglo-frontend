import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Card,
  actionOptions,
  barrierOptions,
  derivationSelectableOptions,
  typeOptions,
  type DerivativeType,
  type Leg,
} from "..";
import {
  DropdownSelect,
  IconButton,
  NumberInput,
  useValidation,
  type Selectable,
} from "../../../components";
import { Color, Typography } from "../../../styles";
import { LegObject } from "../strategy/validation";

interface Props {
  title: string;
  parameters: Leg;
  onChange: (leg: Leg) => void;
  onDelete: () => void;
  highlighted?: boolean;
}

export const LegCard: React.FunctionComponent<Props> = ({
  title,
  parameters,
  onChange,
  onDelete,
  highlighted = false,
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(highlighted);
  const [isBarrier, setIsBarrier] = useState<boolean>(parameters.type === "Barrier");
  const { validate, errors } = useValidation(LegObject);

  useEffect(() => {
    setOpen(highlighted);
  }, [highlighted]);

  useEffect(() => {
    setIsBarrier(
      parameters.type === "Barrier" ||
        (typeof parameters.type === "object" && parameters.type.value === "Barrier")
    );
  }, [parameters]);

  const blur = () => {
    setFocused(false);
  };

  const focus = () => {
    setFocused(true);
  };

  const onStrikeChange = (value?: number) => {
    validate({ leverage: parameters.leverage ?? 0, strike: value ?? 0 }, () => null);
    onChange({ ...parameters, strike: value });
  };

  const onLeverageChange = (value?: number) => {
    validate({ leverage: value ?? 0, strike: parameters.strike ?? 0 }, () => null);
    onChange({ ...parameters, leverage: value });
  };

  const onBarrierChange = (value?: number) => {
    validate(
      {
        leverage: parameters.leverage ?? 0,
        strike: parameters.strike ?? 0,
        barrierLevel: value,
      },
      () => null
    );
    onChange({ ...parameters, barrierLevel: value });
  };

  return (
    <Card borderColor={highlighted || focused ? Color.BRAND_800 : Color.NEUTRAL_400}>
      <Row>
        {title}
        <RowSection>
          <IconButton name="trash" color={Color.NEUTRAL_900} onClick={onDelete} />
          <IconContainer open={open}>
            <IconButton
              name="chevron-down"
              color={Color.NEUTRAL_900}
              onClick={() => setOpen(!open)}
            />
          </IconContainer>
        </RowSection>
      </Row>
      <InputSection open={open} isBarrier={isBarrier}>
        <DropdownSelect
          onOpen={focus}
          onClose={blur}
          selected={parameters.type}
          placeholder="Type of leg"
          onSelect={(type) => {
            if (type === "Barrier" && parameters.option === "Forward") {
              parameters.option = "Call";
              onChange({ ...parameters, option: "Call" });
            }
            onChange({ ...parameters, type });
          }}
          options={typeOptions}
          tooltip={{
            label: "What is the difference between vanilla and barrier options?",
            body: "Vanilla options are basic derivatives that give the holder the right, but not the obligation, to buy or sell an asset at a predetermined price within a specific timeframe. They include simple call and put options with straightforward payoff structures.\nBarrier options add a level of complexity to vanilla: their payoff depends on whether the underlying asset's price reaches a certain barrier level during the option's life.",
            icon: "info",
          }}
        />

        <BarrierSection open={isBarrier}>
          <DropdownSelect
            onOpen={focus}
            onClose={blur}
            selected={parameters.barrierType}
            label="Barrier type"
            onSelect={(barrierType) => onChange({ ...parameters, barrierType })}
            options={barrierOptions}
          />
          <NumberInput
            onFocus={focus}
            onBlur={blur}
            label="Barrier value (ITMS/OTMS%)"
            value={parameters.barrierLevel}
            onChange={onBarrierChange}
            error={errors.barrierLevel}
            unitLabel="%"
          />
        </BarrierSection>
        <Divider />
        <Row>
          <DropdownSelect
            onOpen={focus}
            onClose={blur}
            selected={
              {
                key: parameters.option?.toLowerCase(),
                value: parameters.option,
              } as Selectable
            }
            label="Type of derivative"
            onSelect={(option: Selectable) => {
              if (option.value === "Forward" && parameters.type === "Barrier") {
                parameters.type = "Vanilla";
                onChange({ ...parameters, type: "Vanilla" });
              }
              onChange({ ...parameters, option: option.value as DerivativeType });
            }}
            options={derivationSelectableOptions}
          />
          <DropdownSelect
            onOpen={focus}
            onClose={blur}
            selected={parameters.action}
            label="Bought or Sold"
            onSelect={(action) => onChange({ ...parameters, action })}
            options={actionOptions}
          />
        </Row>
        <Spacer />
        <Row>
          {/* <DropdownSelect
            onOpen={focus}
            onClose={blur}
            selected={parameters.tenor}
            label="Tenor"
            onSelect={(tenor) => onChange({ ...parameters, tenor })}
            options={tenorOptions}
            disabled={true}
            tooltip={{
              label: "What is tenor?",
              body: "Tenor is the time period from trade date to expiry date of the option.",
              icon: "info",
            }}
          /> */}
          <NumberInput
            onFocus={focus}
            onBlur={blur}
            label="Leverage"
            value={parameters.leverage}
            onChange={onLeverageChange}
            error={errors.leverage}
            tooltip={{
              label: "What is leverage?",
              body: "Leverage defines hedge ratio. For instance 1 = 100% hedged, 0.5 = 50% hedged.",
              icon: "info",
            }}
          />
          <StrikeContainer option={parameters.option}>
            <NumberInput
              onFocus={focus}
              onBlur={blur}
              label="Strike (ITMS/OTMS%)"
              disabled={parameters.option === "Forward"}
              value={parameters.strike}
              onChange={onStrikeChange}
              error={errors.strike}
              tooltip={{
                label: "What is strike?",
                body: "Strike is the value at which the options contract is exercised",
                icon: "info",
              }}
              unitLabel="%"
            />
          </StrikeContainer>
        </Row>
      </InputSection>
    </Card>
  );
};

const isSelectable = (option: string | Selectable | undefined): option is Selectable => {
  return (option as Selectable)?.key !== undefined && (option as Selectable)?.value !== undefined;
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${Color.NEUTRAL_900};
  ${Typography.SUBHEAD_1};
  gap: 24px;
`;

const RowSection = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  gap: 8px;
`;

const InputSection = styled.div<{ open: boolean; isBarrier: boolean }>`
  height: ${(props) => (!props.open ? "0px" : props.isBarrier ? "329px" : "264px")};
  opacity: ${(props) => (props.open ? 1 : 0)};
  width: 100%;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  gap: 20px;
  margin-top: ${(props) => (props.open ? "40px" : "-12px")};
  transition:
    0.2s ${(props) => (props.open ? "0.2s" : "0s")} ease opacity,
    0.3s ease height,
    ${(props) => (props.open ? "0.1s" : "0.3s")} ease margin-top;
`;

const StrikeContainer = styled.div<{ option: string | Selectable | undefined }>`
  opacity: ${(props) =>
    (typeof props.option === "string" && props.option === "Forward") ||
    (isSelectable(props.option) && props.option.value === "Forward")
      ? 0
      : 1};
  transition: 0.15s ease opacity;
  width: 100%;
`;

const BarrierSection = styled.div<{ open: boolean }>`
  width: 100%;
  height: ${(props) => (props.open ? "52px" : "0px")};
  opacity: ${(props) => (props.open ? 1 : 0)};
  margin-top: ${(props) => (props.open ? "0px" : "-12px")};
  transition:
    0.2s ease opacity,
    0.3s ease height,
    ${(props) => (props.open ? "0.1s" : "0.3s")} ease margin-top;
  display: flex;
  gap: 24px;
  align-items: flex-end;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${Color.NEUTRAL_400};
`;

const IconContainer = styled.div<{ open: boolean }>`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${(props) => (props.open ? "180deg" : 0)});
  transition: 0.15s ease transform;
`;

const Spacer = styled.div`
  min-height: 24px;
`;
