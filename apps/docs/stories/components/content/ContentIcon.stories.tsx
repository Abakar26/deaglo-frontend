import type { Meta, StoryObj } from "@storybook/react";
import { ContentIcon, ContentIconColor, iconRegistry } from "ui/components";
import { createEnumOptions } from "../../utilities";

const meta = {
  title: "ContentIcon",
  component: ContentIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: createEnumOptions(ContentIconColor, true),
      control: { type: "select" },
      description: "Icon color",
    },
    icon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon Name",
      type: { name: "string", required: false },
    },
  },
} satisfies Meta<typeof ContentIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "pencil",
  },
};
