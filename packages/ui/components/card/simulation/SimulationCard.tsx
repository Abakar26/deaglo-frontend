import { format } from "date-fns";
import React, { type PropsWithChildren } from "react";
import styled from "styled-components";
import { getSimulationIcon, type SimulationType } from ".";
import {
  Checkbox,
  IconButton,
  Progressbar,
  SimulationStatus,
  SmallButton,
  StatusLabel,
  type ProgressbarProps,
  type Selectable,
} from "../..";
import { Color, Typography } from "../../../styles";
import { Menu, type MenuProps } from "../../button/Menu";
import { Card } from "../common/Card";
import { CardIcon } from "../common/CardIcon";

export enum SimulationMode {
  DEFAULT,
  STRATEGY,
}

interface Props {
  title: string;
  description: string;
  type: SimulationType;
  status: SimulationStatus;
  lastRun?: Date;
  menu?: MenuProps<Selectable>;
  mode?: SimulationMode;
  pinned?: boolean;
  unpin?: () => void;
  progress?: ProgressbarProps;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onCancel?: () => void;
  onClick?: () => void;
}

export const SimulationCard: React.FunctionComponent<Props & PropsWithChildren> = ({
  title,
  description,
  type,
  status,
  lastRun,
  menu,
  mode,
  pinned,
  unpin,
  progress,
  selected = false,
  onSelect,
  onCancel,
  onClick,
  children,
}) => {
  return (
    <Card
      hoverable={status !== SimulationStatus.IN_PROGRESS}
      borderColor={status === SimulationStatus.COMPLETE ? Color.SUCCESS_400 : undefined}
      onClick={onClick}
    >
      <Row>
        <RowSection>
          <CardIcon {...getSimulationIcon(type)} />
          <Column>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Column>
        </RowSection>
        <RowSection>
          {pinned && (
            <IconButton
              name="pin"
              fill={Color.BRAND_400}
              stroke={Color.BRAND_800}
              onClick={() => unpin && unpin()}
            />
          )}
          {mode == SimulationMode.STRATEGY && <Checkbox active={selected} onClick={onSelect} />}
          {menu && <Menu {...menu} />}
        </RowSection>
      </Row>
      {children}
      <Row reverse center>
        <StatusLabel status={status} />
        {lastRun && <LastRun>Last Run {format(lastRun, "MMM d yyyy")}</LastRun>}
      </Row>
      {status == SimulationStatus.IN_PROGRESS && progress && (
        <ProgressContainer>
          {onCancel && (
            <CancelButton>
              <SmallButton label="Cancel" onClick={onCancel} />
            </CancelButton>
          )}
          <Progressbar {...progress} />
        </ProgressContainer>
      )}
    </Card>
  );
};

const Row = styled.div<{ reverse?: boolean; center?: boolean }>`
  width: 100%;
  display: flex;
  align-items: ${(props) => (props.center ? "center" : "start")};
  justify-content: space-between;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
`;

const RowSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
`;

const ProgressContainer = styled.div`
  position: absolute;
  width: calc(100% - 160px);
  height: calc(100% - 104px);
  left: 0;
  top: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 64px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.75);
`;

const LastRun = styled.span`
  ${Typography.LABEL_4};
  color: ${Color.NEUTRAL_700};
`;

const Title = styled.span`
  color: ${Color.NEUTRAL_900};
  ${Typography.SUBHEAD_3};
`;

const Description = styled.span`
  color: ${Color.NEUTRAL_700};
  ${Typography.BODY_3};
`;

const CancelButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;
