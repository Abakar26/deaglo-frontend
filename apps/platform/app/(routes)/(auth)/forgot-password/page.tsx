"use client";

import { useAuthInteractor } from "@/app/hooks/useAuthInteractor";
import { useValidation } from "@/app/hooks/useValidation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { Button, ButtonSize, InputType, SmallButton, TextInput } from "ui/components";
import { Color, Typography } from "ui/styles";
import { ForgotPasswordShape } from "./validation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    code: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
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

  const { loading, forgotPassword, errors } = useAuthInteractor();

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
        router.push("/sign-in?status=success");
      }
    }
  };

  return (
    <>
      <TitleSection>
        <Title>{otpSent ? "Reset password" : "Forgot your password?"}</Title>
        <Description>
          {otpSent
            ? "We sent a code to your email. Enter it below, as well as the new password you would like to use."
            : "Enter your email address below and we will send you password reset instructions."}
        </Description>
      </TitleSection>
      <InputSection>
        {otpSent ? (
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
            <TextInput
              label="Confirm New password"
              value={formData.confirmNewPassword}
              onChange={(event) => handleUpdate("confirmNewPassword", event)}
              disabled={loading}
              type={InputType.PASSWORD}
              error={formErrors.confirmNewPassword}
              onBlur={() => checkFormErrors("confirmNewPassword")}
              onFocus={() => {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  ["confirmNewPassword"]: "",
                }));
              }}
            />
          </>
        ) : (
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
        )}
      </InputSection>

      <ActionSection>
        <Button
          label={otpSent ? "Change password" : "Get reset instructions"}
          loading={loading}
          onClick={() => void handleSubmit()}
          disabled={!canSubmit}
          size={ButtonSize.LARGE}
        />
        {!otpSent && (
          <SmallButton
            label="Return to login"
            size={ButtonSize.LARGE}
            onClick={() => void handleSubmit()}
            disabled={!canSubmit}
          />
        )}
      </ActionSection>
      <Error visible={!!errors.verify}>{errors.verify}</Error>
    </>
  );
}

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.span`
  ${Typography.HEADER_1};
  color: ${Color.NEUTRAL_900};
`;

const Description = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Error = styled.span<{ visible: boolean }>`
  color: ${Color.DANGER_700};
  ${Typography.BODY_3};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: 16px;
  transition: 0.15s ease opacity;
`;
