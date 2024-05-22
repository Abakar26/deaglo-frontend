import type { Meta, StoryObj } from "@storybook/react";
import { DotsLoader, LoaderColor } from "ui/components";
import { createEnumOptions } from "../utilities";

const meta = {
  title: "DotsLoader",
  component: DotsLoader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      type: "string",
      description: "Loader accent color",
      options: createEnumOptions(LoaderColor),
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof DotsLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
