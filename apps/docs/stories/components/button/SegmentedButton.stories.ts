import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedButton } from "ui/components";

const meta = {
  title: "SegmentedButton",
  component: SegmentedButton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    actions: {
      // @ts-ignore
      type: { name: "object", required: true },
      description:
        "An array of button sections Array<{ label: string; onClick: () => void; disabled?: boolean; loading?: boolean; }>",
    },
  },
} satisfies Meta<typeof SegmentedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneSegment: Story = {
  args: {
    actions: [
      {
        label: "More",
        onClick: () => null,
      },
    ],
  },
};

export const TwoSegments: Story = {
  args: {
    actions: [
      {
        label: "More",
        onClick: () => null,
      },
      {
        label: "Download",
        onClick: () => null,
      },
    ],
  },
  parameters: {
    parent,
  },
};

export const ThreeSegments: Story = {
  args: {
    actions: [
      {
        label: "More",
        onClick: () => null,
      },
      {
        label: "Download",
        onClick: () => null,
      },
      {
        label: "Edit",
        onClick: () => null,
      },
    ],
  },
};

export const FourSegments: Story = {
  args: {
    actions: [
      {
        label: "More",
        onClick: () => null,
      },
      {
        label: "Download",
        onClick: () => null,
      },
      {
        label: "Edit",
        onClick: () => null,
      },
      {
        label: "Export",
        onClick: () => null,
      },
    ],
  },
};

export const FourSegmentsLoadingDisabled: Story = {
  args: {
    actions: [
      {
        label: "More",
        onClick: () => null,
        loading: true,
      },
      {
        label: "Download",
        onClick: () => null,
      },
      {
        label: "Edit",
        onClick: () => null,
        disabled: true,
      },
      {
        label: "Export",
        onClick: () => null,
      },
    ],
  },
};
