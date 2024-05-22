import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonType, DropdownSelect, InputType, Modal, TextInput } from "ui/components";
import { type User, type PartialUser } from "@/core/interface";
import { UserShape } from "@/view/components/users";
import { useValidation } from "@/view/hooks";

interface Props {
  user?: User;
  onDismiss: () => void;
  onCreate?: (user: PartialUser) => Promise<void>;
  onSave?: (userId: string, user: PartialUser) => Promise<void>;
}

export const UserModal: React.FunctionComponent<Props> = ({
  user,
  onDismiss,
  onSave,
  onCreate,
}) => {
  const navigate = useNavigate();
  const { validate, errors: validationError } = useValidation(UserShape);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    password: "",
    confirmPassword: "",
    city: user?.city ?? "",
    country: user?.country ?? "",
    organization: user?.organization ?? "",
    userRole: user?.userRole ?? "",
    isVerified: user?.isVerified ?? false,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    country: "",
  });

  const handleUpdate = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    validate(
      {
        ...formData,
        [name]: value,
      },
      (_validated) => null
    );
  };

  const checkFormErrors = (name: string) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError[name],
    }));
  };

  const editMode = !!user;
  const { isVerified, ...formDataWithoutIsVerified } = formData;
  const { password, confirmPassword, ...edittedFormData } = formDataWithoutIsVerified;
  const canSubmit =
    Object.values(formErrors).every((error) => !error) &&
    Object.values(formDataWithoutIsVerified).every((value) => Boolean(value));
  const canSave =
    Object.values(formErrors).every((error) => !error) &&
    Object.values(edittedFormData).every((value) => Boolean(value));

  const saveUser = async () => {
    setLoading(true);
    validate({ ...formData }, () => undefined);
    if (canSave && user && onSave) {
      await onSave(user.userId, { isVerified, ...edittedFormData });
      setLoading(false);
    } else if (canSubmit && !user && onCreate) {
      await onCreate({ ...formData });
    }

    if (editMode) {
      navigate(0);
    }
    setLoading(false);
    onDismiss();
  };

  return (
    <Modal
      title={editMode ? "Edit User" : "Create User"}
      description={"Fill out all the necessary fields"}
      onDismiss={onDismiss}
    >
      <Content>
        <TextInput
          label="Email"
          value={formData.email}
          onChange={(event) => handleUpdate("email", event)}
          disabled={loading}
          error={formErrors.email}
          onBlur={() => checkFormErrors("email")}
          onFocus={() => {
            setFormErrors((prevErrors) => ({
              ...prevErrors,
              ["email"]: "",
            }));
          }}
        />
        {!editMode && (
          <Row>
            <TextInput
              label="Password"
              value={formData.password}
              onChange={(event) => handleUpdate("password", event)}
              disabled={loading}
              type={InputType.PASSWORD}
              error={formErrors.password}
              onBlur={() => checkFormErrors("password")}
              onFocus={() => {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  ["password"]: "",
                }));
              }}
            />
            <TextInput
              label="Confirm password"
              value={formData.confirmPassword}
              onChange={(event) => handleUpdate("confirmPassword", event)}
              disabled={loading}
              type={InputType.PASSWORD}
              error={formErrors.confirmPassword}
              onBlur={() => checkFormErrors("confirmPassword")}
              onFocus={() => {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  ["confirmPassword"]: "",
                }));
              }}
            />
          </Row>
        )}
        <Row>
          <TextInput
            label="First Name"
            value={formData.firstName}
            onChange={(event) => handleUpdate("firstName", event)}
            disabled={loading}
            error={formErrors.firstName}
            onBlur={() => checkFormErrors("firstName")}
            onFocus={() => {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                ["firstName"]: "",
              }));
            }}
          />
          <TextInput
            label="Last Name"
            value={formData.lastName}
            onChange={(event) => handleUpdate("lastName", event)}
            // disabled={loading}
            error={formErrors.lastName}
            onBlur={() => checkFormErrors("lastName")}
            onFocus={() => {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                ["lastName"]: "",
              }));
            }}
          />
        </Row>
        <Row>
          <TextInput
            label="City"
            value={formData.city}
            onChange={(event) => handleUpdate("city", event)}
            disabled={loading}
            error={formErrors.city}
            onBlur={() => checkFormErrors("city")}
            onFocus={() => {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                ["city"]: "",
              }));
            }}
          />
          <TextInput
            label="Country"
            value={formData.country}
            onChange={(event) => handleUpdate("country", event)}
            disabled={loading}
            error={formErrors.country}
            onBlur={() => checkFormErrors("country")}
            onFocus={() => {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                ["country"]: "",
              }));
            }}
          />
        </Row>
        <Row>
          <DropdownSelect
            label="Organization"
            placeholder="Select organization"
            options={["Deaglo"]}
            selected={formData.organization}
            onSelect={(value) => handleUpdate("organization", value)}
          />
          <DropdownSelect
            label="User Role"
            placeholder="Select user role"
            options={["Provider", "Free Member", "Premium Member", "Admin", "Deaglo Admin"]}
            selected={formData.userRole}
            onSelect={(value) => handleUpdate("userRole", value)}
          />
        </Row>
        <Row reverse>
          <Button
            label={editMode ? "Save" : "Create User"}
            disabled={loading || editMode ? !canSave : !canSubmit}
            onClick={() => void saveUser()}
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
  margin-top: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
