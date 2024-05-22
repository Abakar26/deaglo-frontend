import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ContentBlock, ContentColor } from "ui/components";
import { ContentIconColor } from "ui/components/content/block/ContentIcon";

const meta = {
  title: "ContentBlock",
  component: ContentBlock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: "string",
      description: "Content block title",
    },
    description: {
      type: "string",
      description: "Content block description",
    },
    icon: {
      description: "ContentIcon color and icon name to display left of title and description",
    },
    action: {
      description: "onClick and label for content block button",
    },
  },
} satisfies Meta<typeof ContentBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Summary",
    description:
      "Your exposure on this investment is large. The variance in returns should you not hedge is X and Yappropriate cash reserve. The Call and Forward reduce this variance substantially. However the Par Forward provides the best protection and the most upside",
  },
  // @ts-ignore
  render: (props) => <ContentBlockWrapper {...props} />,
};

export const Action: Story = {
  args: {
    title: "Complete the Strategy Simulation",
    description: "Run the Strategy Simulation to proceed with executing your analysis.",
    icon: {
      icon: "strategy",
      color: ContentIconColor.NEUTRAL_00,
    },
    action: {
      label: "Run the Strategy Simulation",
      onClick: () => null,
    },
  },
  // @ts-ignore
  render: (props) => <ContentBlockWrapper {...props} />,
};

export const Dismissable: Story = {
  args: {
    title: "To have bigger FX strategy picture you can add Margin Simulation  ",
    description:
      "Margin Simulation assists in forecasting the Expected Value of margin calls, enabling you to set aside the optimal cash reserve. This tool functions as an integral component of Strategy Simulation, requiring you to select a pre-existing Strategy Simulation as its foundation. Utilize Margin Simulation to enhance your financial strategy by accurately estimating future collateral requirements.",
    icon: {
      icon: "info",
      color: ContentIconColor.NEUTRAL_00,
    },
    action: {
      label: "Go to Margin Simulation",
      onClick: () => null,
    },
    onDismiss: () => null,
  },
  // @ts-ignore
  render: (props) => <ContentBlockWrapper {...props} />,
};

export const Button: Story = {
  args: {
    title: "Add investments manually",
    description: "Input dates and amounts of your investments ",
    color: ContentColor.NEUTRAL_00,
    icon: {
      icon: "pencil",
      color: ContentIconColor.NEUTRAL_00,
    },
    action: {
      label: "Add Data",
      asButton: true,
      onClick: () => null,
    },
  },
  // @ts-ignore
  render: (props) => <ContentBlockWrapper {...props} />,
};

export const Reset: Story = {
  args: {
    title: "Reset to Default",
    description: "Reset environment values to default options",
    action: {
      label: "Reset",
      icon: "reset",
      onClick: () => null,
    },
  },
  // @ts-ignore
  render: (props) => <ContentBlockWrapper {...props} />,
};

export const Nested: Story = {
  args: {
    title: "This Margin Simulation is based on the Strategy Simulation below",
    description: "You can check Strategy Simulation details by clicking the button to the right.",
  },
  // @ts-ignore
  render: (props) => <ContentBlockNested {...props} />,
};

const ContentBlockWrapper: React.FunctionComponent = (props) => {
  return (
    <div style={{ width: "900px" }}>
      <ContentBlock {...props} />
    </div>
  );
};

const ContentBlockNested: React.FunctionComponent = (props) => {
  return (
    <div style={{ width: "900px" }}>
      <ContentBlock {...props}>
        <ContentBlock
          color={ContentColor.NEUTRAL_00}
          action={{
            label: "Open Simulation Result",
            asButton: true,
            onClick: () => null,
          }}
          title="Strategy Simulation(4)"
          description="Strategy Simulation"
        />
      </ContentBlock>
    </div>
  );
};
