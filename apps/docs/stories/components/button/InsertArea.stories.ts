import type { Meta, StoryObj } from "@storybook/react";
import { InsertArea, InsertAreaSize, iconRegistry } from "ui/components";
import { createEnumOptions } from "../../../stories/utilities";

const meta = {
  title: "InsertArea",
  component: InsertArea,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      type: "string",
      description: "Text displayed in button",
    },
    onClick: {
      type: "function",
      description: "Callback triggered on click event",
    },
    onFileDrop: {
      type: "function",
      description: "Callback triggered on drag & drop event, takes an array of file objects",
    },
    onDataDrop: {
      type: "function",
      description: "Callback triggered on drag & drop event, takes string",
    },
    size: {
      options: createEnumOptions(InsertAreaSize),
      control: { type: "select" },
      description: "InsertArea font size",
    },
    icon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon name",
      defaultValue: "info",
      type: { name: "string", required: false },
    },
  },
} satisfies Meta<typeof InsertArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
    icon: "analysis",
  },
};
