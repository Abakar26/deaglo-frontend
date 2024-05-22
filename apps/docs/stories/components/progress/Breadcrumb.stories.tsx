import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs, Icon } from "ui/components";
import { Color } from "ui/styles";

const meta = {
  title: "Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onSelect: {
      type: "function",
      description: "Callback triggered on breadcrumb click, takes key of clicked breadcrumb",
    },
    crumbs: {
      description: "Array of { key: string, value: ReactNode }",
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneLevel: Story = {
  args: {
    crumbs: [
      {
        key: "1",
        label: "Analyses",
      },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    crumbs: [
      {
        key: "1",
        label: "Analyses",
      },
      {
        key: "2",
        label: (
          <>
            IG4 Analysis 2 EUR <Icon name="arrow-right" color={Color.NEUTRAL_700} size={16} /> BRL
          </>
        ),
      },
    ],
  },
};

export const ThreeLevels: Story = {
  args: {
    crumbs: [
      {
        key: "1",
        label: "Analyses",
      },
      {
        key: "2",
        label: (
          <>
            IG4 Analysis 2 EUR <Icon name="arrow-right" color={Color.NEUTRAL_700} size={16} /> BRL
          </>
        ),
      },
      {
        key: "3",
        label: "Strategy Simulation",
      },
    ],
  },
};

export const FourLevels: Story = {
  args: {
    crumbs: [
      {
        key: "1",
        label: "Analyses",
      },
      {
        key: "2",
        label: (
          <>
            IG4 Analysis 2 EUR <Icon name="arrow-right" color={Color.NEUTRAL_700} size={16} /> BRL
          </>
        ),
      },
      {
        key: "3",
        label: "Strategy Simulation",
      },
      {
        key: "4",
        label: "Step 4",
      },
    ],
  },
};
