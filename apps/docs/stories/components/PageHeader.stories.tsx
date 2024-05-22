import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "ui/components";
import Logo from "../assets/Logo.png";
import Profile from "../assets/profile.png";

const meta = {
  title: "PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    page: {
      type: { name: "string", required: true },
      description: "Page title",
    },
    saved: {
      type: "boolean",
      control: { type: "boolean" },
    },
    draft: {
      type: "boolean",
      control: { type: "boolean" },
    },
    actions: {
      // @ts-ignore
      type: { name: "array", required: true },
      description: "Array of { icon: IconName; onClick: () => void }",
    },
    breadcrumbs: {
      description: "Breadcrumb values",
    },
    user: {
      // @ts-ignore
      type: { name: "object", required: true },
    },
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: "IG4 Analysis 2",
    actions: [
      {
        icon: "search",
        onClick: () => null,
      },
      {
        icon: "info",
        onClick: () => null,
      },
      {
        icon: "calendar",
        onClick: () => null,
      },
      {
        icon: "payments",
        onClick: () => null,
      },
    ],
    user: {
      onClick: () => null,
      profile: Profile.src,
      logo: Logo.src,
    },
  },
};

export const Breadcrumbs: Story = {
  args: {
    page: "IG4 Analysis 2",
    actions: [
      {
        icon: "search",
        onClick: () => null,
      },
      {
        icon: "info",
        onClick: () => null,
      },
      {
        icon: "calendar",
        onClick: () => null,
      },
      {
        icon: "payments",
        onClick: () => null,
      },
    ],
    user: {
      onClick: () => null,
      profile: Profile.src,
      logo: Logo.src,
    },
    breadcrumbs: {
      crumbs: [
        {
          key: "1",
          label: "Analyses",
        },
        {
          key: "2",
          label: "IG4 Analysis 2",
        },
      ],
    },
  },
};

export const Extras: Story = {
  args: {
    page: "IG4 Analysis 2",
    actions: [
      {
        icon: "search",
        onClick: () => null,
      },
      {
        icon: "info",
        onClick: () => null,
      },
      {
        icon: "calendar",
        onClick: () => null,
      },
      {
        icon: "payments",
        onClick: () => null,
      },
    ],
    user: {
      onClick: () => null,
      profile: Profile.src,
      logo: Logo.src,
    },
    breadcrumbs: {
      crumbs: [
        {
          key: "1",
          label: "Analyses",
        },
        {
          key: "2",
          label: "IG4 Analysis 2",
        },
      ],
    },
    draft: true,
    saved: true,
  },
};
