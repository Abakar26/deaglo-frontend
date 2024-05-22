"use client";

import MOCKS from "./_mocks";

import { useEffect, useState } from "react";
import { useQueryParams } from "@/app/hooks";
import { ReportsTable } from "./ReportsTable";
import { useReportsStore } from "./store";
import { SuspenseBlock } from "ui/components";

export function ReportsTableGroup() {
  const { params } = useQueryParams();
  const setReports = useReportsStore((state) => state.setReports);

  const [loading, setLoading] = useState(false);

  const period = params.get("period");

  useEffect(() => {
    setLoading(true);

    MOCKS.getReports({ period })
      .then((data) => {
        setReports(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [period, setReports]);

  return !loading ? (
    <>
      <ReportsTable type="assets" />
      <ReportsTable type="liabilities" />
    </>
  ) : (
    <>
      <SuspenseBlock height="400px" />
      <SuspenseBlock height="400px" />
    </>
  );
}
