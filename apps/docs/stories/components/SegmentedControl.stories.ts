import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl, SegmentedControlSize } from "ui/components";
import { createEnumOptions } from "../../stories/utilities";

const meta = {
  title: "SegmentedControl",
  component: SegmentedControl,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    segments: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Array of { label: string; key: string; icon?: IconName; disabled: boolean; }",
    },
    initial: {
      type: "string",
      description: "Key of initially selected segment",
    },
    tooltip: {
      description: "Tooltip to display above input box",
    },
    onChange: {
      type: "function",
      description: "Callback triggered on change, takes segment key",
    },
    size: {
      options: createEnumOptions(SegmentedControlSize),
      control: { type: "select" },
      description: "Control size",
      type: { name: "string", required: false },
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneSegment: Story = {
  args: {
    segments: [
      {
        key: "1",
        label: "Default Environment",
      },
    ],
  },
};

export const TwoSegments: Story = {
  args: {
    segments: [
      {
        key: "1",
        label: "Default Environment",
      },
      {
        key: "2",
        label: "Environment 1",
      },
    ],
  },
};

export const ThreeSegments: Story = {
  args: {
    segments: [
      {
        key: "1",
        label: "Default Environment",
      },
      {
        key: "2",
        label: "Environment 1",
      },
      {
        key: "3",
        label: "Environment 3",
      },
    ],
  },
};

export const FourSegments: Story = {
  args: {
    tooltip: {
      label: "Default Environment?",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    segments: [
      {
        key: "1",
        label: "Default Environment",
      },
      {
        key: "2",
        label: "Environment 1",
        icon: "circle-check",
      },
      {
        key: "3",
        label: "Environment 3",
      },
      {
        key: "4",
        label: "Environment 4",
        icon: "analysis",
      },
    ],
  },
};

export const FourSegmentsOneDisabled: Story = {
  args: {
    tooltip: {
      label: "Default Environment?",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    segments: [
      {
        key: "1",
        label: "Default Environment",
      },
      {
        key: "2",
        label: "Environment 1",
        icon: "circle-check",
      },
      {
        key: "3",
        label: "Environment 3",
        disabled: true,
      },
      {
        key: "4",
        label: "Environment 4",
        icon: "analysis",
      },
    ],
  },
};
