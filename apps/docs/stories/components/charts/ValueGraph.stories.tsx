import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ValueGraph } from "ui/components";
import { Color } from "ui/styles";
import { addDays } from "date-fns";

const meta = {
  title: "ValueGraph",
  component: ValueGraph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ValueGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lines: [
      {
        name: "Total Liabilities",
        color: { stroke: Color.BRAND_800 },
        data: [
          {
            date: addDays(new Date(), -6),
            value: 123000,
          },
          {
            date: addDays(new Date(), -5),
            value: 130000,
          },
          {
            date: addDays(new Date(), -4),
            value: 140000,
          },
          {
            date: addDays(new Date(), -3),
            value: 145000,
          },
          {
            date: addDays(new Date(), -2),
            value: 130000,
          },
          {
            date: addDays(new Date(), -1),
            value: 125000,
          },
          {
            date: new Date(),
            value: 120000,
          },
        ],
      },
    ],
    areas: [
      {
        name: "Asset 1",
        color: { stroke: Color.TEAL_300, fill: Color.TEAL_100 },
        data: [
          {
            date: addDays(new Date(), -6),
            value: 130000,
          },
          {
            date: addDays(new Date(), -5),
            value: 125000,
          },
          {
            date: addDays(new Date(), -4),
            value: 139000,
          },
          {
            date: addDays(new Date(), -3),
            value: 129000,
          },
          {
            date: addDays(new Date(), -2),
            value: 125000,
          },
          {
            date: addDays(new Date(), -1),
            value: 132000,
          },
          {
            date: new Date(),
            value: 129500,
          },
        ],
      },
      {
        name: "Asset 2",
        color: { stroke: Color.BRAND_400, fill: Color.BRAND_300 },
        data: [
          {
            date: addDays(new Date(), -6),
            value: 133000,
          },
          {
            date: addDays(new Date(), -5),
            value: 130000,
          },
          {
            date: addDays(new Date(), -4),
            value: 132000,
          },
          {
            date: addDays(new Date(), -3),
            value: 141000,
          },
          {
            date: addDays(new Date(), -2),
            value: 139000,
          },
          {
            date: addDays(new Date(), -1),
            value: 138000,
          },
          {
            date: new Date(),
            value: 139500,
          },
        ],
      },
      {
        name: "Asset 3",
        color: { stroke: Color.BROWN_300, fill: Color.BROWN_200 },
        data: [
          {
            date: addDays(new Date(), -6),
            value: 123000,
          },
          {
            date: addDays(new Date(), -5),
            value: 120000,
          },
          {
            date: addDays(new Date(), -4),
            value: 122000,
          },
          {
            date: addDays(new Date(), -3),
            value: 121000,
          },
          {
            date: addDays(new Date(), -2),
            value: 129000,
          },
          {
            date: addDays(new Date(), -1),
            value: 118000,
          },
          {
            date: new Date(),
            value: 109500,
          },
        ],
      },
    ],
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <ValueGraph {...props} />
    </div>
  ),
};

export const DashedLines: Story = {
  args: {
    lines: [
      {
        name: "Hedged",
        color: { stroke: Color.BRAND_800 },
        data: [
          {
            date: addDays(new Date(), -2),
            value: 130000,
          },
          {
            date: addDays(new Date(), -1),
            value: 125000,
          },
          {
            date: new Date(),
            value: 120000,
          },
        ],
      },
      {
        name: "Unhedged",
        color: { stroke: Color.NEUTRAL_900, dashed: true },
        data: [
          {
            date: addDays(new Date(), -2),
            value: 120000,
          },
          {
            date: addDays(new Date(), -1),
            value: 125000,
          },
          {
            date: new Date(),
            value: 130000,
          },
        ],
      },
    ],
    areas: [],
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <ValueGraph {...props} />
    </div>
  ),
};

export const CustomOptions: Story = {
  args: {
    lines: [
      {
        name: "Hedged",
        color: { stroke: Color.BRAND_800 },
        data: [
          {
            date: addDays(new Date(), -2),
            value: 0.25,
          },
          {
            date: addDays(new Date(), -1),
            value: 0.5,
          },
          {
            date: new Date(),
            value: 0.75,
          },
        ],
      },
    ],
    areas: [],
    options: {
      valueMin: 0,
      valueMax: 1,
      yFormatter: (y: number) => new Intl.NumberFormat("en-US", { style: "percent" }).format(y),
    },
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <ValueGraph {...props} />
    </div>
  ),
};
