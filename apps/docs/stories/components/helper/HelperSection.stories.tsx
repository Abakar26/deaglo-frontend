import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { HelperAction, HelperSection } from "ui/components";

const meta = {
  title: "HelperSection",
  component: HelperSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: { name: "string", required: true },
    },
    highlight: {
      type: { name: "boolean", required: false },
    },
  },
} satisfies Meta<typeof HelperSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Upload Investments",
  },
  render: ({ title, highlight }) => (
    <div style={{ width: "282px" }}>
      <HelperSectionWrapper title={title} highlight={highlight} />
    </div>
  ),
};

const HelperSectionWrapper: React.FunctionComponent<{
  title: string;
  highlight?: boolean;
}> = ({ title, highlight }) => {
  return (
    <HelperSection title={title} highlight={highlight}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      <HelperAction
        highlight={highlight}
        title="Don’t have a CSV file? "
        action={{ label: "Download template", onClick: () => null }}
      />
    </HelperSection>
  );
};
