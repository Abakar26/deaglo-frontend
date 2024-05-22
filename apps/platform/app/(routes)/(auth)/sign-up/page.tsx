"use client";

import { useAuthInteractor } from "@/app/hooks/useAuthInteractor";
import { useValidation } from "@/app/hooks/useValidation";
import { COMPANY_TYPES } from "@/app/interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import {
  Button,
  ButtonSize,
  ButtonType,
  Checkbox,
  DropdownSelect,
  Icon,
  InputType,
  PhoneInput,
  SmallButton,
  Stepper,
  TextInput,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import { SignupShape } from "./validation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Step 1 - Account informaiton
    email: "",
    password: "",
    confirmPassword: "",

    // Step 2 - Personal information
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    company: "",
    jobTitle: "",
    companyType: "",
    acceptedToS: false,
  });

  const [formErrors, setFormErrors] = useState({
    // Step 1 - Account information
    email: "",
    password: "",
    confirmPassword: "",

    // Step 2 - Personal information
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    company: "",
    jobTitle: "",
    companyType: "",

    acceptedToS: false,
  });

  const { validate, errors: validationError } = useValidation(SignupShape);
  const [step, setStep] = useState(0);

  const canContinue = !formErrors.email && !formErrors.password && !formErrors.confirmPassword;

  const canSubmit =
    Object.values(formErrors).every((error) => !error) &&
    Object.entries(formData).every(([key, value]) => {
      return key === "state" || Boolean(value);
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

  const { loading, errors, signup } = useAuthInteractor();

  const displayErrors = () => {
    const error = errors.signup;
    if (typeof error === "string" && error.startsWith("[")) {
      const formatToArray = error.replace(/[\[\]']/g, "");
      const errorArray = formatToArray.split(", ");
      return errorArray;
    } else {
      return [errors.signup];
    }
  };

  const steps = [
    {
      complete: step > 0,
      key: "account-information",
      label: "Account information",
    },
    {
      complete: step === 1 && loading,
      key: "personal-information",
      label: "Personal information",
    },
  ];

  return (
    <PageContainer>
      <Header>
        <LogoWrapper>
          <Icon name="deaglo" />
        </LogoWrapper>
        <Stepper current={steps[step]!.key} steps={steps} onSelect={() => null} />
      </Header>
      <FormContainer>
        <TitleSection>
          <Title>{step === 0 ? "Account information" : "Personal information"}</Title>
          <Description>
            {step === 0
              ? "Please enter email and password to create a new account."
              : "Tell us a bit more about yourself."}
          </Description>
        </TitleSection>

        <InputSection>
          {step === 0 && (
            <>
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
            </>
          )}
          {step === 1 && (
            <>
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
                  disabled={loading}
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
              <PhoneInput
                label="Phone number"
                value={formData.phoneNumber}
                onChange={(event) => handleUpdate("phoneNumber", event)}
                disabled={loading}
                error={formErrors.phoneNumber}
                onBlur={() => checkFormErrors("phoneNumber")}
                onFocus={() => {
                  setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    ["phoneNumber"]: "",
                  }));
                }}
              />
              <Row>
                <TextInput
                  label="Company"
                  value={formData.company}
                  onChange={(event) => handleUpdate("company", event)}
                  disabled={loading}
                  error={formErrors.company}
                  onBlur={() => checkFormErrors("company")}
                  onFocus={() => {
                    setFormErrors((prevErrors) => ({
                      ...prevErrors,
                      ["company"]: "",
                    }));
                  }}
                />
                <TextInput
                  label="Job Title"
                  value={formData.jobTitle}
                  onChange={(event) => handleUpdate("jobTitle", event)}
                  disabled={loading}
                  error={formErrors.jobTitle}
                  onBlur={() => checkFormErrors("jobTitle")}
                  onFocus={() => {
                    setFormErrors((prevErrors) => ({
                      ...prevErrors,
                      ["jobTitle"]: "",
                    }));
                  }}
                />
              </Row>
              <DropdownSelect
                label={"Company Type"}
                selected={COMPANY_TYPES.find(({ key }) => key === String(formData.companyType))}
                onSelect={(event) => handleUpdate("companyType", event.key)}
                disabled={loading}
                error={formErrors.companyType}
                options={COMPANY_TYPES}
              />
              <SectionHeading>Residential Address</SectionHeading>
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
                  label="State/Province (optional)"
                  value={formData.state}
                  onChange={(event) => handleUpdate("state", event)}
                  disabled={loading}
                  error={formErrors.state}
                  onBlur={() => checkFormErrors("state")}
                  onFocus={() => {
                    setFormErrors((prevErrors) => ({
                      ...prevErrors,
                      ["state"]: "",
                    }));
                  }}
                />
                <TextInput
                  label="Zip/Postal code"
                  value={formData.zipCode}
                  onChange={(event) => handleUpdate("zipCode", event)}
                  disabled={loading}
                  error={formErrors.zipCode}
                  onBlur={() => checkFormErrors("zipCode")}
                  onFocus={() => {
                    setFormErrors((prevErrors) => ({
                      ...prevErrors,
                      ["zipCode"]: "",
                    }));
                  }}
                />
              </Row>
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
              <Row>
                <Checkbox
                  active={formData.acceptedToS}
                  onClick={() =>
                    setFormData((prevData) => ({ ...prevData, acceptedToS: !prevData.acceptedToS }))
                  }
                  disabled={loading}
                />
                <TermsOfServiceCopy>
                  I have read and agree to the{" "}
                  <Link href="https://deaglo.com/terms" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </Link>
                  .
                </TermsOfServiceCopy>
              </Row>
            </>
          )}
        </InputSection>

        {step === 0 && (
          <NextButtonWrapper>
            <Button
              label="Next"
              onClick={() => setStep((currentStep) => currentStep + 1)}
              size={ButtonSize.LARGE}
              disabled={!canContinue}
            />
          </NextButtonWrapper>
        )}
        {step === 1 && (
          <ButtonGroup>
            <Button
              label="Back"
              onClick={() => setStep((currentStep) => currentStep - 1)}
              disabled={loading}
              size={ButtonSize.LARGE}
              type={ButtonType.OUTLINE}
            />
            <Button
              label="Sign Up"
              loading={loading}
              onClick={() => void signup(formData)}
              disabled={!canSubmit}
              size={ButtonSize.LARGE}
            />
          </ButtonGroup>
        )}
        <Error visible={!!errors.signup}>
          {displayErrors().map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Error>
        <SignInRow>
          <SignInCopy>Already have an account?</SignInCopy>
          <SmallButton
            label="Log in."
            onClick={() => {
              router.push("/sign-in");
            }}
            size={ButtonSize.LARGE}
          />
        </SignInRow>
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${Color.NEUTRAL_00};
  position: relative;
  padding: 120px 0 40px 0;
`;

const Header = styled.header`
  width: 100vw;
  border-bottom: 2px solid ${Color.NEUTRAL_150};
  height: 80px;
  flex: 1;
  top: 0;
  position: fixed;
  background: ${Color.NEUTRAL_00};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  z-index: 999;
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 32px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 680px;
  height: 100%;
`;

const TitleSection = styled.div`
  width: 100%;
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
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const SectionHeading = styled.div`
  ${Typography.SUBHEAD_2}
  color: ${Color.NEUTRAL_700};
`;

const NextButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
  margin-left: auto;

  & > * {
    width: 100px;
  }
`;

const TermsOfServiceCopy = styled.div`
  ${Typography.BODY_1};

  & > a,
  & > a:visited {
    text-decoration: none;
    color: ${Color.BRAND_800};
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: flex - end;
  justify-content: center;
  gap: 20px;
  margin-left: auto;
  margin-right: 70px;
`;

const SignInRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  margin-top: -80px;
  text-align: left;
`;

const SignInCopy = styled.div`
  ${Typography.SUBHEAD_3}
`;

const Error = styled.span<{ visible: boolean }>`
  color: ${Color.DANGER_700};
  ${Typography.BODY_3};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  height: 16px;
  transition: 0.15s ease opacity;
`;
