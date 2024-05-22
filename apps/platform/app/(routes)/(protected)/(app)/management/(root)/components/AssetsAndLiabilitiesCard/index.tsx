"use client";

import { useEffect, useState } from "react";
import { SegmentedControl, SuspenseBlock, ValueGraph } from "ui/components";
import { Card, CardSubtitle, CardTitle, HeaderSpacer, LargeChart } from "../shared";

import MOCKS, { type AssetsAndLiabilitiesView } from "../_mocks";
type Data = Awaited<ReturnType<typeof MOCKS.getAssetsAndLiabilities>> | undefined;

export function AssetsAndLiabilitiesCard() {
  const [view, setView] = useState<AssetsAndLiabilitiesView>("totals");

  const [data, setData] = useState<Data>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    MOCKS.getAssetsAndLiabilities(view)
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [view]);

  return (
    <Card>
      <HeaderSpacer>
        <header>
          <CardTitle>Assets and Liabilities</CardTitle>
          <CardSubtitle>Check your assets and Liabilities</CardSubtitle>
        </header>

        <SegmentedControl
          initial={view}
          onChange={(option) => setView(option.key as AssetsAndLiabilitiesView)}
          segments={[
            { label: "Totals", key: "totals" },
            { label: "Assets", key: "assets" },
            { label: "Liabilities", key: "liabilities" },
          ]}
        />
      </HeaderSpacer>

      <LargeChart>
        {!loading && data !== undefined ? (
          <ValueGraph lines={data.lines} areas={data.areas} options={{ valueMin: 0 }} />
        ) : (
          <SuspenseBlock />
        )}
      </LargeChart>
    </Card>
  );
}
