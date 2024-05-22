import type { Meta, StoryObj } from "@storybook/react";
import { HelperButton, iconRegistry } from "ui/components";

const meta = {
  title: "HelperButton",
  component: HelperButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon Name",
      type: { name: "string", required: false },
    },
    label: {
      type: "string",
    },
    onClick: {
      description: "Callback triggered on button click",
      type: { name: "function", required: true },
    },
  },
} satisfies Meta<typeof HelperButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  // @ts-ignore
  render: (props) => <HelperButtonWrapper {...props} />,
};

export const Custom: Story = {
  args: {
    icon: "analysis",
    label: "Custom Label",
  },
  // @ts-ignore
  render: (props) => <HelperButtonWrapper {...props} />,
};

const HelperButtonWrapper: React.FunctionComponent = (props) => {
  return (
    <div style={{ width: "150px", display: "flex", justifyContent: "end" }}>
      <HelperButton onClick={() => null} {...props} />
    </div>
  );
};
