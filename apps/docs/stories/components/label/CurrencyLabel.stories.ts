import type { Meta, StoryObj } from "@storybook/react";
import { CurrencyLabel } from "ui/components";

const meta = {
  title: "CurrencyLabel",
  component: CurrencyLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    baseCurrency: {
      type: { name: "string", required: true },
      description: "Base currency symbol",
    },
    quoteCurrency: {
      type: "string",
      description: "Quote currency symbol",
    },
    baseFlag: {
      description: "URI of base currency flag",
    },
    quoteFlag: {
      description: "URI of quote currency flag",
    },
  },
} satisfies Meta<typeof CurrencyLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleCurrency: Story = {
  args: {
    baseCurrency: "USD",
  },
};

export const Exchange: Story = {
  args: {
    baseCurrency: "USD",
    quoteCurrency: "BRL",
  },
};

export const SingleCurrencyFlag: Story = {
  args: {
    baseCurrency: "USD",
    baseFlag: "USA",
  },
};

export const ExchangeFlag: Story = {
  args: {
    baseCurrency: "USD",
    baseFlag: "USA",
    quoteCurrency: "BRL",
    quoteFlag: "BRL",
  },
};
