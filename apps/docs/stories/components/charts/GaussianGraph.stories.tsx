import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GaussianGraph } from "ui/components";

const meta = {
  title: "GaussianGraph",
  component: GaussianGraph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GaussianGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mean: 11.35,
    stdDev: 1.5,
    target: 12.8,
  },
  render: (props) => (
    <div style={{ width: "600px", height: "300px" }}>
      <GaussianGraph {...props} />
    </div>
  ),
};
