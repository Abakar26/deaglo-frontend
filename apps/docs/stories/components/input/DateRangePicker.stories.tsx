import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker, type DateInterval } from "ui/components";

const meta = {
  title: "DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "fullscreen",
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    interval: {
      description: "A DateInterval : { start?: Date, end?: Date }",
    },
    onSelect: {
      type: "function",
      description: "Callback triggered on 'Apply' button click, takes DateInterval",
    },
    onCancel: {
      type: "function",
      description: "Callback triggered on 'Cancel' button click",
    },
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  // @ts-ignore
  render: () => <DateRangePickerWrapper />,
};

const DateRangePickerWrapper: React.FunctionComponent = () => {
  const [value, setValue] = useState<DateInterval>();

  return (
    <div
      style={{
        width: "700px",
        height: "500px",
        padding: "100px",
      }}
    >
      <DateRangePicker interval={value} onSelect={setValue} onCancel={() => setValue(undefined)} />
    </div>
  );
};
