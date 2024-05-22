import type { Meta, StoryObj } from "@storybook/react";
import { ActionBlock, iconRegistry } from "ui/components";

const meta = {
  title: "ActionBlock",
  component: ActionBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: { name: "string", required: true },
    },
    description: {
      type: { name: "string", required: true },
    },
    completed: {
      type: { name: "number", required: true },
      control: { type: "number" },
      description: "Number of tasks completed",
    },
    tasks: {
      type: { name: "number", required: true },
      control: { type: "number" },
      description: "Total number of tasks",
    },
    onDismiss: {
      type: "function",
      description: "Callback triggered on x button click",
    },
    icon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon Name",
      defaultValue: "info",
      type: { name: "string", required: false },
    },
  },
} satisfies Meta<typeof ActionBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Complete the Strategy Simulation",
    description: "Run the Strategy Simulation to proceed with executing your analysis.",
    tasks: 3,
    completed: 0,
    onDismiss: () => null,
    icon: "strategy",
  },
};
