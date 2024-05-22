import React, { useState } from "react";
import styled from "styled-components";
import { Button, IconButton } from "ui/components";
import { Color, Typography } from "ui/styles";
import { Card } from "ui/components/card/common";
import { useOrganizationStore } from "@/core/store";
import { type Organization } from "@/core/interface";
import { OrganizationConfirmationModal } from "./modals";

interface Props {
  organization: Organization;
  selected?: boolean;
}

export const OrganizationCard: React.FunctionComponent<Props> = ({ organization, selected }) => {
  const [open, setOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { setCreateOrganization } = useOrganizationStore();

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
            <Name>{organization.name}</Name>
          </Row>
        </NameSection>
        <ButtonSection>
          <Button
            label={"Edit"}
            resizeMode={"fit"}
            onClick={() => setCreateOrganization(true, organization)}
          />
          <Button
            label={"Delete"}
            resizeMode={"fit"}
            disabled={organization.isDeleted}
            onClick={() => setShowConfirmationModal(true)}
          />
        </ButtonSection>
      </Row>
      {open && <DetailSection>Details</DetailSection>}
      {showConfirmationModal && (
        <OrganizationConfirmationModal
          onDismiss={() => setShowConfirmationModal(false)}
          organizationId={organization.organizationId}
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
