import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "ui/components";

const meta = {
  title: "DatePicker",
  component: DatePicker,
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
    date: {
      description: "The selected Date object",
    },
    onSelect: {
      type: { name: "function", required: true },
      description: "Callback triggered on 'Apply' button click, takes Date",
    },
    onCancel: {
      type: "function",
      description: "Callback triggered on 'Cancel' button click",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <DatePickerWrapper />,
};

const DatePickerWrapper: React.FunctionComponent = () => {
  const [value, setValue] = useState<Date>();

  return (
    <div style={{ width: "360px", height: "500px" }}>
      <DatePicker date={value} onSelect={setValue} onCancel={() => setValue(undefined)} />
    </div>
  );
};
