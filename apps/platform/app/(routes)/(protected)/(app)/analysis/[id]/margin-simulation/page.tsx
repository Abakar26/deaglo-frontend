import { MarginActionBlock, MarginInputs } from "./components";
import { SimulationInteractor } from "@/app/interactors";
import { ErrorDispatcher } from "@/app/components";

export default async function CreateMarginPage({ params: { id } }: { params: { id: string } }) {
  const [strategySimulations, error] = await SimulationInteractor.strategy.getAll(id);

  return (
    <>
      <MarginActionBlock hasSimulations={!!(strategySimulations?.results ?? []).length} />
      <MarginInputs
        simulations={(strategySimulations?.results ?? []).sort((l, r) =>
          l.dateUpdated > r.dateUpdated ? -1 : 1
        )}
        analysisId={id}
      />
      <ErrorDispatcher errors={[error]} />
    </>
  );
}
