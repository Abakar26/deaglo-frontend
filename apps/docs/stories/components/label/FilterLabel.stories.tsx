import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";
import { FilterLabel } from "ui/components";
import { Color } from "ui/styles";
import USFlag from "../../../stories/assets/us-flag.png";

const meta = {
  title: "FilterLabel",
  component: FilterLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    filter: {
      type: { name: "string", required: true },
      description: "Name of filter category",
    },
    value: {
      // @ts-ignore
      type: { name: "object", required: true },
      description: "ReactNode value to represent filter selection",
    },
    onDelete: {
      type: "function",
      description: "Callback triggered on x button click",
    },
  },
} satisfies Meta<typeof FilterLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Flag = styled.img`
  height: 20px;
  width: 20px;
  border: 1px solid ${Color.NEUTRAL_500};
  border-radius: 15px;
`;

export const SingleCurrency: Story = {
  args: {
    filter: "Base currency",
    value: (
      <>
        <Flag src={USFlag.src} aria-label="US Flag" />
        USD
      </>
    ),
    onDelete: () => null,
  },
};
