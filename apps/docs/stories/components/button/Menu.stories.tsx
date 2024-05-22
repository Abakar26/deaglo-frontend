import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "ui/components";

const meta = {
  title: "Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      type: "function",
      description: "Callback triggered on a click event",
    },
    disabled: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Prevents onClick call",
    },
    onSelect: {
      type: { name: "function", required: true },
      description: "Callback triggered on a menu option select, takes option key",
    },
    options: {
      description: "Array of key-value pairs displayed in menu dropdown",
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      {
        key: "1",
        value: "Option 1",
      },
      {
        key: "2",
        value: "Option 2",
      },
      {
        key: "3",
        value: "Option 3",
      },
    ],
  },
};
