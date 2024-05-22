import type { Meta, StoryObj } from "@storybook/react";
import { exposure } from "../../../data/violin_data_to_plot";
import { ViolinColor, ViolinGraph } from "ui/components";
const meta = {
  title: "ViolinGraph",
  component: ViolinGraph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ViolinGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        id: "1",
        name: "Exposure",
        data: exposure.Exposure,
        color: ViolinColor.NEUTRAL_400,
      },
      {
        id: "2",
        name: "Seagul 2%",
        data: exposure.Seagull_2pct,
        color: ViolinColor.BRAND_300,
      },
      {
        id: "3",
        name: "Seagul",
        data: exposure.Seagull,
        color: ViolinColor.BRAND_300,
      },
      {
        id: "4",
        name: "Capped",
        data: exposure.Capped,
        color: ViolinColor.BRAND_300,
      },
      {
        id: "5",
        name: "Capped 2%",
        data: exposure.Capped_2pct,
        color: ViolinColor.BRAND_300,
      },
    ],
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <ViolinGraph {...props} />
    </div>
  ),
};

export const Margin: Story = {
  args: {
    data: [
      {
        id: "6",
        name: "Exposure",
        data: exposure.Exposure,
        color: ViolinColor.BROWN_200,
      },
      {
        id: "7",
        name: "Seagul 2%",
        data: exposure.Seagull_2pct,
        color: ViolinColor.BROWN_200,
      },
      {
        id: "8",
        name: "Seagul",
        data: exposure.Seagull,
        color: ViolinColor.BROWN_200,
      },
      {
        id: "9",
        name: "Capped",
        data: exposure.Capped,
        color: ViolinColor.BROWN_200,
      },
      {
        id: "10",
        name: "Capped 2%",
        data: exposure.Capped_2pct,
        color: ViolinColor.BROWN_200,
      },
    ],
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <ViolinGraph {...props} />
    </div>
  ),
};
