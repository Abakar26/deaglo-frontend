import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputType, TextInput } from "ui/components";
import { createEnumOptions } from "../../../stories/utilities";

const meta = {
  title: "TextInput",
  component: TextInput,
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
    onChange: {
      description: "Callback triggered on input change",
    },
    label: {
      type: "string",
      description: "Label to display on top border",
    },
    placeholder: {
      type: "string",
      description: "Placeholder for input box",
    },
    type: {
      options: createEnumOptions(InputType),
      control: { type: "select" },
      description: "Allows 'password' input type",
    },
    value: {
      type: "string",
      description: "The input value",
    },
    onBlur: {
      type: { name: "function", required: false },
      description: "Callback triggered on input blur",
    },
    onFocus: {
      type: { name: "function", required: false },
      description: "Callback triggered on input focus",
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
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: () => null,
    label: "Label",
    value: "",
  },
  // @ts-ignore
  render: (props) => <TextInputWrapper {...props} />,
};

export const Tooltip: Story = {
  args: {
    onChange: () => null,
    value: "",
    label: "Label",
    tooltip: {
      label: "Click me",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  },
  // @ts-ignore
  render: (props) => <TextInputWrapper {...props} />,
};

const TextInputWrapper: React.FunctionComponent = (props) => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ width: "400px" }}>
      <TextInput
        {...props}
        value={value}
        onChange={setValue}
        placeholder={"Placeholder"}
        label={"Label"}
      />
    </div>
  );
};
