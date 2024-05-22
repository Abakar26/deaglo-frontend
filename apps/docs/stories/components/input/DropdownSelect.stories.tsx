import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DropdownSelect, type Selectable, iconRegistry } from "ui/components";

const meta = {
  title: "DropdownSelect",
  component: DropdownSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      type: "string",
      description: "Label to display on top border",
    },
    placeholder: {
      type: "string",
      description: "Placeholder for input box",
    },
    selected: {
      type: "string",
      description: "Value of selected option, or key if Selectable",
    },
    onSelect: {
      type: { name: "function", required: true },
      description: "Callback triggered on item select, takes string | Selectable",
    },
    onSearch: {
      type: { name: "function", required: false },
      description:
        "Callback triggered on search string change, undefined if input is not searchable",
    },
    search: {
      type: { name: "string", required: false },
      description: "Search input value",
    },
    onOpen: {
      description: "Callback triggered on dropdown open",
    },
    onClose: {
      escription: "Callback triggered on dropdown close",
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
    options: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Array of string | Identifiable",
    },
    icon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon Name",
      type: { name: "string", required: false },
    },
  },
} satisfies Meta<typeof DropdownSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => null,
    options: [],
  },
  render: () => <DropdownSelectWrapper />,
};

export const Tooltip: Story = {
  args: {
    onSelect: () => null,
    options: [],
    tooltip: {
      label: "Click me",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      icon: "info",
    },
  },
  // @ts-ignore
  render: (props) => <DropdownSelectWrapper {...props} />,
};

export const Search: Story = {
  args: {
    onSelect: () => null,
    options: [],
    tooltip: {
      label: "Click me",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      icon: "info",
    },
  },
  // @ts-ignore
  render: (props) => <DropdownSelectWrapper {...props} search={true} />,
};

const DropdownSelectWrapper: React.FunctionComponent<{ search?: boolean }> = (props) => {
  const initial: Array<Selectable> = [
    {
      key: "1",
      value: "Strategy Simulation",
      icon: "strategy",
    },
    {
      key: "2",
      value: "Margin Simulation",
      icon: "margin",
    },
    {
      key: "3",
      value: "Hedge IRR",
      icon: "hedge",
    },
    {
      key: "4",
      value: "Hedge IRR",
      icon: "hedge",
    },
    {
      key: "5",
      value: "Hedge IRR",
      icon: "hedge",
    },
    {
      key: "6",
      value: "Hedge IRR",
      icon: "hedge",
    },
    {
      key: "7",
      value: "Hedge IRR",
      icon: "hedge",
    },
  ];

  const [options, setOptions] = useState<Array<Selectable>>(initial);
  const [selected, setSelected] = useState<Selectable>();
  const [search, setSearch] = useState<string>("");

  const onSelect = (value: Selectable) => {
    setSelected(value);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value) {
      setOptions((options) =>
        options.filter((opt) => opt.value.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setOptions(initial);
    }
  };

  return (
    <div style={{ width: "400px", height: "400px", paddingTop: "40px" }}>
      <DropdownSelect
        {...props}
        selected={selected}
        onSelect={onSelect}
        options={options}
        placeholder={"Placeholder"}
        label={"Label"}
        onSearch={props.search ? handleSearch : undefined}
        search={search}
      />
    </div>
  );
};
