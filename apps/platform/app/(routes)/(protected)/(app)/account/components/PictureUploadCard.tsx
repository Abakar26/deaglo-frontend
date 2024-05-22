import { useSnackbarStore } from "@/app/store";
import Image from "next/image";
import type { ChangeEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Icon, SnackbarLevel } from "ui/components";
import { Color, Typography } from "ui/styles";

interface Props {
  profileInitials: string;
}

export default function ProfilePictureUpload({ profileInitials }: Props) {
  const [profileImage, setProfileImage] = useState<string>("");
  const { setSnack } = useSnackbarStore();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setSnack({
          message: "Please select an image file.",
          level: SnackbarLevel.ERROR,
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const target = e.target!;
        setProfileImage(target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("");
  };

  return (
    <Card>
      <Row>
        <Title>Picture</Title>
      </Row>
      <Row>
        <ProfileImageContainer>
          {profileImage ? (
            <Image
              width={100}
              height={100}
              src={profileImage}
              alt="Profile"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <Initials aria-label="User initials">{profileInitials}</Initials>
          )}
          <FileInput
            type="file"
            id="profileImageInput"
            accept="image/*"
            onChange={handleImageChange}
          />
          <CameraIconOverlay onClick={() => document.getElementById("profileImageInput")?.click()}>
            <Icon name="upload" color={Color.NEUTRAL_00} />
          </CameraIconOverlay>
        </ProfileImageContainer>
        {profileImage && <RemoveLink onClick={handleRemoveImage}>Remove</RemoveLink>}
      </Row>
    </Card>
  );
}

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
  align-items: center;
`;

const Title = styled.div`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CameraIconOverlay = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const RemoveLink = styled.a`
  ${Typography.BODY_2};
  color: ${Color.NEUTRAL_800};
  text-decoration: underline;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const Initials = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.TEAL_700};
  color: ${Color.NEUTRAL_100};
  font-size: 52px;
  padding: 12px;
  font-weight: bold;
`;
