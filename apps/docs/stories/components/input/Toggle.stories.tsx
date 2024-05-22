import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Toggle } from "ui/components";

const meta = {
  title: "Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      type: "boolean",
    },
    active: {
      type: "boolean",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Text",
    active: true,
  },
  // @ts-ignore
  render: (props) => <ToggleWrapper {...props} />,
};

const ToggleWrapper: React.FunctionComponent<{ active: boolean }> = (props) => {
  const [active, setActive] = useState<boolean>(props.active);
  useEffect(() => setActive(props.active), [props.active]);
  return <Toggle {...props} active={active} onClick={() => setActive(!active)} />;
};
