import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  CurrencySegment,
  PercentChangeSegment,
  Segment,
  SegmentedContentBlock,
  SegmentedContentColor,
  SegmentedContentSize,
} from "ui/components";
import { createEnumOptions } from "../../../stories/utilities";

const meta = {
  title: "SegmentedContentBlock",
  component: SegmentedContentBlock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      options: createEnumOptions(SegmentedContentColor, true),
      control: { type: "select" },
      description: "Content color",
      type: { name: "string", required: false },
    },
    separated: {
      type: { name: "boolean", required: false },
      description: "True if segmented content block should be separated",
    },
    title: {
      type: { name: "string", required: false },
    },
    size: {
      options: createEnumOptions(SegmentedContentSize),
      control: { type: "select" },
      description: "Content size",
      type: { name: "string", required: false },
    },
  },
} satisfies Meta<typeof SegmentedContentBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  // @ts-ignore
  render: (props) => <SegmentedContentBlockWrapper {...props} />,
};

const SegmentedContentBlockWrapper: React.FunctionComponent = (props) => {
  return (
    <div style={{ width: "800px" }}>
      <SegmentedContentBlock {...props}>
        <Segment label="Leg amount">1</Segment>
        <Segment label="Strike">0</Segment>
        <Segment label="Leverage">1.34</Segment>
        <CurrencySegment
          label="Currency"
          baseCurrency="USD"
          baseFlag="USA"
          quoteCurrency="BRL"
          quoteFlag="BRL"
        />
        <PercentChangeSegment
          label={"Movement"}
          title="Change"
          change={1.34}
          data={[-1.2, 3.5, 6.7, 3, 5, 4, 3.7, 3, 2.5]}
          description="trailing text"
        />
      </SegmentedContentBlock>
    </div>
  );
};
