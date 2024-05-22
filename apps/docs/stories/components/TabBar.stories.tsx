import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TabBar, TabBarSize, type TabItem } from "ui/components";
import { createEnumOptions } from "../utilities";

const meta = {
  title: "TabBar",
  component: TabBar,
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
    current: {
      type: "string",
      description: "Key of currently selected tab",
    },
    tabs: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Array of { key: string; label: string; amount: number: selected: number; }",
    },
    onChange: {
      type: "function",
      description: "Callback triggered on tab change",
    },
    size: {
      options: createEnumOptions(TabBarSize),
      control: { type: "select" },
      description: "Tab size",
    },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneTab: Story = {
  args: {
    current: "1",
    tabs: [
      {
        key: "1",
        label: "LIVE Analysis",
      },
    ],
  },
};

export const TwoTabs: Story = {
  args: {
    current: "1",
    tabs: [
      {
        key: "1",
        label: "LIVE Analysis",
      },
      {
        key: "2",
        label: "DRAFT Analysis",
        amount: 6,
      },
    ],
  },
  render: ({ current, tabs }) => <TabBarWrapper current={current} tabs={tabs} />,
};

export const ThreeTabs: Story = {
  args: {
    current: "2",
    tabs: [
      {
        key: "1",
        label: "LIVE Analysis",
      },
      {
        key: "2",
        label: "DRAFT Analysis",
        amount: 6,
      },
      {
        key: "3",
        label: "LIVE Analysis",
        amount: 3,
        selected: 2,
      },
    ],
  },
  render: ({ current, tabs }) => <TabBarWrapper current={current} tabs={tabs} />,
};

export const ThreeTabsSmall: Story = {
  args: {
    current: "2",
    size: TabBarSize.SMALL,
    tabs: [
      {
        key: "1",
        label: "LIVE Analysis",
      },
      {
        key: "2",
        label: "DRAFT Analysis",
        amount: 6,
      },
      {
        key: "3",
        label: "LIVE Analysis",
        amount: 3,
        selected: 2,
      },
    ],
  },
  render: ({ current, tabs, size }) => <TabBarWrapper current={current} tabs={tabs} size={size} />,
};

const TabBarWrapper: React.FunctionComponent<{
  current?: string;
  tabs: Array<TabItem>;
  size?: TabBarSize;
}> = ({ current, tabs, size }) => {
  const [selected, setSelected] = useState<string | undefined>(current);

  return <TabBar current={selected} tabs={tabs} onChange={setSelected} size={size} />;
};
