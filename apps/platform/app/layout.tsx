"use client";

import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { ContentIconColor, Modal } from "ui/components";
import { Typography } from "ui/styles";
import { AppSnackbar, StyledComponentsRegistry } from "./components";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [displayBanner, setDisplayBanner] = useState(false);

  const updateScreenState = () => {
    if (typeof window !== "undefined") setDisplayBanner(window.innerWidth < 992);
  };

  useEffect(() => {
    if (typeof window !== "undefined") window.addEventListener("resize", updateScreenState);

    return () => {
      if (typeof window !== "undefined") window.removeEventListener("resize", updateScreenState);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          {displayBanner ? (
            <Modal
              title="Looks like you are using a mobile device."
              icon={{
                color: ContentIconColor.BROWN_100,
                icon: "warning",
              }}
            >
              <Container>
                <Message>
                  Deaglo platform is meant to be used on larger screen. Please log in using a
                  desktop device.
                </Message>
              </Container>
            </Modal>
          ) : (
            <>{children}</>
          )}
          <AppSnackbar />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Message = styled.p`
  ${Typography.BODY_1}
`;
