"use client";

import { AuthInteractor } from "@/app/interactors";
import type { User, UserPreferences, ValueDisplayMode } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, SegmentedControl, SnackbarLevel, SuspenseBlock } from "ui/components";
import { Color, Typography } from "ui/styles";

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>();
  const { setSnack } = useSnackbarStore();

  const save = async () => {
    try {
      if (!preferences) return;
      const [user, error] = await AuthInteractor.updateUser({ preferences } as Partial<User>);

      if (user) {
        setPreferences(user.preferences);
        setSnack({
          message: "Successfully updated preferences.",
          level: SnackbarLevel.SUCCESS,
          icon: "circle-check",
          duration: 5,
        });
      }
      if (error) {
        console.error(error);

        setSnack({
          message: "Couldn't update preferences.",
          level: SnackbarLevel.ERROR,
          icon: "x",
          duration: 5,
        });
      }
    } catch (err) {
      console.error(err);

      setSnack({
        message: "Couldn't update preferences.",
        level: SnackbarLevel.ERROR,
        icon: "x",
        duration: 5,
      });
    }
  };

  useEffect(() => {
    AuthInteractor.getUser()
      .then(([user, error]) => {
        if (error) {
          console.error(error);
        } else setPreferences(user?.preferences);
      })
      .catch((err) => {
        console.error(err);

        setSnack({
          message: "Couldn't load user data.",
          level: SnackbarLevel.ERROR,
          icon: "x",
          duration: 5,
        });
      });
  }, []);

  return (
    <Container>
      <Card>
        <Title>Strategy Simulation</Title>
        <Column>
          <Label>Default value display mode</Label>
          {preferences?.valueDisplayMode ? (
            <SegmentedControl
              initial={preferences.valueDisplayMode}
              onChange={(value) =>
                setPreferences((prev) => ({
                  ...prev,
                  valueDisplayMode: value.key as ValueDisplayMode,
                }))
              }
              segments={[
                {
                  key: "itms",
                  label: "ITMS/OTMS%",
                },
                {
                  key: "itmf",
                  label: "ITMF/OTMF%",
                },
                {
                  key: "numeric",
                  label: "Numeric",
                },
              ]}
            />
          ) : (
            <SuspenseBlock height="48px" />
          )}
          <Button label="Save" onClick={() => void save()} />
        </Column>
      </Card>
    </Container>
  );
}

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
  padding: 50px 30px;
  background: white;
  border: 10px;
  border-radius: 5px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Label = styled.span`
  ${Typography.BODY_3};
  color: ${Color.NEUTRAL_700};
  align-self: start;
`;

const Title = styled.div`
  ${Typography.HEADER_2};
  color: ${Color.NEUTRAL_900};
  align-self: start;
`;
