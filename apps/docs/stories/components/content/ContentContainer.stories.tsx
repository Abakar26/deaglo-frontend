import type { Meta, StoryObj } from "@storybook/react";
import { ContentColor, ContentContainer, ContentIconColor } from "ui/components";
import { createEnumOptions } from "../../utilities";

const meta = {
  title: "ContentContainer",
  component: ContentContainer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: createEnumOptions(ContentColor),
      control: { type: "select" },
      description: "background color",
    },
    onDismiss: {
      type: { name: "function", required: false },
      description: "Callback triggered on x button click",
    },
    icon: {
      description: "ContentIcon color and icon name to display left of title and description",
    },
  },
} satisfies Meta<typeof ContentContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onDismiss: () => null,
    icon: {
      icon: "info",
      color: ContentIconColor.NEUTRAL_00,
    },
  },
};

export const White: Story = {
  args: {
    color: ContentColor.NEUTRAL_00,
    onDismiss: () => null,
    icon: {
      icon: "doc",
      color: ContentIconColor.DANGER_100,
    },
  },
};
