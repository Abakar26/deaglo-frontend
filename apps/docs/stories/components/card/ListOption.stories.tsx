import type { Meta, StoryObj } from "@storybook/react";
import { ListOption, iconRegistry } from "ui/components";

const meta = {
  title: "ListOption",
  component: ListOption,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    active: {
      type: { name: "boolean", required: true },
      description: "True iff this option is selected",
      control: { type: "boolean" },
    },
    icon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon Name",
      defaultValue: undefined,
      type: { name: "string", required: false },
    },
    label: {
      type: { name: "string", required: true },
      description: "Option label",
    },
    onClick: {
      type: { name: "function", required: true },
      description: "Callback triggered on option click",
    },
    multi: {
      type: { name: "boolean", required: false },
      description: "True iff this option is part of a multi-select list",
    },
  },
} satisfies Meta<typeof ListOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Strategy Simulation",
    active: true,
  },
};
