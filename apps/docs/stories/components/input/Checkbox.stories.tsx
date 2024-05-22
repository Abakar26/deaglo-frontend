import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Checkbox } from "ui/components";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      type: { name: "string", required: false },
    },
    disabled: {
      type: "boolean",
    },
    active: {
      type: { name: "boolean", required: true },
    },
    onClick: {
      type: "function",
      description: "Callback triggered on checkbox click, takes active state",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Text",
    active: true,
  },
  // @ts-ignore
  render: (props) => <CheckboxWrapper {...props} />,
};

const CheckboxWrapper: React.FunctionComponent<{ active: boolean }> = (props) => {
  const [active, setActive] = useState<boolean>(props.active);
  useEffect(() => setActive(props.active), [props.active]);
  return <Checkbox {...props} active={active} onClick={() => setActive(!active)} />;
};
