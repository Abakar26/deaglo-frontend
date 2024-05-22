import type { Meta, StoryObj } from "@storybook/react";
import { addDays } from "date-fns";
import { PathSimulationGraph } from "ui/components";
import { Color } from "ui/styles";

const meta = {
  title: "PathSimulationGraph",
  component: PathSimulationGraph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof PathSimulationGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

const colors: Array<Color> = [
  Color.BROWN_800,
  Color.DANGER_700,
  Color.PURPLE_700,
  Color.TEAL_700,
  Color.BRAND_800,
  Color.NEUTRAL_400,
  Color.ROSE_700,
  Color.SUCCESS_700,
];

const noise = (start: number, iterations: number): Array<number> => {
  return Array(iterations)
    .fill(null)
    .reduce<Array<number>>(
      (prev, _) => {
        const prevValue = prev[prev.length - 1]!;
        return [...prev, prevValue + (Math.random() - 0.5) * 1000];
      },
      [start]
    );
};

const spot = noise(100000, 15).map((value, index) => ({
  value,
  date: addDays(new Date(), index - 30),
}));

const simulatate = () => {
  return noise(spot[spot.length - 1]?.value ?? 100000, 16).map((value, index) => ({
    value,
    date: addDays(new Date(), index - 15),
  }));
};

export const Default: Story = {
  args: {
    spot,
    simulations: Array(8)
      .fill(null)
      .map((_, index) => ({
        color: colors[index] ?? Color.BRAND_100,
        data: simulatate(),
      })),
  },
  render: (props) => (
    <div style={{ width: "600px", height: "400px" }}>
      <PathSimulationGraph {...props} />
    </div>
  ),
};
