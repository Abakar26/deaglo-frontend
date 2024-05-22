"use client";

import { type SimulationEnvironment } from "@/app/interface";
import React from "react";
import styled from "styled-components";
import { DropdownSelect, NumberInput, type TooltipProps } from "ui/components";
import { FrozenInput } from "./FrozenInput";

interface Props {
  environment: SimulationEnvironment;
  onChange: (env: SimulationEnvironment) => void;
  custom: boolean;
  errors: Record<string, string | undefined>;
}

const TOOLTIP_VALUES = {
  volatilityModel: {
    icon: "info",
    label: "What is volatility model?",
    body: "Select a Volatility Model to simulate future currency fluctuations within your strategy. The default option, Geometric Brownian Motion (GBM), assumes the logarithm of the FX spot rate follows a fixed volatility, skew and kurtosis.",
  },
  volatility: {
    icon: "info",
    label: "What is historical volatility?",
    body: "Historical Volatility represents the degree of variation in the exchange rate of a currency pair over a specific past period, typically calculated from yearly spot history. It's expressed as a percentage to provide insight into the currency's past price fluctuations.",
  },
  skew: {
    icon: "info",
    label: "What is skew?",
    body: "Skewness is a measurement of the distortion of symmetrical distribution or asymmetry in a data set.",
  },
  appreciationPercent: {
    icon: "info",
    label: "What is Appreciation / Depreciation?",
    body: "Enter an annual appreciation / depreciation percentage of the local currency against your base.",
  },
} as const;
type TooltipKeys = keyof typeof TOOLTIP_VALUES;
const tooltips: Record<TooltipKeys, TooltipProps> = TOOLTIP_VALUES;

export const EnvironmentInput: React.FunctionComponent<Props> = ({
  environment,
  onChange,
  custom,
  errors,
}) => {
  return (
    <Container>
      <FrozenInput label="Volatility model" value={"GBM"} tooltip={tooltips.volatilityModel} />
      {custom ? (
        <>
          <NumberInput
            label={"Historical volatility"}
            value={environment.volatility}
            onChange={(volatility) => volatility && onChange({ ...environment, volatility })}
            tooltip={tooltips.volatility}
            error={errors.volatility}
            unitLabel="%"
          />
          <DropdownSelect
            label={"Skew"}
            selected={`${environment.skew}`}
            options={["-0.1", "-0.075", "-0.05", "-0.025", "0", "0.025", "0.05", "0.075", "0.1"]}
            onSelect={(amount) => onChange({ ...environment, skew: parseFloat(amount) })}
            tooltip={tooltips.skew}
            error={errors.skew}
          />
        </>
      ) : (
        <>
          <FrozenInput
            label={"Historical volatility"}
            value={environment.volatility + "%"}
            tooltip={tooltips.volatility}
          />
          <FrozenInput label={"Skew"} value={environment.skew} tooltip={tooltips.skew} />
        </>
      )}
      <NumberInput
        label={"Appreciation / Depreciation"}
        value={environment.appreciationPercent}
        onChange={(appreciationPercent) => {
          if (appreciationPercent !== undefined) {
            onChange({ ...environment, appreciationPercent });
          }
        }}
        error={errors.appreciationPercent}
        tooltip={tooltips.appreciationPercent}
        unitLabel="%"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  width: 100%;
  margin-top: 24px;
`;
