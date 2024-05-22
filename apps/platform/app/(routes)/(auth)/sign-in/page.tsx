"use client";

import { useAuthInteractor } from "@/app/hooks/useAuthInteractor";
import { useValidation } from "@/app/hooks/useValidation";
import { useSnackbarStore } from "@/app/store";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonSize,
  InputType,
  SmallButton,
  SnackbarLevel,
  TextInput,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { SigninShape } from "./validation";

function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const { validate, errors: validationError } = useValidation(SigninShape);
  const { setSnack } = useSnackbarStore();

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

  useEffect(() => {
    if (status) {
      setSnack({
        message: "Password was reset successfully",
        icon: "circle-check",
        level: SnackbarLevel.SUCCESS,
        duration: 5,
      });
    }
  }, [status, setSnack]);

  const { loading, errors, signin } = useAuthInteractor();

  const canSubmit =
    Object.values(formErrors).every((error) => !error) &&
    Object.values(formData).every((value) => Boolean(value));

  return (
    <>
      <TitleSection>
        <Title>Welcome back!</Title>
        <Description>
          Please enter your credentials to access your account and continue where you left off.
        </Description>
        <Container>
          <Item>item 1</Item>
          <Item>item 2</Item>
          <Item>item 3</Item>
          <Item>item 4</Item>
        </Container>
      </TitleSection>
      <InputSection>
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
        <ForgotPasswordContainer>
          <SmallButton
            label="Forgot password?"
            onClick={() => {
              router.push("/forgot-password");
            }}
            size={ButtonSize.LARGE}
          />
        </ForgotPasswordContainer>
      </InputSection>

      <ActionSection>
        <Button
          label="Log In"
          loading={loading}
          onClick={() => void signin(formData)}
          disabled={!canSubmit}
          size={ButtonSize.LARGE}
        />
        <SignUpRow>
          <SignUpCopy>Don't have an account?</SignUpCopy>
          <SmallButton
            label="Sign up."
            onClick={() => {
              router.push("/sign-up");
            }}
            size={ButtonSize.LARGE}
          />
        </SignUpRow>
      </ActionSection>
      <Error visible={!!errors.signin}>{errors.signin}</Error>
    </>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
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

const ForgotPasswordContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: -16px;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SignUpRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const SignUpCopy = styled.div`
  ${Typography.SUBHEAD_3}
`;

const Error = styled.span<{ visible: boolean }>`
  color: ${Color.DANGER_700};
  ${Typography.BODY_3};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: 16px;
  transition: 0.15s ease opacity;
`;

const Container = styled.div`
  display: flex;

`;

const Item = styled.div`
  padding: 10px;
  flex-grow: 1;
  flex-basis: 200px;
`;
