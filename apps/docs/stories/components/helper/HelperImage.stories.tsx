import type { Meta, StoryObj } from "@storybook/react";
import { HelperImage } from "ui/components";
import image from "../../assets/excel.png";

const meta = {
  title: "HelperImage",
  component: HelperImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      type: { name: "string", required: true },
      description: "Image url",
    },
    highlight: {
      type: { name: "boolean", required: false },
    },
  },
} satisfies Meta<typeof HelperImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: image.src,
  },
  render: ({ src, highlight }) => (
    <div style={{ width: "282px" }}>
      <HelperImage src={src} highlight={highlight} />
    </div>
  ),
};
