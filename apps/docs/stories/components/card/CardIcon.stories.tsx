import type { Meta, StoryObj } from "@storybook/react";
import { CardIcon, CardIconColor, iconRegistry } from "ui/components";
import { createEnumOptions } from "../../../stories/utilities";

const meta = {
  title: "CardIcon",
  component: CardIcon,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: createEnumOptions(CardIconColor, true),
      control: { type: "select" },
    },
    icon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon Name",
      defaultValue: "info",
      type: { name: "string", required: false },
    },
  },
} satisfies Meta<typeof CardIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
