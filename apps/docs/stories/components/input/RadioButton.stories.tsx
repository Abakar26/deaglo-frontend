import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { RadioButton } from "ui/components";

const meta = {
  title: "RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      type: "boolean",
    },
    active: {
      type: { name: "boolean", required: true },
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    active: true,
    label: "Text",
  },
  // @ts-ignore
  render: (props) => <RadioButtonWrapper {...props} />,
};

const RadioButtonWrapper: React.FunctionComponent<{ active: boolean }> = (props) => {
  const [active, setActive] = useState<boolean>(props.active);
  useEffect(() => setActive(props.active), [props.active]);
  return <RadioButton {...props} active={active} onClick={() => setActive(!active)} />;
};
