import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AnalysisCard, SimulationType } from "ui/components";

const meta = {
  title: "AnalysisCard",
  component: AnalysisCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: { name: "string", required: true },
      description: "Card title",
    },
    baseCurrency: {
      type: { name: "string", required: true },
      description: "Currency symbol for base currency",
    },
    quoteCurrency: {
      type: { name: "string", required: true },
      description: "Currency symbol for quote currency",
    },
    simulations: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Array of simulations in this analysis",
    },
    onCreate: {
      type: { name: "function", required: true },
      defaultValue: undefined,
      description: "Callback triggered on 'Create Simulation' click",
    },
    onView: {
      type: { name: "function", required: true },
      defaultValue: undefined,
      description: "Callback triggered on 'View Analysis' click",
    },
    onRemove: {
      type: "function",
      defaultValue: undefined,
      description: "Callback triggered on remove button click",
    },
    onSelect: {
      type: "function",
      defaultValue: undefined,
      description: "Callback triggered on select analyis click",
    },
    selected: {
      type: "boolean",
      defaultValue: false,
      description: "True iff this analysis is selected",
    },
    limit: {
      type: "number",
      description: "Maximum number of simulations to display in card",
    },
    lastRun: {
      description: "Date object when the analysis was last run",
    },
  },
} satisfies Meta<typeof AnalysisCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Hedging fund 2",
    baseCurrency: "USD",
    quoteCurrency: "BRL",
    simulations: [],
    onRemove: undefined,
    onSelect: undefined,
  },
  // @ts-ignore
  render: (props) => <AnalysisCardWrapper {...props} />,
};

export const TwoSimulations: Story = {
  args: {
    title: "Hedging fund 2",
    baseCurrency: "USD",
    quoteCurrency: "BRL",
    onRemove: undefined,
    onSelect: undefined,
    simulations: [
      {
        title: "Strategy Simulation-4",
        description: "Strategy Simulation",
        type: SimulationType.STRATEGY,
        date: new Date(),
      },
      {
        title: "Margin Simulation-2",
        description: "Margin Simulation",
        type: SimulationType.MARGIN,
        date: new Date(),
      },
    ],
    lastRun: new Date(),
  },
  // @ts-ignore
  render: (props) => <AnalysisCardWrapper {...props} />,
};

export const ThreeSimulations: Story = {
  args: {
    title: "Hedging fund 2",
    baseCurrency: "USD",
    quoteCurrency: "BRL",
    onRemove: undefined,
    onSelect: undefined,
    simulations: [
      {
        title: "Strategy Simulation-4",
        description: "Strategy Simulation",
        type: SimulationType.STRATEGY,
        date: new Date(),
      },
      {
        title: "Margin Simulation-2",
        description: "Margin Simulation",
        type: SimulationType.MARGIN,
        date: new Date(),
      },
      {
        title: "Hedge Simulation-3",
        description: "Hedge Simulation",
        type: SimulationType.HEDGE,
        date: new Date(),
      },
    ],
    lastRun: new Date(),
    limit: 3,
  },
  // @ts-ignore
  render: (props) => <AnalysisCardWrapper {...props} />,
};

export const FourSimulationsWithLimitTwo: Story = {
  args: {
    title: "Hedging fund 2",
    baseCurrency: "USD",
    quoteCurrency: "BRL",
    onRemove: undefined,
    onSelect: undefined,
    simulations: [
      {
        title: "Strategy Simulation-4",
        description: "Strategy Simulation",
        type: SimulationType.STRATEGY,
        date: new Date(),
      },
      {
        title: "Margin Simulation-2",
        description: "Margin Simulation",
        type: SimulationType.MARGIN,
        date: new Date(),
      },
      {
        title: "Hedge Simulation-3",
        description: "Hedge Simulation",
        type: SimulationType.HEDGE,
        date: new Date(),
      },
      {
        title: "Margin Simulation-5",
        description: "Margin Simulation",
        type: SimulationType.MARGIN,
        date: new Date(),
      },
    ],
    lastRun: new Date(),
  },
  // @ts-ignore
  render: (props) => <AnalysisCardWrapper {...props} />,
};

export const Selected: Story = {
  args: {
    title: "Hedging fund 2",
    baseCurrency: "USD",
    quoteCurrency: "BRL",
    onSelect: () => null,
    onRemove: undefined,
    selected: true,
    simulations: [
      {
        title: "Strategy Simulation-4",
        description: "Strategy Simulation",
        type: SimulationType.STRATEGY,
        date: new Date(),
      },
      {
        title: "Margin Simulation-2",
        description: "Margin Simulation",
        type: SimulationType.MARGIN,
        date: new Date(),
      },
      {
        title: "Hedge Simulation-3",
        description: "Hedge Simulation",
        type: SimulationType.HEDGE,
        date: new Date(),
      },
    ],
    lastRun: new Date(),
    limit: 3,
  },
  // @ts-ignore
  render: (props) => <AnalysisCardWrapper {...props} />,
};

export const Unselected: Story = {
  args: {
    title: "Hedging fund 2",
    baseCurrency: "USD",
    quoteCurrency: "BRL",
    onSelect: () => null,
    onRemove: undefined,
    selected: false,
    simulations: [
      {
        title: "Strategy Simulation-4",
        description: "Strategy Simulation",
        type: SimulationType.STRATEGY,
        date: new Date(),
      },
      {
        title: "Margin Simulation-2",
        description: "Margin Simulation",
        type: SimulationType.MARGIN,
        date: new Date(),
      },
      {
        title: "Hedge Simulation-3",
        description: "Hedge Simulation",
        type: SimulationType.HEDGE,
        date: new Date(),
      },
    ],
    lastRun: new Date(),
    limit: 3,
  },
  // @ts-ignore
  render: (props) => <AnalysisCardWrapper {...props} />,
};

export const Removable: Story = {
  args: {
    title: "Hedging fund 2",
    baseCurrency: "USD",
    quoteCurrency: "BRL",
    onRemove: () => null,
    simulations: [
      {
        title: "Strategy Simulation-4",
        description: "Strategy Simulation",
        type: SimulationType.STRATEGY,
        date: new Date(),
      },
      {
        title: "Margin Simulation-2",
        description: "Margin Simulation",
        type: SimulationType.MARGIN,
        date: new Date(),
      },
      {
        title: "Hedge Simulation-3",
        description: "Hedge Simulation",
        type: SimulationType.HEDGE,
        date: new Date(),
      },
    ],
    lastRun: new Date(),
    limit: 3,
  },
  // @ts-ignore
  render: (props) => <AnalysisCardWrapper {...props} />,
};

const AnalysisCardWrapper: React.FunctionComponent = (props) => {
  return (
    <div style={{ width: "470px" }}>
      <AnalysisCard
        title=""
        baseCurrency=""
        quoteCurrency=""
        onView={() => null}
        onCreate={() => null}
        simulations={[]}
        {...props}
      />
    </div>
  );
};
