import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BarGraph } from "ui/components";
import { Color } from "ui/styles";

const meta = {
  title: "BarGraph",
  component: BarGraph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BarGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const assets = [
  {
    value: 1000000,
    stroke: Color.BRAND_400,
    fill: Color.BRAND_400,
  },
  {
    value: 2500500,
    stroke: Color.BRAND_400,
    fill: Color.BRAND_300,
  },
  {
    value: 9000300,
    stroke: Color.BRAND_400,
    fill: Color.BRAND_100,
  },
];

const liabilities = [
  {
    value: 9200000,
    stroke: Color.BROWN_300,
    fill: Color.BROWN_300,
  },
  {
    value: 2405000,
    stroke: Color.BROWN_300,
    fill: Color.BROWN_200,
  },
  {
    value: 9500300,
    stroke: Color.BROWN_300,
    fill: Color.BROWN_100,
  },
];

export const Default: Story = {
  args: {
    data: [
      {
        name: "Assets",
        sections: assets,
      },
      {
        name: "Liabilities",
        sections: liabilities,
      },
    ],
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <BarGraph {...props} />
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    data: [
      {
        name: "Assets",
        sections: assets,
      },
      {
        name: "Liabilities",
        sections: liabilities,
      },
    ],
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <BarGraph {...props} />
    </div>
  ),
};

export const Bidirectional: Story = {
  args: {
    direction: "horizontal",
    data: [
      {
        name: "COP",
        sections: [
          {
            value: 13.6,
            fill: Color.BRAND_300,
            stroke: Color.BRAND_400,
          },
        ],
      },
      {
        name: "ZAR",
        sections: [
          {
            value: 5.7,
            fill: Color.BRAND_300,
            stroke: Color.BRAND_400,
          },
        ],
      },
      {
        name: "CHF",
        sections: [
          {
            value: 3.2,
            fill: Color.BRAND_300,
            stroke: Color.BRAND_400,
          },
        ],
      },
      {
        name: "PEN",
        sections: [
          {
            value: -0.9,
            fill: Color.BROWN_200,
            stroke: Color.BROWN_300,
          },
        ],
      },
      {
        name: "JPY",
        sections: [
          {
            value: -4.2,
            fill: Color.BROWN_200,
            stroke: Color.BROWN_300,
          },
        ],
      },
      {
        name: "CLP",
        sections: [
          {
            value: -8.2,
            fill: Color.BROWN_200,
            stroke: Color.BROWN_300,
          },
        ],
      },
    ],
  },
  render: (props) => (
    <div style={{ width: "500px", height: "300px" }}>
      <BarGraph {...props} />
    </div>
  ),
};

export const CustomOptions: Story = {
  args: {
    data: [
      {
        name: "Assets",
        threshold: 0.6,
        sections: [{ value: 0.5, stroke: Color.BRAND_300, fill: Color.BRAND_300 }],
      },
      {
        name: "Liabilities",
        threshold: 0.7,
        sections: [{ value: 0.8, stroke: Color.BRAND_300, fill: Color.BRAND_300 }],
      },
    ],
    options: {
      label: "Value",
      legend: true,
      min: 0,
      max: 1,
      yFormatter: (y: number) => new Intl.NumberFormat("en-US", { style: "percent" }).format(y),
    },
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <BarGraph {...props} />
    </div>
  ),
};
