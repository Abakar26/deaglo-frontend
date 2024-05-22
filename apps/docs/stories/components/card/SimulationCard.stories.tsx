import type { Meta, StoryObj } from "@storybook/react";
import { exposure } from "../../../data/violin_data_to_plot";
import React from "react";
import {
  DualDensityGraph,
  SimulationCard,
  SimulationMode,
  SimulationStatus,
  SimulationType,
  type MenuProps,
  type Selectable,
} from "ui/components";
import { Color } from "ui/styles";
import { createEnumOptions } from "../../../stories/utilities";

const meta = {
  title: "SimulationCard",
  component: SimulationCard,
  parameters: {
    layout: "centered",
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: { name: "string", required: true },
      description: "Card title",
    },
    description: {
      type: { name: "string", required: true },
      description: "Card Description",
    },
    status: {
      options: createEnumOptions(SimulationStatus),
      control: { type: "select" },
      type: { name: "string", required: true },
    },
    type: {
      options: createEnumOptions(SimulationType),
      control: { type: "select" },
      type: { name: "string", required: true },
    },
    lastRun: {
      description: "Date object when this simulation was last run",
    },
    selected: {
      type: { name: "boolean", required: false },
      description: "True iff the simulation is selected",
    },
    onSelect: {
      type: { name: "function", required: false },
      description: "Callback triggered when selected",
    },
    mode: {
      options: createEnumOptions(SimulationMode),
      control: { type: "select" },
    },
    progress: {
      description: "Progress and label to display completion",
    },
    unpin: {
      type: { name: "function", required: false },
      description: "Callback triggered on pin click",
    },
  },
} satisfies Meta<typeof SimulationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const menu: MenuProps<Selectable> = {
  onSelect: () => null,
  options: [
    {
      key: "1",
      value: "Execute",
      icon: "doc",
    },
    {
      key: "2",
      value: "Rename",
      icon: "pencil",
    },
    {
      key: "3",
      value: "Pin simulation",
      icon: "pin",
    },
    {
      key: "4",
      value: "Delete",
      icon: "trash",
      color: Color.DANGER_700,
    },
  ],
};

export const Default: Story = {
  args: {
    title: "Strategy Simulation-1",
    description: "Strategy Simulation",
    status: SimulationStatus.READY,
    type: SimulationType.STRATEGY,
    lastRun: new Date(),
    menu,
  },
  render: (props) => <SimulationCardWrapper {...props} />,
};

export const Selected: Story = {
  args: {
    title: "Strategy Simulation-1",
    description: "Strategy Simulation",
    status: SimulationStatus.READY,
    type: SimulationType.STRATEGY,
    lastRun: new Date(),
    mode: SimulationMode.STRATEGY,
    selected: true,
    menu,
  },
  render: (props) => <SimulationCardWrapper {...props} />,
};

export const Pinned: Story = {
  args: {
    title: "Strategy Simulation-1",
    description: "Strategy Simulation",
    status: SimulationStatus.READY,
    type: SimulationType.STRATEGY,
    lastRun: new Date(),
    pinned: true,
    menu,
  },
  render: (props) => <SimulationCardWrapper {...props} />,
};

export const SimulationComplete: Story = {
  args: {
    title: "Strategy Simulation-1",
    description: "Strategy Simulation",
    status: SimulationStatus.COMPLETE,
    type: SimulationType.STRATEGY,
    lastRun: new Date(),
    pinned: true,
    menu,
  },
  render: (props) => <SimulationCardWrapper {...props} />,
};

export const SimulationInProgress: Story = {
  args: {
    title: "Strategy Simulation-1",
    description: "Strategy Simulation",
    status: SimulationStatus.IN_PROGRESS,
    type: SimulationType.STRATEGY,
    lastRun: new Date(),
    pinned: true,
    progress: {
      label: "45 paths calculated",
      progress: 0.5,
    },
    onCancel: () => null,
    menu,
  },
  render: (props) => <SimulationCardWrapper {...props} />,
};

const SimulationCardWrapper: React.FunctionComponent<{
  title: string;
  description: string;
  type: SimulationType;
  status: SimulationStatus;
}> = (props) => {
  const [name1, data1] = Object.entries(exposure)[0] ?? ["", []];
  const [name2, data2] = Object.entries(exposure)[1] ?? ["", []];

  return (
    <div style={{ width: "470px" }}>
      <SimulationCard {...props}>
        <div style={{ height: "200px" }}>
          {/* <InsertArea label="Card Content" /> */}
          {/* <ViolinGraph data={exposure}/> */}
          <DualDensityGraph
            data={[
              { name: name1, data: data1 },
              { name: name2, data: data2 },
            ]}
          />
        </div>
      </SimulationCard>
    </div>
  );
};
