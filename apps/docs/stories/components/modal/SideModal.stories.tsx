import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, ModalPosition, SideModal } from "ui/components";
import { createEnumOptions } from "../../../stories/utilities";

const meta = {
  title: "SideModal",
  component: SideModal,
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
    onDismiss: {
      type: "function",
      description: "Callback triggered on x button click",
    },
    position: {
      options: createEnumOptions(ModalPosition),
      control: { type: "select" },
      description: "Side of screen to display modal",
    },
  },
} satisfies Meta<typeof SideModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Are you sure you want to leave Strategy Simulation?",
    description:
      "You have an unsaved Strategy Simulation. All changes will be lost unless you run the simulation.",
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
  render: (props) => <SideModalWrapper {...props} />,
};

const SideModalWrapper: React.FunctionComponent<{
  title?: string;
  description?: string;
  position?: ModalPosition;
}> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Button label="Show Modal" onClick={() => setShowModal(true)} />
      {showModal && <SideModal {...props} onDismiss={() => setShowModal(false)} />}
    </div>
  );
};
