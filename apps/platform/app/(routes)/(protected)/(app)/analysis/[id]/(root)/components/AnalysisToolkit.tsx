"use client";

import { useUrl } from "@/app/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  ActionBlock,
  Button,
  DropdownSelect,
  InsertArea,
  ListOption,
  Modal,
  SimulationToolbar,
  SmallButton,
  Tooltip,
  TooltipOrientation,
  type IconName,
  type Selectable,
} from "ui/components";
import { Color, Typography } from "ui/styles";

const defaultOptions: Array<Selectable> = [
  { key: "strategy-simulation", value: "Strategy Simulation", icon: "strategy" },
  { key: "margin-simulation", value: "Margin Simulation", icon: "margin" },
  { key: "hedge-simulation", value: "Hedge IRR", icon: "hedge" },
];

const ACTION_BLOCK_VALUES = [
  {
    title: "Run a Strategy Simulation",
    description:
      "Run the Strategy Simulation tool to analyze downside risks and potential payoffs on different strategies.",
  },
  {
    title: "Run a Margin Simulation",
    description:
      "Run the Margin Simulation tool to determine an optimal amount to hold for potential margin call.",
  },
  {
    title: "Run a Hedge IRR Simulation",
    description:
      "Run the Hedge IRR tool to analyze how your IRR will be affected by hedging costs.",
  },
];

interface Props {
  tutorialStep: number;
}

interface ToolbarSelection {
  "strategy-simulation": boolean;
  "margin-simulation": boolean;
  "hedge-simulation": boolean;
}

export const AnalysisToolkit = ({ tutorialStep }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<Selectable | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const defaultCustomizeOptions: ToolbarSelection = {
    "strategy-simulation": true,
    "margin-simulation": false,
    "hedge-simulation": true,
  };

  const storedOptions = localStorage.getItem("customizeOptions");
  const initialCustomizeOptions: ToolbarSelection = storedOptions
    ? (JSON.parse(storedOptions) as ToolbarSelection)
    : defaultCustomizeOptions;

  const [toolbarSelection, setToolbarSelection] =
    useState<ToolbarSelection>(initialCustomizeOptions);
  const [options, setOptions] = useState<Array<Selectable>>(defaultOptions);

  const { append } = useUrl();
  const pathname = usePathname();
  const router = useRouter();

  const toolbarListOptions = useMemo(
    () => [
      {
        key: "strategy-simulation",
        active: toolbarSelection["strategy-simulation"],
        label: "Strategy Simulation",
        icon: "strategy" as IconName,
      },
      {
        key: "margin-simulation",
        active: toolbarSelection["margin-simulation"],
        label: "Margin Simulation",
        icon: "margin" as IconName,
      },
      {
        key: "hedge-simulation",
        active: toolbarSelection["hedge-simulation"],
        label: "Hedge IRR",
        icon: "hedge" as IconName,
      },
    ],
    [toolbarSelection]
  );

  const handleSearch = (event: string) => {
    setSearch(event);
    setOptions(
      event
        ? defaultOptions.filter((opt) => opt.value.toLowerCase().includes(event.toLowerCase()))
        : defaultOptions
    );
  };

  const selectCustomizeToolbar = (key: keyof ToolbarSelection) => {
    setToolbarSelection((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const runSimulation = () => {
    if (selected) {
      append(selected.key.toLowerCase());
    }
  };

  useEffect(() => {
    localStorage.setItem("customizeOptions", JSON.stringify(toolbarSelection));
  }, [toolbarSelection]);

  return (
    <>
      {showModal && (
        <Modal
          title="Pin simulation tools"
          description="Pinned simulation tools will be directly accessible from your toolbar."
          onDismiss={() => {
            setShowModal(false);
          }}
        >
          <div>
            {toolbarListOptions.map((item, index) => (
              <ListOptionContainer key={index}>
                <ListOption
                  active={item.active}
                  label={item.label}
                  onClick={() => selectCustomizeToolbar(item.key as keyof ToolbarSelection)}
                  icon={item.icon as IconName}
                  multi={true}
                />
              </ListOptionContainer>
            ))}

            <ModalButtonsContainer>
              <CancelButton>
                <Button label="Cancel" type={1} size={1} onClick={() => setShowModal(false)} />
              </CancelButton>
              <SelectButton>
                <Button label="Select" type={0} size={1} onClick={() => setShowModal(false)} />
              </SelectButton>
            </ModalButtonsContainer>
          </div>
        </Modal>
      )}

      <Container>
        {tutorialStep < 3 && (
          <ActionBlock
            title={ACTION_BLOCK_VALUES[tutorialStep]!.title}
            description={ACTION_BLOCK_VALUES[tutorialStep]!.description}
            tasks={3}
            completed={tutorialStep}
          />
        )}
        <ToolkitContainer>
          <Toolkit>
            <SimulationContainer>
              <SubTitle>Simulations</SubTitle>
              <DropdownSelect
                label="Choose Simulation"
                placeholder="Select Simulation"
                onSearch={handleSearch}
                onSelect={setSelected}
                search={search}
                selected={selected}
                options={options}
              />
              <TooltipContainer>
                <Tooltip
                  orientation={TooltipOrientation.BOTTOM}
                  label="What do you need simulations for?"
                  body="Simulations offer detailed insights into potential hedging outcomes. These tools can provide you with statistics such as IRR impact, expected payoffs, and margin requirements, helping you make informed decisions."
                  icon="info"
                />
              </TooltipContainer>
              <ButtonRow>
                <SmallButton
                  label="Run Simulation"
                  disabled={selected ? false : true}
                  onClick={runSimulation}
                />
              </ButtonRow>
            </SimulationContainer>

            <Separator />

            <InsertAreaContainer>
              {Object.values(toolbarSelection).every((v) => v !== true) ? (
                <InsertArea
                  label="Customize Toolbar"
                  icon="customize"
                  onClick={() => setShowModal(true)}
                />
              ) : (
                <SimulationToolbarWrapper>
                  <SimulationToolbar
                    onClick={() => setShowModal(true)}
                    onDelete={(key: string) => {
                      setToolbarSelection((prev) => ({
                        ...prev,
                        [key as keyof ToolbarSelection]: false,
                      }));
                    }}
                    onSelect={(key: string) => {
                      router.push(pathname + "/" + key);
                    }}
                    simulations={toolbarListOptions.filter((item) => item.active)}
                  />
                </SimulationToolbarWrapper>
              )}
            </InsertAreaContainer>
          </Toolkit>
        </ToolkitContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${Color.NEUTRAL_00};
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0px 8px 24px 0px rgba(145, 146, 161, 0.16);
`;

const Toolkit = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  margin-top: 12px;
  gap: 12px;
`;

const SimulationContainer = styled.div`
  min-width: 599px;
  height: 200px;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid ${Color.NEUTRAL_400};
  flex-grow: 3;
`;

const SubTitle = styled.p`
  ${Typography.SUBHEAD_2}
  margin-bottom: 12px;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 40px;
`;

const Separator = styled.div`
  width: 1px;
  height: 200px;
  background-color: ${Color.NEUTRAL_400};
  margin: 0px 24px;
  flex-grow: 0;
  @media (max-width: 1384px) {
    display: none;
  }
`;

const ModalButtonsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
`;

const ToolkitContainer = styled.div`
  width: 100%;
`;

const TooltipContainer = styled.div`
  margin-top: 8px;
`;

const InsertAreaContainer = styled.div`
  display: flex;
  flex-grow: 1;
  min-height: 120px;
  max-width: 480px;
`;

const ListOptionContainer = styled.div`
  margin-top: 12px;
`;

const CancelButton = styled.span`
  width: 128px;
  margin-right: 12px;
`;

const SelectButton = styled.span`
  width: 128px;
`;

const SimulationToolbarWrapper = styled.div`
  width: 100%;
`;
