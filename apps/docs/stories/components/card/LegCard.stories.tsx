import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LegCard, type Leg } from "ui/components";

const meta = {
  title: "LegCard",
  component: LegCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: { name: "string", required: true },
      description: "Card title",
    },
    parameters: {
      // @ts-ignore
      type: { name: "object", required: true },
      description: "Leg parameter values",
    },
    onChange: {
      type: "function",
      description: "Callback triggered on leg change, takes leg",
    },
    onDelete: {
      type: "function",
      description: "Callback triggered on delete button click",
    },
  },
} satisfies Meta<typeof LegCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Leg 1",
    parameters: {
      leverage: 1,
      strike: 0,
      tenor: "1 Month",
      action: "Bought",
      option: "Call",
      type: "Vanilla",
    },
  },
  render: (props) => <LegCardWrapper {...props} />,
};

const LegCardWrapper: React.FunctionComponent<{
  parameters: Leg;
  title: string;
}> = ({ parameters, title }) => {
  const [leg, setLeg] = useState<Leg>(parameters);

  return (
    <div style={{ width: "750px", height: "750px" }}>
      <LegCard title={title} parameters={leg} onChange={setLeg} onDelete={() => null} />
    </div>
  );
};
