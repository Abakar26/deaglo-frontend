import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { WorkspaceCard } from "ui/components";

const meta = {
  title: "WorkspaceCard",
  component: WorkspaceCard,
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
    analyses: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Array of analyses in the workspace",
    },
    onAdd: {
      type: { name: "function", required: true },
      description: "Callback triggered on 'Add Analysis' button click",
    },
    onRemove: {
      type: { name: "function", required: true },
      description: "Callback triggered on remove button click, takes analysis key",
    },
    onView: {
      type: { name: "function", required: true },
      description: "Callback triggered on 'View analyses' button click",
    },
    currency: {
      description: "Currency symbol and flag image for workspace base currency",
    },
  },
} satisfies Meta<typeof WorkspaceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Hedging fund 2",
    analyses: [],
    menu: {
      onSelect: () => null,
      options: [
        {
          key: "1",
          value: "Pin",
        },
        {
          key: "2",
          value: "Remove",
        },
      ],
    },
  },
  // @ts-ignore
  render: (props) => <WorkspaceCardWrapper {...props} />,
};

export const TwoAnalyses: Story = {
  args: {
    title: "Hedging fund 2",
    currency: {
      symbol: "USD",
      flag: "USA",
    },
    analyses: [
      {
        key: "1",
        title: "IG4 Analysis 2",
        baseCurrency: "USD",
        quoteCurrency: "BRL",
      },
      {
        key: "2",
        title: "IG4 Analysis 1",
        baseCurrency: "USD",
        quoteCurrency: "BRL",
      },
    ],
    menu: {
      onSelect: () => null,
      options: [
        {
          key: "1",
          value: "Pin",
        },
        {
          key: "2",
          value: "Remove",
        },
      ],
    },
  },
  // @ts-ignore
  render: (props) => <WorkspaceCardWrapper {...props} />,
};

export const FiveAnalysesWithLimitThree: Story = {
  args: {
    title: "Hedging fund 2",
    currency: {
      symbol: "USD",
      flag: "USA",
    },
    analyses: [
      {
        key: "1",
        title: "IG4 Analysis 2",
        baseCurrency: "USD",
        quoteCurrency: "BRL",
      },
      {
        key: "2",
        title: "IG4 Analysis 1",
        baseCurrency: "USD",
        quoteCurrency: "BRL",
      },
      {
        key: "3",
        title: "IG4 Analysis 0",
        baseCurrency: "USD",
        quoteCurrency: "BRL",
      },
      {
        key: "4",
        title: "IG4 Analysis 6",
        baseCurrency: "USD",
        quoteCurrency: "BRL",
      },
      {
        key: "5",
        title: "IG4 Analysis 5",
        baseCurrency: "USD",
        quoteCurrency: "BRL",
      },
    ],
    menu: {
      onSelect: () => null,
      options: [
        {
          key: "1",
          value: "Pin",
        },
        {
          key: "2",
          value: "Remove",
        },
      ],
    },
  },
  // @ts-ignore
  render: (props) => <WorkspaceCardWrapper {...props} />,
};

type Analyses = Array<{
  key: string;
  title: string;
  baseCurrency: string;
  quoteCurrency: string;
}>;

const WorkspaceCardWrapper: React.FunctionComponent<{ analyses: Analyses }> = (props) => {
  const [analyses, setAnalysis] = useState<Analyses>(props.analyses);

  const removeAnalysis = (key: string) => {
    setAnalysis((analyses) => analyses.filter((a) => a.key !== key));
  };

  return (
    <div style={{ width: "550px" }}>
      <WorkspaceCard
        title=""
        onView={() => null}
        onAdd={() => null}
        onRemove={removeAnalysis}
        {...props}
        analyses={analyses}
      />
    </div>
  );
};
