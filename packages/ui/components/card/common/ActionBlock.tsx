import React from "react";
import styled from "styled-components";
import {
  CardIcon,
  CardIconColor,
  IconButton,
  ProgressRing,
  type IconName,
} from "../../../components";
import { Color, Typography } from "../../../styles";

interface Props {
  title: string;
  description: string;
  icon?: IconName;
  tasks: number;
  completed: number;
  onDismiss?: () => void;
}

export const ActionBlock: React.FunctionComponent<Props> = ({
  title,
  description,
  icon = "info",
  tasks,
  completed,
  onDismiss,
}) => {
  return (
    <Container complete={completed >= tasks}>
      <Content>
        <CardIcon
          icon={completed < tasks ? icon : "circle-check"}
          color={completed < tasks ? CardIconColor.BRAND_300 : CardIconColor.SUCCESS_200}
        />
        <Column>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Column>
      </Content>
      {completed >= tasks ? (
        onDismiss && (
          <IconButton name="x" color={Color.NEUTRAL_900} onClick={onDismiss} hoverable={false} />
        )
      ) : (
        <Row>
          <ProgressRing progress={completed / tasks} />
          {completed} of {tasks} tasks completed
        </Row>
      )}
    </Container>
  );
};

const Container = styled.div<{ complete: boolean }>`
  width: 100%;
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  gap: 16px;
  background-color: ${(props) => (props.complete ? Color.SUCCESS_100 : Color.BRAND_100)};
  border-radius: 4px;
`;

const Content = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  width: min-content;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  color: ${Color.NEUTRAL_900};
  ${Typography.BODY_3};
`;

const Title = styled.span`
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.LABEL_4};
  color: ${Color.NEUTRAL_700};
`;
