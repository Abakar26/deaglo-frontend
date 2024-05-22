import type { Meta, StoryObj } from "@storybook/react";
import { HelperAction } from "ui/components";

const meta = {
  title: "HelperAction",
  component: HelperAction,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: { name: "string", required: false },
    },
    action: {
      type: { name: "function", required: true },
      description: "onClick and label for button",
    },
    highlight: {
      type: { name: "boolean", required: false },
    },
  },
} satisfies Meta<typeof HelperAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Don't have a CSV file?",
    action: {
      label: "Download Template",
      onClick: () => null,
    },
  },
  render: ({ title, action, highlight }) => (
    <div style={{ width: "282px" }}>
      <HelperAction title={title} action={action} highlight={highlight} />
    </div>
  ),
};

export const NoTitle: Story = {
  args: {
    action: {
      label: "Download Template",
      onClick: () => null,
    },
  },
  render: ({ title, action }) => (
    <div style={{ width: "282px" }}>
      <HelperAction title={title} action={action} />
    </div>
  ),
};
