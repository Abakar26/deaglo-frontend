import { Suspense } from "react";
import { DerivativeGuide, DerivativeGuideSkeleton } from "./components/derivative-guide";

type PageProps = {
  searchParams?: {
    guide: "derivative" | "analisys";
  };
};

export default function Page({ searchParams }: PageProps) {
  if (searchParams?.guide === "analisys") {
    return null;
  }

  return (
    <Suspense fallback={<DerivativeGuideSkeleton />}>
      <DerivativeGuide />
    </Suspense>
  );
}
