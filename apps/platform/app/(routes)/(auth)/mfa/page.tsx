"use client";

import { useAuthInteractor } from "@/app/hooks/useAuthInteractor";
import { AuthInteractor } from "@/app/interactors";
import { useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, TextInput } from "ui/components";
import { Color, Typography } from "ui/styles";

export default function MFA() {
  const [code, setCode] = useState<string>("");

  const { loading, errors, verifyOTP } = useAuthInteractor();

  return (
    <Container>
      <Title>Verify Email</Title>
      <TextInput label="Verification Code" value={code} onChange={setCode} disabled={loading} />
      <Column>
        <Button
          label={"Resend Code"}
          onClick={() => void AuthInteractor.getOTP()}
          type={ButtonType.OUTLINE}
        />
        <Button
          label="Sign In"
          loading={loading}
          onClick={() => void verifyOTP(code)}
          disabled={!code}
        />
      </Column>

      <Error visible={!!errors.verify}>{errors.verify}</Error>
    </Container>
  );
}

const Title = styled.span`
  ${Typography.HEADER_1};
  color: ${Color.NEUTRAL_900};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
