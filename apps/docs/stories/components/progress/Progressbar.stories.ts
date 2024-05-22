import type { Meta, StoryObj } from "@storybook/react";
import { Progressbar } from "ui/components";

const meta = {
  title: "Progressbar",
  component: Progressbar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    progress: {
      type: { name: "number", required: true },
      description: "Progress completion amount on the interval [0, 1]",
    },
    label: {
      type: "string",
      description: "Progress bar label",
    },
  },
} satisfies Meta<typeof Progressbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ZeroPercent: Story = {
  args: {
    label: "45 Paths Calculated",
    progress: 0,
  },
};

export const FiftyPercent: Story = {
  args: {
    label: "45 Paths Calculated",
    progress: 0.5,
  },
};

export const TwoThirds: Story = {
  args: {
    label: "45 Paths Calculated",
    progress: 2 / 3,
  },
};

export const Complete: Story = {
  args: {
    label: "45 Paths Calculated",
    progress: 1,
  },
};
