import { Sidebar, SidebarItem } from "ui/components";
import { type SidebarActionProps } from "ui/components/sidebar/SidebarAction";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    altAction: {
      // @ts-ignore
      type: { name: "object" },
      description: "title, icon, label, and onClick for additional sidebar action",
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    altAction: {
      title: "Need some guidance?",
      icon: "guidance",
      label: "Review Tutorial",
      onClick: () => null,
    },
  },
  render: ({ altAction }) => <SidebarWrapper altAction={altAction} />,
};

const SidebarWrapper: React.FunctionComponent<{
  altAction?: SidebarActionProps;
}> = ({ altAction }) => {
  const [current, setCurrent] = useState<string>("/dashboard");
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Sidebar altAction={altAction} open={open} setOpen={setOpen}>
      <SidebarItem
        open={open}
        label="Dashboard"
        icon="dashboard"
        active={current === "/dashboard"}
        onClick={() => setCurrent("/dashboard")}
      />
      <SidebarItem
        open={open}
        label="Market"
        icon="market"
        active={current === "/market"}
        onClick={() => setCurrent("/market")}
      />
      <SidebarItem
        open={open}
        label="Analyses"
        icon="analysis"
        active={current === "/analyses"}
        onClick={() => setCurrent("/analyses")}
      />
      <SidebarItem
        open={open}
        label="Payments"
        icon="payments"
        active={current === "/payments"}
        onClick={() => setCurrent("/payments")}
      />
      <SidebarItem
        open={open}
        label="Management"
        icon="management"
        active={current === "/management"}
        onClick={() => setCurrent("/management")}
      />
      <SidebarItem
        open={open}
        label="Premium"
        icon="premium"
        active={current === "/premium"}
        onClick={() => setCurrent("/premium")}
      />
    </Sidebar>
  );
};
