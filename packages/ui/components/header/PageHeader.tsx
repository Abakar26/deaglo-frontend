import React, { useState } from "react";
import styled from "styled-components";
import {
  Breadcrumbs,
  Button,
  ButtonSize,
  ButtonType,
  Dropdown,
  Icon,
  IconButton,
  StatusLabel,
  SuspenseBlock,
  useClickOutside,
  type BreadCrumbProps,
  type IconName,
  type MenuProps,
  type Selectable,
  type SimulationStatus,
} from "..";
import { Color, Typography } from "../../styles";

export interface PageHeaderProps {
  page?: string;
  actions: Array<{
    icon: IconName;
    onClick: () => void;
  }>;
  user: {
    onClick: () => void;
    profile?: string;
    logo?: string;
    initials: string;
  };
  breadcrumbs?: BreadCrumbProps;
  saved?: boolean;
  status?: SimulationStatus;
  menu?: MenuProps<Selectable>;
  profileMenu?: MenuProps<Selectable>;
}

export const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
  page,
  actions,
  user,
  breadcrumbs,
  status,
  menu,
  profileMenu,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);

  const ref = useClickOutside(() => setMenuOpen(false));

  const select = (key: Selectable) => {
    setMenuOpen(false);
    menu?.onSelect(key);
  };

  const profileSelect = (key: Selectable) => {
    profileMenu?.onSelect(key);
  };

  return (
    <Container>
      <TitleSection>
        {breadcrumbs && <Breadcrumbs {...breadcrumbs} />}
        <Row margin={!page}>
          {page ? page : <SuspenseBlock height="36px" width="250px" />}
          {status && <StatusLabel status={status} outline />}
          {menu && (
            <ButtonContainer>
              <Button
                leadingIcon="menu"
                type={ButtonType.OUTLINE}
                size={ButtonSize.SMALL}
                disabled={menu.disabled}
                onClick={() => setMenuOpen((prev) => !prev)}
              />
              {menuOpen && (
                <DropdownContainer>
                  <Dropdown options={menu.options ?? []} onSelect={select} />
                </DropdownContainer>
              )}
            </ButtonContainer>
          )}
        </Row>
      </TitleSection>
      <UserSection>
        {actions.map(({ icon, onClick }, index) => {
          return <IconButton key={index} name={icon} onClick={onClick} color={Color.NEUTRAL_900} />;
        })}
        <UserButton
          onClick={() => {
            user.onClick();
            setProfileMenuOpen((prev) => !prev);
          }}
        >
          {user.logo ? (
            <Logo src={user.logo} aria-label="User logo" />
          ) : (
            <CompanyPlaceholder>
              <Icon name="business" color={Color.NEUTRAL_900} size={24} />
              <CompanyName>Company</CompanyName>
            </CompanyPlaceholder>
          )}
          {user.profile ? (
            <Profile src={user.profile} aria-label="User profile" />
          ) : (
            <Initials aria-label="User initials">{user.initials}</Initials>
          )}
          {profileMenu && (
            <DropdownContainer>
              <Dropdown
                visible={profileMenuOpen}
                options={profileMenu.options ?? []}
                onSelect={profileSelect}
              />
            </DropdownContainer>
          )}
        </UserButton>
      </UserSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* height: 64px; */
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

const UserSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16px;
`;

const UserButton = styled.button`
  outline: none;
  background-color: ${Color.NEUTRAL_00};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  height: 56px;
  min-width: max-content;
  border-radius: 4px;
  border: 1px solid ${Color.NEUTRAL_300};
  &:hover {
    background-color: ${Color.NEUTRAL_300};
  }
  transition: 0.3s ease background-color;
  position: relative;
`;

const Initials = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.TEAL_700};
  color: ${Color.NEUTRAL_100};
  font-size: 20px;
  padding: 12px;
  font-weight: bold;
`;

const CompanyPlaceholder = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyName = styled.span`
  padding: 0 4px;
  font-size: ${Typography.BODY_1};
  text-transform: uppercase;
  transition: 0.15s ease background-color;
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  max-height: 24px;
  margin-right: 4px;
`;

const Profile = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border: 1px solid ${Color.NEUTRAL_300};
  object-fit: cover;
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

const ButtonContainer = styled.div`
  width: 34px;
  position: relative;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  /* left: -76px; */
  left: 0;
  width: 100%;
  left: calc();
  z-index: 10000;

  *::-webkit-scrollbar {
    display: none;
  }
`;
