import type { Meta, StoryObj } from "@storybook/react";
import { ProgressRing } from "ui/components";
import { Color } from "ui/styles";
import { createEnumOptions } from "../../../stories/utilities";

const meta = {
  title: "ProgressRing",
  component: ProgressRing,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    progress: {
      type: { name: "number", required: true },
      description: "Progress completion amount on the interval [0, 1]",
    },
    size: {
      type: "number",
      description: "Ring diameter",
    },
    color: {
      type: "string",
      options: createEnumOptions(Color),
      control: { type: "select" },
      description: "Color of progress",
    },
    accentColor: {
      type: "string",
      options: createEnumOptions(Color),
      control: { type: "select" },
      description: "Base color",
    },
    start: {
      type: "number",
      description: "Degrees by which to rotate the ring start position",
    },
  },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 0,
  },
};
