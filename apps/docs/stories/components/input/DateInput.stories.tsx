import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateInput } from "ui/components";

const meta = {
  title: "DateInput",
  component: DateInput,
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
      description: "Date object",
    },
    onChange: {
      type: { name: "function", required: true },
      description: "Callback triggered when input is filled with a valid Date",
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
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: () => null,
  },
  // @ts-ignore
  render: (props) => <DateInputWrapper {...props} />,
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
  render: (props) => <DateInputWrapper {...props} />,
};

const DateInputWrapper: React.FunctionComponent<{ error?: string }> = (props) => {
  const [value, setValue] = useState<Date>();
  const [error, setError] = useState<string>();

  return (
    <div style={{ width: "400px", height: "500px", paddingTop: "50px" }}>
      <DateInput
        {...props}
        date={value}
        onChange={(date?: Date) => setValue(date)}
        onError={setError}
        error={props.error ?? error}
      />
    </div>
  );
};
