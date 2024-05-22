import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonType, Modal, TextInput } from "ui/components";
import { type Organization, type PartialOrganization } from "@/core/interface";
import { OrganizationShape } from "@/view/components/organizations";
import { useValidation } from "@/view/hooks";

interface Props {
  organization?: Organization;
  onDismiss: () => void;
  onCreate?: (organization: PartialOrganization) => Promise<void>;
  onSave?: (organizationId: string, organization: PartialOrganization) => Promise<void>;
}

export const OrganizationModal: React.FunctionComponent<Props> = ({
  organization,
  onDismiss,
  onSave,
  onCreate,
}) => {
  const navigate = useNavigate();
  const { validate, errors } = useValidation(OrganizationShape);
  const [name, setName] = useState<string>(organization?.name ?? "");
  const handleNameChange = (newName: string) => {
    setName(newName);
    validate({ name: newName }, () => undefined);
  };

  const isNameValid = !errors.name;
  const savable = isNameValid && name;
  const editMode = !!organization;

  const saveOrganization = async () => {
    validate({ name }, () => undefined);
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (savable && organization && onSave) {
      await onSave(organization?.organizationId ?? "", { name });
    } else if (savable && !organization && onCreate) {
      await onCreate({ name });
    }

    if (editMode) {
      navigate(0);
    }
    onDismiss();
  };

  return (
    <Modal
      title={editMode ? "Edit Organization" : "Create Organization"}
      description={"Fill out all the necessary fields"}
      onDismiss={onDismiss}
    >
      <Content>
        <TextContainer>
          <TextInput
            label="Name"
            placeholder="Organization Name"
            value={name}
            onChange={handleNameChange}
            error={errors.name}
          />
        </TextContainer>
        <Row reverse>
          <Button
            label={editMode ? "Save" : "Create Organization"}
            disabled={!savable}
            onClick={() => void saveOrganization()}
            resizeMode="fit"
          />
          <Button label={"Cancel"} onClick={onDismiss} type={ButtonType.OUTLINE} resizeMode="fit" />
        </Row>
      </Content>
    </Modal>
  );
};

const Row = styled.div<{ reverse?: boolean }>`
  display: flex;
  align-items: start;
  gap: 24px;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  margin-top: 36px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextContainer = styled.div`
  margin-bottom: 12px;
`;
