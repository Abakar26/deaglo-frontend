"use client";

import { format } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  CurrencySegment,
  Dropdown,
  Segment,
  SegmentedButton,
  SegmentedContentBlock,
  SegmentedContentSize,
  useClickOutside,
  type Flag,
  type MenuProps,
  type Selectable,
} from "ui/components";
import WaterfallModel from "../../modals/WaterfallModel";

interface Props {
  simulationType: string;
  harvestData: { data: string };
  timeline: {
    start: Date;
    end: Date;
  };
  currency: {
    baseCurrency: string;
    baseFlag: Flag;
    foreignCurrency: string;
    foreignFlag: Flag;
  };
  onExecute?: () => void;
  actions?: {
    onEdit: () => void;
    onDownload: () => void;
    more?: MenuProps<Selectable>;
  };
}

export const ResultsHeader: React.FunctionComponent<Props> = ({
  timeline,
  simulationType,
  harvestData,
  currency,
  onExecute,
  actions,
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showWaterfall, setShowWaterfall] = useState(false);
  const container = useClickOutside(() => setShowMenu(false));

  const select = (selection: Selectable) => {
    setShowMenu(false);
    actions?.more?.onSelect(selection);
  };

  return (
    <Container>
      <SegmentedContentBlock separated size={SegmentedContentSize.MEDIUM}>
        <CurrencySegment {...currency} />
        <Segment>
          {format(timeline.start.setUTCHours(12, 0, 0, 0), "MMM d, yyyy")} -{" "}
          {format(timeline.end.setUTCHours(12, 0, 0, 0), "MMM d, yyyy")}
        </Segment>
      </SegmentedContentBlock>

      <ButtonSection ref={container}>
        {actions && (
          <>
            <SegmentedButton
              actions={[
                // {
                //   label: "More",
                //   onClick: () => setShowMenu(true),
                // },
                // {
                //   label: "Download",
                //   onClick: actions.onDownload,
                // },
                ...(simulationType === "HEDGE"
                  ? [
                      {
                        label: "View Waterfall",
                        onClick: () => setShowWaterfall(true),
                      },
                    ]
                  : []),
                {
                  label: "Edit",
                  onClick: actions.onEdit,
                },
              ]}
            />
            <DropdownContainer>
              <Dropdown
                options={actions?.more?.options ?? []}
                visible={showMenu}
                onSelect={select}
              />
            </DropdownContainer>
            {showWaterfall && (
              <WaterfallModel harvestData={harvestData} setShowWaterfall={setShowWaterfall} />
            )}
          </>
        )}

        {onExecute && <Button label="Execute Strategy" onClick={onExecute} resizeMode="fit" />}
      </ButtonSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  margin-bottom: 4px;
`;

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap-reverse;
  justify-content: end;
  position: relative;
  height: 100%;
  min-height: 72px;

  & > *:first-child {
    width: max-content;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  width: 250px;
  left: 0;
  top: calc(100% - 8px);
`;
