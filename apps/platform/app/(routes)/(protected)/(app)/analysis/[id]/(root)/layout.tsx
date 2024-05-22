"use client";

import { useQueryParams } from "@/app/hooks/useQueryParams";
import { Suspense, useEffect } from "react";
import { AnalysisDetailsLoader } from "./components";
import { useAnalysisDetailStore } from "./store";
import { StatusLabelModal } from "./modals";
import { useCurrencyStore } from "@/app/store/CurrencyStates";
import { MarketInteractor } from "@/app/interactors";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { suspenseKey } = useQueryParams();
  const { updateStatus, setUpdateStatus } = useAnalysisDetailStore();
  const { setCurrencies } = useCurrencyStore();

  const fetchCurrenciesList = async () => {
    const [response, error] = await MarketInteractor.currency.getAll();

    if (error) {
      console.error(error);
    }

    if (response) {
      setCurrencies(response);
    }
  };

  useEffect(() => {
    fetchCurrenciesList().catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Suspense fallback={<AnalysisDetailsLoader count={6} />} key={suspenseKey}>
        {children}
      </Suspense>
      {updateStatus && (
        <StatusLabelModal simulation={updateStatus} onDismiss={() => setUpdateStatus(undefined)} />
      )}
    </>
  );
}
