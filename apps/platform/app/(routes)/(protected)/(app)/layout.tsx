"use client";

import { MarketInteractor } from "@/app/interactors";
import { useCurrencyStore } from "@/app/store/CurrencyStates";
import React, { useEffect } from "react";
import styled from "styled-components";
import { AppHelper, AppPage, AppSidebar } from "./components";
import ModalHandler from "./modals/ModalHandler";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { setCurrencies } = useCurrencyStore();

  const fetchCurrenciesList = async () => {
    const [response] = await MarketInteractor.currency.getAll();
    if (response) {
      setCurrencies(response);
    }
  };

  useEffect(() => {
    fetchCurrenciesList().catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ModalHandler>
        <AppSidebar />
        <AppHelper />
        <AppPage>{children}</AppPage>
      </ModalHandler>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  overflow: hidden;
`;
