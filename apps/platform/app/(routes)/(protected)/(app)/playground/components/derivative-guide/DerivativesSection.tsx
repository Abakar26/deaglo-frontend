"use client";

import type { Strategy } from "@/app/interface";
import { useState } from "react";
import { DropdownSelect } from "ui/components";
import {
  CardGroup,
  DropdownContainer,
  HeaderSpacer,
  SectionContainer,
  SectionHeader,
  SectionSubtitle,
  SectionTitle,
} from "../shared";
import { DerivativeCard } from "./DerivativeCard";
import { exposureDirectionOptions } from "./utilities";

type DerivativesSectionProps = {
  strategies: Strategy[];
};

export function DerivativesSection({ strategies }: DerivativesSectionProps) {
  const [direction, setDirection] = useState(exposureDirectionOptions[0]);

  return (
    <SectionContainer>
      <HeaderSpacer>
        <SectionHeader>
          <SectionTitle>Derivatives pay-off charts</SectionTitle>
          <SectionSubtitle>
            All strategies on this page have a default notional value of $1M.
          </SectionSubtitle>
        </SectionHeader>

        <DropdownContainer>
          <DropdownSelect
            label="Exposure direction"
            onSelect={setDirection}
            options={exposureDirectionOptions}
            selected={direction}
          />
        </DropdownContainer>
      </HeaderSpacer>

      <CardGroup>
        {strategies.map((strategy) => (
          <DerivativeCard
            key={strategy.strategyId}
            direction={direction?.key}
            strategy={strategy}
          />
        ))}
      </CardGroup>
    </SectionContainer>
  );
}
