import React, { useState } from "react";
import styled from "styled-components";
import type { Leg, Strategy } from "..";
import { IconButton } from "../../../components";
import { Color, Typography } from "../../../styles";
import { Card } from "../common";
import { EditStrategyLeg } from "./EditStrategyLeg";

interface Props {
  title: string;
  strategy: Strategy;
  onChange: (id: string, strategy: Strategy) => void;
  onDelete?: () => void;
  errors?: Record<string, string>;
}

export const EditStrategyCard: React.FunctionComponent<Props> = ({
  title,
  strategy,
  onChange,
  onDelete,
  errors,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const handleChange = (index: number) => {
    return (leg: Leg) => {
      leg.id && onChange(leg.id, [...strategy.slice(0, index), leg, ...strategy.slice(index + 1)]);
    };
  };

  return (
    <Card borderColor={Color.NEUTRAL_400}>
      <Row>
        {title}
        <RowSection>
          {!editMode && (
            <IconButton name="pencil" color={Color.NEUTRAL_900} onClick={() => setEditMode(true)} />
          )}
          <IconButton
            name="trash"
            color={Color.NEUTRAL_900}
            onClick={() => onDelete?.()}
            disabled={!onDelete}
          />
        </RowSection>
      </Row>
      <LegSection editMode={editMode}>
        {strategy.map((leg, index) => (
          <>
            <EditStrategyLeg
              key={index}
              onChange={handleChange(index)}
              parameters={leg}
              editMode={editMode}
              errors={errors}
            />
            {index !== strategy.length - 1 && editMode && <Divider />}
          </>
        ))}
      </LegSection>
    </Card>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Typography.SUBHEAD_1}
`;

const RowSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LegSection = styled.div<{ editMode: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.editMode ? "20px" : 0)};
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${Color.NEUTRAL_400};
`;
