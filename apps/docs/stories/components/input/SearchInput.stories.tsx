import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SearchInput } from "ui/components";

const meta = {
  title: "SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      type: "boolean",
      control: { type: "boolean" },
    },
    error: {
      type: "string",
      description: "Error text to display below input",
    },
    onChange: {
      type: { name: "function", required: true },
      description: "Callback triggered on input change",
    },
    value: {
      type: { name: "string", required: true },
      description: "Search string value",
    },
    placeholder: {
      type: "string",
      description: "Input box placeholder text",
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: () => null,
    value: "",
  },
  render: () => <SearchInputWrapper />,
};

export const Error: Story = {
  args: {
    onChange: () => null,
    value: "sdf",
    error: "Error text",
  },
  // @ts-ignore
  render: (props) => <SearchInputWrapper {...props} />,
};

export const Disabled: Story = {
  args: {
    onChange: () => null,
    value: "",
    disabled: true,
  },
  // @ts-ignore
  render: (props) => <SearchInputWrapper {...props} />,
};

const SearchInputWrapper: React.FunctionComponent = (props) => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ width: "400px" }}>
      <SearchInput
        {...props}
        value={value}
        onChange={setValue}
        placeholder={"Search..."}
        onClear={() => setValue("")}
      />
    </div>
  );
};
