import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterDropdown } from "ui/components";

const meta = {
  title: "FilterDropdown",
  component: FilterDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    filter: {
      type: { name: "string", required: true },
      description: "Name of filter category",
    },
    options: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Array of filter options, string | Selectable",
    },
    active: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Array of active filters, string | Selectable",
    },
    onSelect: {
      type: { name: "function", required: true },
      description: "Callback triggered on option select",
    },
  },
} satisfies Meta<typeof FilterDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filter: "Base Currency",
    active: [],
    onSelect: () => null,
    options: [],
  },
  render: () => <FilterDropdownWrapper />,
};

const FilterDropdownWrapper: React.FunctionComponent = () => {
  const options = ["USD", "BRL", "CAD", "GBP"];
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const onSelect = (value: string) => {
    const _selected = new Set(selected);
    if (Array.from(selected.values()).includes(value)) {
      _selected.delete(value);
    } else {
      _selected.add(value);
    }

    setSelected(_selected);
  };

  return (
    <div style={{ width: "400px", height: "400px", paddingTop: "40px" }}>
      <FilterDropdown
        filter="Base Currency"
        active={Array.from(selected)}
        onSelect={onSelect}
        options={options}
      />
    </div>
  );
};
