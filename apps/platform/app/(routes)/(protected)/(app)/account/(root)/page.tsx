"use client";

import { useAuthInteractor } from "@/app/hooks";
import { AuthInteractor } from "@/app/interactors";
import { COMPANY_TYPES, type CompanyType, type User } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
  ContentIconColor,
  DropdownSelect,
  Modal,
  PhoneInput,
  SmallButton,
  SmallButtonVariant,
  SnackbarLevel,
  SuspenseBlock,
  TextInput,
} from "ui/components";
import { Color, Typography } from "ui/styles";

export default function AccountPage() {
  const { generateSignInURL } = useAuthInteractor();
  const [user, setUser] = useState<Partial<User>>();
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const router = useRouter();
  const { setSnack } = useSnackbarStore();

  const handleSignIn = async () => {
    await generateSignInURL("link");
  };

  const changePassword = async () => {
    await AuthInteractor.getOTP();
    router.push("/change-password");
  };

  useEffect(() => {
    (async () => {
      await handleSignIn();
      const [response, error] = await AuthInteractor.getUser();

      if (error) {
        console.error(error);
      }

      if (response) {
        setUser(response);
      }
    })().catch((err) => console.error(err));
    // eslint-disable-next-line
  }, []);

  const save = () => {
    if (!user) return;
    AuthInteractor.updateUser(user)
      .then(() => {
        router.refresh();
        setSnack({
          message: "User updated successfully",
          level: SnackbarLevel.SUCCESS,
          icon: "circle-check",
          duration: 5,
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setSnack({
          message: "Couldn't update user",
          level: SnackbarLevel.ERROR,
          icon: "x",
          duration: 5,
        });
      });
  };

  const deleteAccount = () => {
    if (!user) return;
    AuthInteractor.deleteUser()
      .then(() => {
        router.refresh();
        router.replace("/sign-in");
        setSnack({
          message: "User deleted successfully",
          level: SnackbarLevel.SUCCESS,
          icon: "circle-check",
          duration: 5,
        });
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setSnack({
          message: "Couldn't delete user",
          level: SnackbarLevel.ERROR,
          icon: "x",
          duration: 5,
        });
      });
  };

  return (
    <Container>
      {/* <ProfilePictureUpload profileInitials={profileInitials} /> */}
      <Card>
        <Column>
          <Title>Personal Information</Title>
          {user ? (
            <>
              <Row>
                <TextInput
                  label="First Name"
                  value={user?.firstName ?? ""}
                  onChange={(firstName) => {
                    setUser((prev) => ({ ...prev, firstName }));
                  }}
                />
                <TextInput
                  label="Last Name"
                  value={user?.lastName ?? ""}
                  onChange={(lastName) => {
                    setUser((prev) => ({ ...prev, lastName }));
                  }}
                />
              </Row>
              <Row>
                <TextInput
                  label="Business email"
                  value={user?.email ?? ""}
                  onChange={(email) => {
                    setUser((prev) => ({ ...prev, email }));
                  }}
                />
                <PhoneInput
                  label="Phone number"
                  value={user?.phoneNumber ?? ""}
                  onChange={(phoneNumber) => {
                    setUser((prev) => ({ ...prev, phoneNumber }));
                  }}
                />
              </Row>
              <Row>
                <TextInput
                  label="City"
                  value={user?.city ?? ""}
                  onChange={(city) => {
                    setUser((prev) => ({ ...prev, city }));
                  }}
                />
                <TextInput
                  label="State"
                  value={user?.state ?? ""}
                  onChange={(state) => {
                    setUser((prev) => ({ ...prev, state }));
                  }}
                />
                <TextInput
                  label="ZIP Code"
                  value={user?.zipCode ?? ""}
                  onChange={(zipCode) => {
                    setUser((prev) => ({ ...prev, zipCode }));
                  }}
                />
              </Row>
              <TextInput
                label="Country"
                value={user?.country ?? ""}
                onChange={(country) => {
                  setUser((prev) => ({ ...prev, country }));
                }}
              />
              <Row>
                <TextInput
                  label="Company"
                  value={user?.company ?? ""}
                  onChange={(company) => {
                    setUser((prev) => ({ ...prev, company }));
                  }}
                />
                <TextInput
                  label="Job title"
                  value={user?.jobTitle ?? ""}
                  onChange={(jobTitle) => {
                    setUser((prev) => ({ ...prev, jobTitle }));
                  }}
                />
              </Row>
              <Row>
                <DropdownSelect
                  label={"Company Type"}
                  selected={COMPANY_TYPES.find(({ key }) => key === String(user.companyType))}
                  options={COMPANY_TYPES}
                  onSelect={({ key }) =>
                    setUser((user) => ({ ...user, companyType: key as CompanyType }))
                  }
                />
              </Row>
            </>
          ) : (
            _.times(6, (i) => <SuspenseBlock height="48px" key={i} />)
          )}
          <Button label={"Save"} onClick={save} resizeMode="fit" />
        </Column>
      </Card>
      <Card>
        <Column>
          <Title>Account management</Title>
          <ButtonContainer>
            <Button label="Change Password" onClick={() => void changePassword()} />
            <SmallButton
              size={ButtonSize.LARGE}
              variant={SmallButtonVariant.DANGER}
              label="Delete account"
              onClick={() => setShowDeleteAccountModal(true)}
            />
          </ButtonContainer>
        </Column>
      </Card>
      {showDeleteAccountModal && (
        <Modal
          icon={{
            color: ContentIconColor.DANGER_100,
            icon: "trash",
          }}
          onDismiss={() => setShowDeleteAccountModal(false)}
          title={`Are you sure to delete your account?`}
          description="There's no going back."
        >
          <ModalButtonsContainer>
            <Button
              label="Cancel"
              type={ButtonType.OUTLINE}
              onClick={() => setShowDeleteAccountModal(false)}
              resizeMode="fit"
            />
            <Button
              variant={ButtonVariant.DANGER}
              label="Delete"
              onClick={() => void deleteAccount()}
              resizeMode="fit"
            />
          </ModalButtonsContainer>
        </Modal>
      )}
    </Container>
  );
}

const ModalButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  max-width: 320px;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const Row = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
`;

const Title = styled.div`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;
