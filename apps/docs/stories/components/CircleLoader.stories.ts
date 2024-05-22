import type { Meta, StoryObj } from "@storybook/react";
import { CircleLoader } from "ui/components";
import { Color } from "ui/styles";
import { createEnumOptions } from "../utilities";

const meta = {
  title: "CircleLoader",
  component: CircleLoader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      type: "number",
      description: "diameter of the loader (px)",
      defaultValue: 24,
    },
    color: {
      type: "string",
      description: "Loader accent color",
      options: createEnumOptions(Color, true),
      control: { type: "select" },
      defaultValue: Color.BRAND_800,
    },
  },
} satisfies Meta<typeof CircleLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
