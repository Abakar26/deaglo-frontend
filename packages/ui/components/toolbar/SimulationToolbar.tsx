import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { InsertArea, InsertAreaSize, SmallButton, type IconName } from "..";
import { Color, Typography } from "../../styles";
import { ToolButton } from "./ToolButton";

interface Props {
  simulations: Array<{
    key: string;
    label: string;
    icon: IconName;
  }>;
  onClick: () => void;
  onDelete: (key: string) => void;
  onSelect: (key: string) => void;
  limit?: number;
}

export const SimulationToolbar: React.FunctionComponent<Props> = ({
  simulations,
  onDelete,
  onSelect,
  onClick,
  limit = 3,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<Array<string>>([]);

  const apply = () => {
    deleted.forEach((key) => onDelete(key));
    setDeleted([]);
    setEditMode(false);
  };

  const cancel = () => {
    setDeleted([]);
    setEditMode(false);
  };

  const deleteTool = (key: string) => {
    setDeleted((deleted) => [...deleted, key]);
  };

  return (
    <Container>
      {simulations.length !== 0 ? (
        <ToolContainer>
          <Row>
            Selected Simulations
            {editMode ? (
              <Edit>
                <SmallButton onClick={cancel} label="Cancel" />
                <SmallButton onClick={apply} label="Apply" />
              </Edit>
            ) : (
              <SmallButton onClick={() => setEditMode(true)} leadingIcon="pencil" label="Edit" />
            )}
          </Row>
          {simulations.map((simulation) =>
            deleted.includes(simulation.key) ? (
              <Deleted key={simulation.key}>Simulation removed</Deleted>
            ) : (
              <ToolButton
                {...simulation}
                key={simulation.key}
                onClick={() => onSelect(simulation.key)}
                onDelete={editMode ? () => deleteTool(simulation.key) : undefined}
              />
            )
          )}

          {simulations.length < limit && (
            <InsertArea
              onClick={onClick}
              icon="plus"
              label="Add Simulation Tool"
              size={simulations.length > 0 ? InsertAreaSize.SMALL : InsertAreaSize.LARGE}
            />
          )}
        </ToolContainer>
      ) : (
        <InsertArea icon="customize" label="Customize Toolbar" onClick={onClick} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 480px;
`;

const ToolContainer = styled.div`
  width: calc(100%);
  height: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${Color.NEUTRAL_400};
  background-color: ${Color.NEUTRAL_00};
  gap: 8px;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${Typography.SUBHEAD_2};
  color: ${Color.NEUTRAL_900};
  text-overflow: ellipsis;
`;

const appear = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Deleted = styled.span`
  ${Typography.BODY_1};
  color: ${Color.NEUTRAL_700};
  height: 100%;
  display: flex;
  align-items: center;
  opacity: 1;
  animation: ${appear} 1s ease;
`;
