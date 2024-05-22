import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import {
  ChartTooltip,
  ChartTooltipColor,
  Icon,
  PercentChange,
  TooltipOrientation,
} from "ui/components";
import { Color } from "ui/styles";
import { createEnumOptions } from "../utilities";

const meta = {
  title: "ChartTooltip",
  component: ChartTooltip,
  parameters: {
    layout: "centered",
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      options: createEnumOptions(TooltipOrientation),
      control: { type: "select" },
      description: "Tooltip orientation",
      defaultValue: TooltipOrientation.TOP,
    },
    title: {
      type: { name: "string", required: true },
      description: "Tooltip title",
    },
    items: {
      description: "Array of TooltipItemProps",
    },
    footer: {
      description: "Array of TooltipItemProps",
    },
    position: {
      description: "Position { x: number; y: number; } to place tooltip nib",
    },
    visible: {
      type: "boolean",
      control: { type: "boolean" },
    },
    color: {
      options: createEnumOptions(ChartTooltipColor, true),
      control: { type: "select" },
      description: "Tooltip color",
    },
    onMouseEnter: {
      type: "function",
      description: "Callback triggered on mouse enter",
    },
    onMouseLeave: {
      type: "function",
      description: "Callback triggered on mouse exit",
    },
  },
} satisfies Meta<typeof ChartTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    title: "Leg 1",
    items: [
      {
        value: "2.3%",
        label: "Strike",
      },
      {
        value: "3%",
        label: "Vega",
      },
      {
        value: "3%",
        label: "Vega",
      },
      {
        value: "1%",
        label: "Vega",
      },
    ],
    orientation: TooltipOrientation.TOP,
  },
  render: (props) => (
    // @ts-ignore
    <ChartTooltipWrapper {...props} />
  ),
};

export const Bottom: Story = {
  args: {
    title: "Path Simulation",
    items: [
      {
        value: 832,
        label: "Variables",
      },
      {
        value: 16,
        label: "Index",
      },
      {
        value: 10.35,
        label: "Value",
      },
    ],
    footer: [
      {
        label: "Path 1",
        icon: <Icon name="indicator" color={Color.SUCCESS_700} size={8} defaultSize={8} />,
      },
    ],
    orientation: TooltipOrientation.BOTTOM,
  },
  render: (props) => (
    // @ts-expect-error
    <ChartTooltipWrapper {...props} />
  ),
};

export const Left: Story = {
  args: {
    title: "Call",
    items: [
      {
        value: "0.123M",
      },
      {
        icon: <PercentChange change={"2-3"} direction="negative" />,
        label: "then Exposure",
      },
    ],
    footer: [
      {
        label: "Median",
      },
    ],
    orientation: TooltipOrientation.LEFT,
  },
  render: (props) => (
    // @ts-ignore
    <ChartTooltipWrapper {...props} />
  ),
};

export const Right: Story = {
  args: {
    title: "Hedged",
    color: ChartTooltipColor.NEUTRAL_800,
    items: [
      {
        value: 0.8745,
        label: "Vars",
      },
      {
        icon: <PercentChange change={"2-3"} direction="positive" />,
        label: "then unhedged",
      },
    ],
    footer: [
      {
        label: "Upper Q3 (75%)",
      },
    ],
    orientation: TooltipOrientation.RIGHT,
  },
  render: (props) => (
    // @ts-ignore
    <ChartTooltipWrapper {...props} />
  ),
};

export const Positioned: Story = {
  args: {
    title: "Hedged",
    color: ChartTooltipColor.NEUTRAL_800,
    items: [
      {
        value: 0.8745,
        label: "Vars",
      },
      {
        icon: <PercentChange change={"2-3"} direction="positive" />,
        label: "then unhedged",
      },
    ],
    footer: [
      {
        label: "Upper Q3 (75%)",
      },
    ],
  },
  render: (props) => (
    // @ts-ignore
    <PositionedChartTooltipWrapper {...props} />
  ),
};

const ChartTooltipWrapper: React.FunctionComponent = (props) => {
  return (
    <div>
      <ChartTooltip title={""} {...props} />
    </div>
  );
};

const PositionedChartTooltipWrapper: React.FunctionComponent = (props) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickEvent = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        setPosition({
          x: e.offsetX,
          y: e.offsetY,
        });
      }
    };
    document.addEventListener("mousedown", handleClickEvent);

    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      style={{
        width: "800px",
        height: "400px",
        border: `2px dashed ${Color.NEUTRAL_700}`,
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <ChartTooltip title={""} position={position} {...props} />
      Click in here
    </div>
  );
};
