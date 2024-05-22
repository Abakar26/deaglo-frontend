"use client";

import styled from "styled-components";
import { Button, ButtonSize, ButtonType, DropdownSelect, NumberInput } from "ui/components";
import { Color, Typography } from "ui/styles";
import type { Leg } from "@/app/interface";

type DerivativeFormProps = {
  strategyLeg: Leg & { name: string };
  onChange: (field: keyof Leg, value: unknown) => void;
  onRemove?: () => void;
};

export function DerivativeForm({ strategyLeg, onChange, onRemove }: DerivativeFormProps) {
  const toPosition = (isBought: boolean | undefined) => (isBought ? "Long" : "Short");
  const toIsBought = (position: string) => position === "Long";

  return (
    <FieldSet>
      <LegendContainer>
        <Legend>{strategyLeg.name}</Legend>
        {onRemove ? (
          <SquareButton>
            <Button
              leadingIcon="trash"
              size={ButtonSize.SMALL}
              type={ButtonType.OUTLINE}
              onClick={onRemove}
            />
          </SquareButton>
        ) : null}
      </LegendContainer>

      <InputContainer>
        <InputWrapper>
          <DropdownSelect
            label="Long/short"
            options={["Long", "Short"]}
            selected={toPosition(strategyLeg.isBought)}
            // TODO: Add tooltip body
            tooltip={{ body: "TODO", icon: "info", label: "Long/short difference?" }}
            onSelect={(option) => onChange("isBought", toIsBought(option))}
          />
        </InputWrapper>
        <InputWrapper>
          <NumberInput
            label="Strike"
            // TODO: Add tooltip body
            tooltip={{ body: "TODO", icon: "info", label: "What's Strike?" }}
            value={strategyLeg.strike}
            onChange={(value) => onChange("strike", value ?? 0)}
          />
        </InputWrapper>
        <InputWrapper>
          <NumberInput
            label="Premium"
            // TODO: Add tooltip body
            tooltip={{ body: "TODO", icon: "info", label: "What's Premium?" }}
            value={strategyLeg.premium}
            onChange={(value) => onChange("premium", value ?? 0)}
          />
        </InputWrapper>
      </InputContainer>
    </FieldSet>
  );
}

const FieldSet = styled.fieldset`
  border: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LegendContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Legend = styled.legend`
  ${Typography.SUBHEAD_2}
  color: ${Color.NEUTRAL_700};
`;

const SquareButton = styled.div`
  width: 32px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const InputWrapper = styled.div`
  flex-basis: 100%;
  margin-top: 32px;
`;
