"use client";

import type { Leg, Strategy } from "@/app/interface";
import { useState } from "react";
import { NumberInput, PayoffGraph, SegmentedControl } from "ui/components";
import { Card, CardDescription, CardTitle, HeaderSpacer, SmallChart } from "../shared";
import { getPayoffGraphProps, overrideStrategyDefaults, type ExposureDirection } from "./utilities";

type DerivativeCardProps = {
  direction: ExposureDirection | undefined;
  strategy: Strategy;
};

export function DerivativeCard({ direction, strategy: defaultStrategy }: DerivativeCardProps) {
  const overriddenStrategy = overrideStrategyDefaults(defaultStrategy);
  const [strategy, setStrategy] = useState(overriddenStrategy);
  const strategyLeg = strategy.legs[0];

  function onChange(key: keyof Leg, value: unknown) {
    setStrategy((current) => {
      const strategyLeg = current.legs[0];
      if (strategyLeg === undefined) return current;
      return { ...current, legs: [{ ...strategyLeg, [key]: value }] };
    });
  }

  const toPosition = (isBought: boolean | undefined) => (isBought ? "long" : "short");
  const toIsBought = (position: string) => position === "long";

  if (!strategyLeg) return null;

  return (
    <Card>
      <HeaderSpacer>
        <header>
          <CardTitle>{strategy.name}</CardTitle>
        </header>

        <SegmentedControl
          initial={toPosition(strategyLeg.isBought)}
          segments={[
            { key: "short", label: "Short" },
            { key: "long", label: "Long" },
          ]}
          onChange={(option) => onChange("isBought", toIsBought(option.key))}
        />
      </HeaderSpacer>

      <SmallChart>
        <PayoffGraph direction={direction} {...getPayoffGraphProps([strategyLeg])} />
      </SmallChart>

      <NumberInput
        label="Premium, %"
        value={strategy.name === "Forward" ? 0 : strategyLeg.premium}
        onChange={(value) => onChange("premium", value ?? 0)}
        disabled={strategy.name === "Forward"}
      />

      <CardDescription>{strategy.description}</CardDescription>
    </Card>
  );
}
