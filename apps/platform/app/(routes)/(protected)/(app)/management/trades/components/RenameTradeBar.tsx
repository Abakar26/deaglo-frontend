"use client";

import styled from "styled-components";
import { Button, ButtonType } from "ui/components";

type RenameTradeBarProps = {
  onSave: () => void;
  onCancel: () => void;
};

export function RenameTradeBar({ onSave, onCancel }: RenameTradeBarProps) {
  return (
    <Container>
      <Button label="Edit Info" onClick={onSave} resizeMode="fit" />
      <Button type={ButtonType.OUTLINE} label="Cancel" onClick={onCancel} resizeMode="fit" />
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;
