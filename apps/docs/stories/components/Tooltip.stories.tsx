import type { Meta, StoryObj } from "@storybook/react";
import { type ReactNode } from "react";
import { Tooltip, TooltipOrientation, iconRegistry, type IconName } from "ui/components";
import { createEnumOptions } from "../utilities";

const meta = {
  title: "Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon name",
      defaultValue: "info",
      type: { name: "string", required: false },
    },
    orientation: {
      options: createEnumOptions(TooltipOrientation),
      control: { type: "select" },
      description: "Tooltip orientation",
      defaultValue: TooltipOrientation.TOP,
    },
    label: {
      type: "string",
      description: "Tooltip label",
    },
    body: {
      description: "ReactNode to display in tooltip pop-out",
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Hover me",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    icon: "info",
    orientation: TooltipOrientation.TOP,
  },
  render: ({ label, body, orientation, icon }) => (
    <TooltipWrapper label={label} body={body} orientation={orientation} icon={icon} />
  ),
};

const TooltipWrapper: React.FunctionComponent<{
  label: string;
  body?: ReactNode;
  orientation?: TooltipOrientation;
  icon?: IconName;
}> = ({ label, body, orientation, icon }) => {
  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tooltip label={label} body={body} orientation={orientation} icon={icon} />
    </div>
  );
};
