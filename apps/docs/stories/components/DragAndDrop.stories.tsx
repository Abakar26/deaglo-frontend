import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Button,
  ButtonSize,
  ButtonType,
  DateInput,
  Draggable,
  InsertArea,
  NumberInput,
} from "ui/components";

const meta = {
  title: "Draggable",
  component: Draggable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      type: "boolean",
      description: "True if the draggable section is disabled",
    },
    dataTransfer: {
      type: "string",
      description: "Data to transfer on drop",
    },
    onDrag: {
      type: "function",
      description: "Callback triggered on drag event",
    },
    onDrop: {
      type: "function",
      description: "Callback triggered on drop event",
    },
  },
} satisfies Meta<typeof Draggable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: ({ disabled }) => <DragAndDropWrapper disabled={disabled} />,
};

const DragAndDropWrapper: React.FunctionComponent<{ disabled?: boolean }> = (props) => {
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState<Date>();

  return (
    <div
      style={{
        width: "800px",
        height: "300px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Draggable
        disabled={props.disabled}
        onDrag={() => null}
        onDrop={() => null}
        dataTransfer={JSON.stringify({ amount, date })}
      >
        <DateInput width={350} onChange={setDate} date={date} />
        <NumberInput label="Amount" value={amount} onChange={setAmount} />
        <div style={{ minWidth: "48px" }}>
          <Button leadingIcon="trash" type={ButtonType.OUTLINE} size={ButtonSize.LARGE} />
        </div>
      </Draggable>

      <InsertArea label="Drop in here" icon="plus" onDataDrop={(data) => window.alert(data)} />
    </div>
  );
};
