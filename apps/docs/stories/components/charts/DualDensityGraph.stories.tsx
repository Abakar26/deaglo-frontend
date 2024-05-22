import type { Meta, StoryObj } from "@storybook/react";
import { exposure } from "../../../data/violin_data_to_plot";
import { DualDensityGraph } from "ui/components";
const meta = {
  title: "DualDensityGraph",
  component: DualDensityGraph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DualDensityGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        name: "Unhedged",
        data: exposure.Exposure,
      },
      {
        name: "Hedged",
        data: exposure.Capped_2pct,
      },
    ],
  },
  render: (props) => (
    <div style={{ width: "800px", height: "500px" }}>
      <DualDensityGraph {...props} />
    </div>
  ),
};
