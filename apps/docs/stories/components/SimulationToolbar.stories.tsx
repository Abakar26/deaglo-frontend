import { SimulationToolbar, type IconName } from "ui/components";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "SimulationToolbar ",
  component: SimulationToolbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    simulations: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Arrray of { key: string; label: string; icon: IconName }",
    },
    onSelect: {
      type: { name: "function", required: true },
      description: "Callback triggered on toolbar item click, takes simulation key",
    },
    onClick: {
      type: { name: "function", required: true },
      description: "Callback triggered on InsertArea click",
    },
    onDelete: {
      type: { name: "function", required: true },
      description: "Callback triggered for every deleted item, takes simulation key",
    },
  },
} satisfies Meta<typeof SimulationToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    simulations: [],
  },
  render: () => <SimulationToolbarWrapper />,
};

const SimulationToolbarWrapper: React.FunctionComponent = () => {
  const simulations: Array<{
    key: string;
    label: string;
    icon: IconName;
  }> = [
    {
      key: "1",
      label: "Strategy Simulation",
      icon: "strategy",
    },
    {
      key: "2",
      label: "Margin Simulation",
      icon: "margin",
    },
    {
      key: "3",
      label: "Hedge IRR",
      icon: "hedge",
    },
  ];

  const [selected, setSelected] = useState<
    Array<{
      key: string;
      label: string;
      icon: IconName;
    }>
  >([]);

  const addSimulation = () => {
    const next = simulations[selected.length];
    if (next) {
      setSelected([...selected, next]);
    }
  };

  const removeSimulation = (key: string) => {
    setSelected((selected) => selected.filter((sim) => sim.key !== key));
  };

  return (
    <SimulationToolbar
      simulations={selected}
      onSelect={() => null}
      onClick={addSimulation}
      onDelete={removeSimulation}
    />
  );
};
