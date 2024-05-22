import type { Meta, StoryObj } from "@storybook/react";
import { ButtonSize, SmallButton, iconRegistry } from "ui/components";
import { createEnumOptions } from "../../../stories/utilities";

const meta = {
  title: "SmallButton",
  component: SmallButton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      type: "string",
      description: "Text displayed in button",
    },
    size: {
      options: createEnumOptions(ButtonSize),
      control: { type: "select" },
      description: "Button height option",
    },
    onClick: {
      type: "function",
      description: "Callback triggered on a click event",
    },
    disabled: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Prevents onClick call",
    },
    loading: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Displays button loading state",
    },
    leadingIcon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon to preceed label",
      defaultValue: "info",
      type: { name: "string", required: false },
    },
    trailingIcon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon to follow label",
      defaultValue: "info",
      type: { name: "string", required: false },
    },
  },
} satisfies Meta<typeof SmallButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
  },
};
