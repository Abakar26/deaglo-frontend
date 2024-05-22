import { getAll } from "@/app/interactors/strategy";
import { Container } from "../shared";
import { DerivativeGuideSkeleton } from "./DerivativeGuideSkeleton";
import { DerivativesSection } from "./DerivativesSection";
import { StrategiesSection } from "./StrategiesSection";

export async function DerivativeGuide() {
  const [strategies] = await getAll();

  // TODO: Replace with error feedback
  if (strategies === undefined) return <DerivativeGuideSkeleton />;

  const derivatives = strategies.filter((strategy) => {
    return ["Forward", "Call", "Put"].includes(strategy.name);
  });

  return (
    <Container>
      <DerivativesSection strategies={derivatives} />

      <StrategiesSection strategies={strategies} />
    </Container>
  );
}
