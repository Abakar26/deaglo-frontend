import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { EditStrategyCard, type Strategy } from "ui/components";

const meta = {
  title: "EditStrategyCard",
  component: EditStrategyCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: { name: "string", required: true },
      description: "Card title",
    },
    strategy: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Array of strategy legs",
    },
    onChange: {
      type: { name: "function", required: true },
      description: "Callback triggered when a leg is updated, takes array of strategy leg",
    },
    onDelete: {
      type: { name: "function", required: true },
      description: "Callback triggered on delete button click",
    },
  },
} satisfies Meta<typeof EditStrategyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Call",
    strategy: [
      {
        premium: 1,
        leverage: 1.34,
        strike: 0,
      },
    ],
  },
  // @ts-ignore
  render: (props) => <EditStrategyCardWrapper {...props} />,
};

export const Composite: Story = {
  args: {
    title: "Seagull-1",
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
  render: (props) => <EditStrategyCardWrapper {...props} />,
};

const EditStrategyCardWrapper: React.FunctionComponent<{
  strategy: Strategy;
}> = (props) => {
  const [legs, setLegs] = useState<Strategy>(props.strategy);

  return (
    <div style={{ width: "650px", height: "750px" }}>
      <EditStrategyCard
        title=""
        onDelete={() => null}
        {...props}
        strategy={legs}
        onChange={setLegs}
      />
    </div>
  );
};
