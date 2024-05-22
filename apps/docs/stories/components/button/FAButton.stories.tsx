import type { Meta, StoryObj } from "@storybook/react";
import styled, { type RuleSet } from "styled-components";
import { FAButton, iconRegistry, type IconName } from "ui/components";

const ButtonWrapper = styled.div`
  padding: 10px;
`;

const meta = {
  title: "FAButton",
  component: FAButton,
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
      type: { name: "string", required: true },
    },
    onClick: {
      type: { name: "function", required: true },
      description: "Callback triggered on a click event",
    },
    disabled: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Prevents onClick call",
    },
    position: {
      description: "CSS RuleSet to control button location",
    },
  },
} satisfies Meta<typeof FAButton>;

export default meta;
type Story = StoryObj<typeof meta>;

interface StoryProps {
  icon: IconName;
  onClick: () => void;
  disabled?: boolean;
  position?: RuleSet;
}

export const FAButtonStory: Story = (args: StoryProps) => (
  <ButtonWrapper>
    <FAButton {...args} />
  </ButtonWrapper>
);

FAButtonStory.args = {
  icon: "message",
};
