import React, { useState } from "react";
import styled from "styled-components";
import { Button, IconButton } from "ui/components";
import { Color, Typography } from "ui/styles";
import { Card } from "ui/components/card/common";
import { useUserStore } from "@/core/store";
import { type User } from "@/core/interface";
import { UserConfirmationModal } from "./modals";

interface Props {
  user: User;
  selected?: boolean;
}

export const UserCard: React.FunctionComponent<Props> = ({ user, selected }) => {
  const [open, setOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { setCreateUser } = useUserStore();

  return (
    <Card hoverable borderColor={selected ? Color.BRAND_800 : undefined}>
      <Row>
        <NameSection>
          <Row>
            <IconButton
              name={"chevron-down"}
              color={Color.NEUTRAL_900}
              onClick={() => {
                setOpen(!open);
              }}
            />
            <Name>{user.email}</Name>
          </Row>
        </NameSection>
        <ButtonSection>
          <Button label={"Edit"} resizeMode={"fit"} onClick={() => setCreateUser(true, user)} />
          <Button
            label={"Delete"}
            resizeMode={"fit"}
            disabled={user.isDeleted}
            onClick={() => setShowConfirmationModal(true)}
          />
        </ButtonSection>
      </Row>
      {open && <DetailSection>Details</DetailSection>}
      {showConfirmationModal && (
        <UserConfirmationModal
          onDismiss={() => setShowConfirmationModal(false)}
          userId={user.userId}
        />
      )}
    </Card>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${Color.NEUTRAL_900};
  ${Typography.SUBHEAD_3};
`;

const NameSection = styled.div`
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 2px;
`;

const Name = styled.span`
  padding-left: 10px;
`;

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 12px;
`;

const DetailSection = styled.div`
  padding-left: 75px;
`;
