import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Stepper } from "ui/components";

const meta = {
  title: "Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    current: {
      type: "string",
      description: "Key of current step",
    },
    steps: {
      description: "Array of steps with key, label, and complete",
    },
    onSelect: {
      type: "function",
      description: "Callback triggered on step click, takes key of selected step",
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneLevel: Story = {
  args: {
    current: "1",
    steps: [
      {
        key: "1",
        label: "Analyses",
        complete: false,
      },
    ],
  },
  // @ts-ignore
  render: (props) => <StepperWrapper {...props} />,
};

export const TwoLevels: Story = {
  args: {
    current: "2",
    steps: [
      {
        key: "1",
        label: "Analyses",
        complete: true,
      },
      {
        key: "2",
        label: "IG4 Analysis  2 EUR -> BRL",
        complete: false,
      },
    ],
  },
  // @ts-ignore
  render: (props) => <StepperWrapper {...props} />,
};

export const ThreeLevels: Story = {
  args: {
    current: "3",
    steps: [
      {
        key: "1",
        label: "Analyses",
        complete: true,
      },
      {
        key: "2",
        label: "IG4 Analysis  2 EUR -> BRL",
        complete: true,
      },
      {
        key: "3",
        label: "Strategy Simulation",
        complete: false,
      },
    ],
  },
  // @ts-ignore
  render: (props) => <StepperWrapper {...props} />,
};

export const FourLevels: Story = {
  args: {
    current: "2",
    steps: [
      {
        key: "1",
        label: "Analyses",
        complete: true,
      },
      {
        key: "2",
        label: "IG4 Analysis  2 EUR -> BRL",
        complete: true,
      },
      {
        key: "3",
        label: "Strategy Simulation",
        complete: false,
      },
      {
        key: "4",
        label: "Step 4",
        complete: false,
      },
    ],
  },
  // @ts-ignore
  render: (props) => <StepperWrapper {...props} />,
};

const StepperWrapper: React.FunctionComponent<{ current: string }> = (props) => {
  const [current, setCurrent] = useState<string>(props.current);
  useEffect(() => setCurrent(props.current), [props]);
  return <Stepper steps={[]} {...props} current={current} onSelect={setCurrent} />;
};
