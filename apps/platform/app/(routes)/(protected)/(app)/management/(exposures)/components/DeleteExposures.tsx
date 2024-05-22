"use client";

import { styled } from "styled-components";
import { Button, ButtonType, ContentIconColor, Modal } from "ui/components";
import { type ExposuresType } from "../utilities";

type DeleteExposuresProps = {
  type: ExposuresType;
  onClick: () => void;
  onDismiss: () => void;
};

export function DeleteExposures({ type, onClick, onDismiss }: DeleteExposuresProps) {
  function handleDelete() {
    onClick();
    onDismiss();
  }

  const capitalize = (word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

  return (
    <Modal
      description={`Are you sure you want to delete the selected ${capitalize(type)}?`}
      icon={{ color: ContentIconColor.DANGER_100, icon: "trash" }}
      title={`Delete ${capitalize(type)}`}
      onDismiss={onDismiss}
    >
      <ButtonGroup>
        <Button label="Cancel" type={ButtonType.OUTLINE} onClick={onDismiss} resizeMode="fit" />
        <Button label="Delete" onClick={handleDelete} resizeMode="fit" />
      </ButtonGroup>
    </Modal>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  margin-top: 16px;
`;
