import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, ContentIconColor, Modal, type ContentIconProps } from "ui/components";

const meta = {
  title: "Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 800,
        iframeWidth: 800,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      type: "string",
      description: "Modal Title",
    },
    description: {
      type: "string",
      description: "Modal Description",
    },
    icon: {
      description: "ContentIcon Props",
    },
    onDismiss: {
      type: "function",
      description: "Callback triggered on x button click",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Are you sure you want to leave Strategy Simulation?",
    description:
      "You have an unsaved Strategy Simulation. All changes will be lost unless you run the simulation.",
    icon: {
      icon: "info",
      color: ContentIconColor.BROWN_100,
    },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 800,
        iframeWidth: 800,
      },
    },
  },
  render: (props) => <ModalWrapper {...props} />,
};

const ModalWrapper: React.FunctionComponent<{
  title?: string;
  description?: string;
  icon?: ContentIconProps;
}> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Button label="Show Modal" onClick={() => setShowModal(true)} />
      {showModal && <Modal {...props} onDismiss={() => setShowModal(false)} />}
    </div>
  );
};
