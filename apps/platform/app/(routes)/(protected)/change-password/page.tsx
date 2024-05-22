"use client";
import { AuthInteractor } from "@/app/interactors";
import type { ChangePasswordRequest } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { Button, InputType, SnackbarLevel, TextInput } from "ui/components";
import { Color, Typography } from "ui/styles";

function ChangePassword() {
  const [passwordData, setPasswordData] = useState<ChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const { setSnack } = useSnackbarStore();

  const handleChangePassword = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New password and confirm password do not match");
      }
      const [reply, error] = await AuthInteractor.changeUserPassword(passwordData);
      if (reply) {
        setSnack({
          message: "Password changed successfully",
          level: SnackbarLevel.SUCCESS,
          duration: 5,
          icon: "circle-check",
        });
        document.cookie = "ACCESS_TOKEN=; path=/;";
        router.push("/");
      }
      if (error) {
        setError(error);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.message);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Change Password</Title>
        <TextInput
          label="Old password"
          value={passwordData.oldPassword}
          type={InputType.PASSWORD}
          onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e })}
        />
        <TextInput
          label="New password"
          value={passwordData.newPassword}
          type={InputType.PASSWORD}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e })}
        />
        <TextInput
          label="Confirm password"
          value={passwordData.confirmPassword}
          type={InputType.PASSWORD}
          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e })}
        />
        <Button label="Change Password" onClick={() => void handleChangePassword()} />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Card>
    </Container>
  );
}

export default ChangePassword;

const Title = styled.span`
  ${Typography.HEADER_1};
  color: ${Color.NEUTRAL_900};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  padding: 8rem;
  margin: 0 auto;
  max-width: 800px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 50px;
  background: white;
  border: 10px;
  border-radius: 5px;
`;
