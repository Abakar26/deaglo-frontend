import type { IconName } from "ui/components";
import { Button, iconRegistry } from "ui/components";
import { SnackbarLevel } from "ui/components/snackbar";
import { SnackPosition, Snackbar } from "ui/components/snackbar/Snackbar";

import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ReactNode } from "react";
import { createEnumOptions } from "../utilities";

const meta = {
  title: "Snackbar",
  component: Snackbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      type: "string",
      description: "Message displayed in Snackbar",
    },
    level: {
      options: createEnumOptions(SnackbarLevel),
      control: { type: "select" },
      description: "Border style",
    },
    duration: {
      type: "number",
      description: "Time in seconds to display Snackbar before auto-dismiss",
    },
    action: {
      description: "Button label and onClick handler for Snackbar action",
    },
    onDismiss: {
      type: "function",
      description: "Callback triggered by X button",
    },
    icon: {
      options: Object.keys(iconRegistry),
      control: { type: "select" },
      description: "Icon name",
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    message: "Information",
    action: {
      label: "Accept",
      onClick: () => null,
    },
    onDismiss: () => null,
  },
  render: ({ level, message, action, icon }) => (
    <SnackbarWrapper level={level} message={message} action={action} icon={icon} />
  ),
};

export const Success: Story = {
  args: {
    message: "Success",
    action: {
      label: "View",
      onClick: () => null,
    },
    onDismiss: () => null,
  },
  render: ({ message, action, icon }) => (
    <SnackbarWrapper level={SnackbarLevel.SUCCESS} message={message} action={action} icon={icon} />
  ),
};

export const Error: Story = {
  args: {
    level: SnackbarLevel.ERROR,
    message: "Error",
    action: {
      label: "Fix",
      onClick: () => null,
    },
    onDismiss: () => null,
  },
  render: ({ message, action, icon }) => (
    <SnackbarWrapper level={SnackbarLevel.ERROR} message={message} action={action} icon={icon} />
  ),
};

export const NoAction: Story = {
  args: {
    message: "Success",
    action: {
      label: "View",
      onClick: () => null,
    },
    onDismiss: () => null,
    duration: 2.5,
  },
  render: ({ message, duration, icon }) => (
    <SnackbarWrapper
      level={SnackbarLevel.SUCCESS}
      message={message}
      icon={icon}
      duration={duration}
      dismissable={false}
    />
  ),
};

export const Left: Story = {
  args: {
    message: "Information",
    action: {
      label: "Accept",
      onClick: () => null,
    },
    onDismiss: () => null,
  },
  render: ({ level, message, action, icon }) => (
    <SnackbarWrapper
      level={level}
      message={message}
      action={action}
      icon={icon}
      position={SnackPosition.LEFT}
    />
  ),
};

export const Right: Story = {
  args: {
    message: "Information",
    action: {
      label: "Accept",
      onClick: () => null,
    },
    onDismiss: () => null,
  },
  render: ({ level, message, action, icon }) => (
    <SnackbarWrapper
      level={level}
      message={message}
      action={action}
      icon={icon}
      position={SnackPosition.RIGHT}
    />
  ),
};

const SnackbarWrapper: React.FunctionComponent<{
  level?: SnackbarLevel;
  icon?: IconName;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  message: ReactNode;
  dismissable?: boolean;
  position?: SnackPosition;
}> = ({ level, message, action, icon, dismissable = true, duration, position }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div
      style={{
        position: "relative",
        height: "500px",
        width: "800px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {show && (
        <Snackbar
          message={message}
          action={action}
          level={level}
          onDismiss={() => setShow(false)}
          icon={icon ?? "circle-check"}
          duration={duration}
          position={position}
          cancellable={dismissable}
        />
      )}
      <Button label="Show Snackbar" onClick={() => setShow(true)} />
    </div>
  );
};
