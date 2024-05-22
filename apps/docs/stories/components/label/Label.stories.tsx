import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Label, LabelColor, LabelType } from "ui/components";
import { createEnumOptions } from "../../utilities";

const meta = {
  title: "Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: createEnumOptions(LabelColor),
      control: { type: "select" },
      description: "Label color",
    },
    type: {
      options: createEnumOptions(LabelType),
      control: { type: "select" },
      description: "Label type",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
  },
};

export const Editable: Story = {
  args: {
    label: "Label",
  },
  render: () => <LabelWrapper />,
};

const LabelWrapper: React.FunctionComponent = () => {
  const [value, setValue] = useState<string>("value");
  return <Label label={value} onChange={setValue} />;
};
