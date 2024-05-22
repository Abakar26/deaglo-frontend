import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { InsertArea, StrategyCard } from "ui/components";

const meta = {
  title: "StrategyCard",
  component: StrategyCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: { name: "string", required: true },
      description: "Card title",
    },
    description: {
      type: "string",
      description: "Card description",
    },
    strategy: {
      description: "Array of strategy legs",
    },
    overview: {
      type: { name: "boolean", required: false },
      description: "True iff card is in overview mode",
    },
  },
} satisfies Meta<typeof StrategyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Generic: Story = {
  args: {
    title: "Call",
    description:
      "Single option paying off if spot > strike at maturity (European option) Here is an additional line of...",
  },
  // @ts-ignore
  render: (props) => <StrategyCardWrapper {...props} />,
};

export const GenericOverview: Story = {
  args: {
    title: "Call",
    overview: true,
    description:
      "Single option paying off if spot > strike at maturity (European option) Here is an additional line of...",
    strategy: [
      {
        premium: 1,
        leverage: 1.34,
        strike: 0,
      },
    ],
  },
  // @ts-ignore
  render: (props) => <StrategyCardWrapper {...props} />,
};

export const Composite: Story = {
  args: {
    title: "Seagull",
    description:
      "Single option paying off if spot > strike at maturity (European option) Here is an additional line of...",
    overview: true,
    strategy: [
      {
        premium: 3.4,
        legAmount: 1,
        strike: 0,
        leverage: 1.34,
        option: "Call",
        action: "Bought",
      },
      {
        premium: 1.4,
        legAmount: 1.2,
        strike: 2,
        leverage: 4.34,
        option: "Put",
        action: "Bought",
      },
    ],
  },
  // @ts-ignore
  render: (props) => <StrategyCardWrapper {...props} />,
};

export const Custom: Story = {
  args: {
    title: "Strategy 1",
    strategy: [
      {
        title: "Leg 1",
        legAmount: 1,
        strike: 0,
        leverage: 1.34,
        option: "Call",
        action: "Bought",
      },
      {
        title: "Leg 2",
        legAmount: 1.2,
        strike: 2,
        leverage: 4.34,
        option: "Put",
        action: "Bought",
      },
    ],
  },
  // @ts-ignore
  render: (props) => <StrategyCardWrapper {...props} />,
};

const StrategyCardWrapper: React.FunctionComponent = (props) => {
  const [added, setAdded] = useState<number>();

  const onAdd = () => {
    setAdded((added ?? 0) + 1);
  };
  return (
    <StrategyCard title="" added={added} onAdd={onAdd} {...props}>
      <div style={{ height: "138px", minWidth: "290px", width: "100%" }}>
        <InsertArea label="Strategy Image" />
      </div>
    </StrategyCard>
  );
};
