"use client";

import { useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, SmallButton, SmallButtonVariant } from "ui/components";
import { DeleteExposures } from "./DeleteExposures";
import { type ExposuresType } from "../utilities";

type EditExposuresBarProps = {
  type: ExposuresType;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

export function EditExposuresBar({ type, onSave, onCancel, onDelete }: EditExposuresBarProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Container>
        <Button label="Edit Info" resizeMode="fit" onClick={onSave} />
        <Button label="Cancel" resizeMode="fit" type={ButtonType.OUTLINE} onClick={onCancel} />
        <SmallButton
          label="Delete"
          variant={SmallButtonVariant.DANGER}
          onClick={() => setShowModal(true)}
        />
      </Container>

      {showModal ? (
        <DeleteExposures type={type} onClick={onDelete} onDismiss={() => setShowModal(false)} />
      ) : null}
    </>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;
