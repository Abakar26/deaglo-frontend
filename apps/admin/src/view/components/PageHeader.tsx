import React from "react";
import styled from "styled-components";
import { Color, Typography } from "ui/styles";
import { SuspenseBlock } from "ui/components";

export interface PageHeaderProps {
  page?: string;
  user: {
    onClick: () => void;
    profile: string;
    logo: string;
  };
}

export const PageHeader: React.FunctionComponent<PageHeaderProps> = ({ page = "Page", user }) => {
  return (
    <Container>
      <TitleSection>
        <Row margin={!page}>{page ? page : <SuspenseBlock height="36px" width="250px" />}</Row>
      </TitleSection>
      <UserSection>
        <SignOutButton onClick={user.onClick}>
          <Logo src={user.logo} aria-label="User logo" />
          <Profile src={user.profile} aria-label="User profile" />
        </SignOutButton>
      </UserSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  width: 100%;
`;

const TitleSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 2px;
`;

const Row = styled.div<{ margin: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: ${(props) => (props.margin ? "8px" : 0)};
  ${Typography.HEADER_1};
  color: ${Color.NEUTRAL_900};
  text-transform: capitalize;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16px;
`;

const SignOutButton = styled.button`
  outline: none;
  background-color: ${Color.NEUTRAL_00};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 12px;
  padding-right: 8px;
  height: 56px;
  min-width: max-content;
  border-radius: 4px;
  border: 1px solid ${Color.NEUTRAL_300};
  &:hover {
    background-color: ${Color.NEUTRAL_300};
  }
  transition: 0.3s ease background-color;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  max-height: 24px;
`;

const Profile = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border: 1px solid ${Color.NEUTRAL_300};
  object-fit: cover;
`;
