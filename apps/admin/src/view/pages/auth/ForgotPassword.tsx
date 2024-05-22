import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, InputType, TextInput } from "ui/components";
import { Color, Typography } from "ui/styles";
import { ForgotPasswordShape } from "./validation";
import { useAuthToken, useValidation } from "@/view/hooks";
import { RoutePath } from "@/core/router/AppRouter";

export const ForgotPassword: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    code: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    newPassword: "",
    code: "",
    otpError: "",
  });

  const { validate, errors: validationError } = useValidation(ForgotPasswordShape);

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
    (otpSent || Object.values(formErrors).every((error) => !error)) &&
    Object.values(formData).some((value) => Boolean(value));

  const { loading, forgotPassword, errors } = useAuthToken();

  const handleSubmit = async () => {
    if (!otpSent) {
      const codeSent = await forgotPassword({ email: formData.email });
      if (codeSent) {
        setOtpSent(true);
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          ["otpError"]: "Something went wrong, Try again later.",
        }));
      }
    } else if (otpSent) {
      const passwordReset = await forgotPassword(formData);
      if (passwordReset) {
        navigate(RoutePath.LOGIN);
      }
    }
  };

  return (
    <Container>
      <Title>Forgot Password</Title>
      <TextInput
        label="Email"
        value={formData.email}
        onChange={(event) => handleUpdate("email", event)}
        disabled={otpSent}
        error={formErrors.email}
        onBlur={() => checkFormErrors("email")}
        onFocus={() => {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            ["email"]: "",
          }));
        }}
      />
      {otpSent && (
        <>
          <TextInput
            label="Code"
            value={formData.code}
            onChange={(event) => handleUpdate("code", event)}
            disabled={loading}
            error={formErrors.code}
            onBlur={() => checkFormErrors("code")}
            onFocus={() => {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                ["code"]: "",
              }));
            }}
          />
          <TextInput
            label="New password"
            value={formData.newPassword}
            onChange={(event) => handleUpdate("newPassword", event)}
            disabled={loading}
            type={InputType.PASSWORD}
            error={formErrors.newPassword}
            onBlur={() => checkFormErrors("newPassword")}
            onFocus={() => {
              setFormErrors((prevErrors) => ({
                ...prevErrors,
                ["newPassword"]: "",
              }));
            }}
          />
        </>
      )}
      <Button
        label="Forgot Password"
        loading={loading}
        onClick={() => void handleSubmit()}
        disabled={!canSubmit}
      />
      <Error visible={!!errors.verify}>{errors.verify}</Error>
    </Container>
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
