import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, InputType, TextInput, SmallButton } from "ui/components";
import { Color, Typography } from "ui/styles";
import { useAuthToken, useValidation } from "@/view/hooks";
import { SigninShape } from "./validation";

export const Login: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { loading, errors, signin } = useAuthToken();
  const { validate, errors: validationError } = useValidation(SigninShape);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
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

  const canSubmit =
    Object.values(formErrors).every((error) => !error) &&
    Object.values(formData).every((value) => Boolean(value));

  return (
    <>
      <Container>
        <Title>Sign In</Title>
        <TextInput
          label="Username"
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
        <Button
          label="Sign In"
          loading={loading}
          onClick={() => void signin(formData)}
          disabled={!canSubmit}
        />
        <SmallButton
          label="forgot password"
          onClick={() => {
            navigate("/forgot-password");
          }}
        />
        <Error visible={!!errors.signin}>{errors.signin}</Error>
      </Container>
    </>
  );
};

const Title = styled.span`
  ${Typography.HEADER_1};
  color: ${Color.NEUTRAL_900};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  width: 400px;
`;

const Error = styled.span<{ visible: boolean }>`
  color: ${Color.DANGER_700};
  ${Typography.BODY_3};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: 16px;
  transition: 0.15s ease opacity;
`;
