"use client";

import { useAuthInteractor } from "@/app/hooks/useAuthInteractor";
import { AuthInteractor } from "@/app/interactors";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonType, TextInput } from "ui/components";
import { Color, Typography } from "ui/styles";

function MFA() {
  const [otp, setOtp] = useState("");
  const param = useSearchParams();
  const { linkOrDelinkLinkedIn, errors, loading } = useAuthInteractor();
  const [isLinkedinLinked, setIsLinkedinLinked] = useState<boolean>();

  useEffect(() => {
    const handleSignIn = async () => {
      const [isLinked, error] = await AuthInteractor.getLinkedinLink();
      setIsLinkedinLinked(!!isLinked);
    };

    void handleSignIn();
  }, [param]);

  const handleLinkClick = async () => {
    const code = param.get("code");
    if (code) {
      await linkOrDelinkLinkedIn(!isLinkedinLinked, code, otp);
    }
  };

  return (
    <Container>
      <Title>{!isLinkedinLinked ? "Authorize LinkedIn" : "Deauthorize LinkedIn"}</Title>
      <TextInput label="Verification Code" value={otp} onChange={setOtp} disabled={loading} />
      <Row>
        <Button label="Resend Code" onClick={AuthInteractor.getOTP} type={ButtonType.OUTLINE} />
        <Button
          label={!isLinkedinLinked ? "Authorize" : "Deauthorize"}
          loading={loading}
          onClick={handleLinkClick}
          disabled={!otp}
        />
      </Row>
      <Error visible={!!errors.verify}>{errors.verify}</Error>
    </Container>
  );
}

export default function MFAPage() {
  return (
    <Suspense>
      <MFA />
    </Suspense>
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
  transition: 0.3s ease opacity;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
`;
