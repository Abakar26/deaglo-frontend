import type { Meta, StoryObj } from "@storybook/react";
import { UploadItem } from "ui/components";

const meta = {
  title: "UploadItem",
  component: UploadItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fileName: {
      type: { name: "string", required: true },
      description: "Name of uploaded file",
    },
    progress: {
      type: "number",
      description: "Upload progress on the range [0, 1]",
    },
    onDelete: {
      type: { name: "function", required: true },
      description: "Callback triggered on x button click",
    },
    error: {
      type: "string",
    },
    errorDescription: {
      type: "string",
    },
  },
} satisfies Meta<typeof UploadItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileName: "xirr_sample.csv",
    onDelete: () => null,
  },
};
