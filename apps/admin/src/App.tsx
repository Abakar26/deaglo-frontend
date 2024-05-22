import React from "react";
import styled from "styled-components";
import { Color } from "ui/styles";
import { AppRouter } from "./core";
import { AuthProvider } from "./core/auth";

const App: React.FunctionComponent = () => {
  return (
    <Container>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${Color.NEUTRAL_00};
`;

export default App;
