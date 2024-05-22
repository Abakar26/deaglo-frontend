import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { NumberInput, NumberInputType } from "ui/components";
import { createEnumOptions } from "../../../stories/utilities";

const meta = {
  title: "NumberInput",
  component: NumberInput,
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
      type: { name: "function", required: true },
      description: "Callback triggered on input change iff input string is parsable",
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
      options: createEnumOptions(NumberInputType),
      control: { type: "select" },
      description: "Defines the type of numbers that can be input",
    },
    value: {
      type: "number",
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
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    placeholder: "Placeholder",
    onChange: () => null,
  },
  // @ts-ignore
  render: (props) => <NumberInputWrapper {...props} />,
};

export const Tooltip: Story = {
  args: {
    onChange: () => null,
    label: "Label",
    placeholder: "Placeholder",
    tooltip: {
      label: "Click me",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  },
  // @ts-ignore
  render: (props) => <NumberInputWrapper {...props} />,
};

const NumberInputWrapper: React.FunctionComponent<{ value?: number }> = (props) => {
  const [value, setValue] = useState<number | undefined>(props.value);

  useEffect(() => setValue(props.value), [props.value]);

  return (
    <div style={{ width: "400px", height: "200px", paddingTop: "50px" }}>
      <NumberInput {...props} value={value} onChange={setValue} label={"Label"} />
    </div>
  );
};
