import type { Meta, StoryObj } from "@storybook/react";
import { HelperAction, HelperBlock, HelperImage, HelperSection } from "ui/components";
import image from "../../assets/excel.png";

import React from "react";

const meta = {
  title: "HelperBlock",
  component: HelperBlock,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: { name: "string", required: false },
    },
    onClose: {
      type: { name: "function", required: false },
      description: "Callback triggered on x button click",
    },
    onChat: {
      type: { name: "function", required: false },
      description: "Callback triggered on chat button click",
    },
  },
} satisfies Meta<typeof HelperBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Need help?",
  },
  render: ({ title }) => <HelperBlockWrapper title={title} />,
};

export const Highlight: Story = {
  args: {
    title: "Need help?",
  },
  render: ({ title }) => <HelperBlockWrapper title={title} highlight={true} />,
};

const HelperBlockWrapper: React.FunctionComponent<{
  title?: string;
  highlight?: boolean;
}> = ({ title, highlight }) => {
  return (
    <HelperBlock title={title} onClose={() => null} onChat={() => null}>
      <HelperSection title={"Hedge IRR"} highlight={highlight}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <HelperAction
          title="Don’t have a CSV file? "
          action={{ label: "Download template", onClick: () => null }}
          highlight={highlight}
        />
      </HelperSection>
      <HelperSection title={"Scenario Setting"} highlight={highlight}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <HelperImage src={image.src} highlight={highlight} />
      </HelperSection>
    </HelperBlock>
  );
};
