import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { LineGraph } from "ui/components";
import { Color } from "ui/styles";

const meta = {
  title: "LineGraph",
  component: LineGraph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LineGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lines: [
      {
        name: "Data",
        color: Color.BRAND_800,
        data: [
          { x: 0, y: 120000 },
          { x: 1, y: 125000 },
          { x: 2, y: 130000 },
          { x: 3, y: 145000 },
          { x: 4, y: 140000 },
          { x: 5, y: 130000 },
          { x: 6, y: 123000 },
        ],
      },
      {
        name: "Treshhold",
        color: Color.NEUTRAL_900,
        dashed: true,
        data: [
          { x: 0, y: 129500 },
          { x: 1, y: 132000 },
          { x: 2, y: 125000 },
          { x: 3, y: 129000 },
          { x: 4, y: 139000 },
          { x: 5, y: 125000 },
          { x: 6, y: 130000 },
        ],
      },
    ],
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <LineGraph {...props} />
    </div>
  ),
};

export const CustomOptions: Story = {
  args: {
    lines: [
      {
        name: "Data",
        color: Color.BRAND_800,
        data: [
          { x: 0, y: 0.2 },
          { x: 1, y: 0.25 },
          { x: 2, y: 0.3 },
          { x: 3, y: 0.45 },
          { x: 4, y: 0.4 },
          { x: 5, y: 0.3 },
          { x: 6, y: 0.23 },
        ],
      },
    ],
    options: {
      x: { label: "Label" },
      y: {
        label: "Label",
        min: 0,
        max: 1,
        formatter: (y: number) => new Intl.NumberFormat("en-US", { style: "percent" }).format(y),
      },
      legend: true,
    },
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <LineGraph {...props} />
    </div>
  ),
};
