import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangeInput, type DateInterval } from "ui/components";

const meta = {
  title: "DateRangeInput",
  component: DateRangeInput,
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
    interval: {
      description: "A DateInterval : { start?: Date, end?: Date }",
    },
    onChange: {
      type: { name: "function", required: true },
      description: "Callback triggered on interval change, takes DateInterval",
    },
    onError: {
      type: "function",
      description: "Callback triggered on invalid input",
    },
    tooltip: {
      description: "Tooltip label and body to display above input box",
    },
    error: {
      type: { name: "string", required: false },
      description: "Error text to display below input box",
    },
    disabled: {
      type: { name: "boolean", required: false },
      control: { type: "boolean" },
      description: "True if the input is disabled",
    },
  },
} satisfies Meta<typeof DateRangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: () => null,
  },
  render: (props) => <DateRangeInputWrapper {...props} />,
};

export const Tooltip: Story = {
  args: {
    onChange: () => null,
    tooltip: {
      label: "Click me",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  },
  // @ts-ignore
  render: (props) => <DateRangeInputWrapper {...props} />,
};

const DateRangeInputWrapper: React.FunctionComponent<{ error?: string }> = (props) => {
  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();
  const [error, setError] = useState<string>();

  return (
    <div style={{ width: "400px", height: "500px", paddingTop: "50px" }}>
      <DateRangeInput
        {...props}
        interval={{ start, end }}
        onChange={(date?: DateInterval) => {
          date?.start && setStart(date.start);
          date?.end && setEnd(date.end);
        }}
        error={props.error ?? error}
        onError={setError}
      />
    </div>
  );
};
