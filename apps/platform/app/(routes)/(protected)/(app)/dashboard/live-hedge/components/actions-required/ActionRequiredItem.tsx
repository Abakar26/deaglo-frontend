import { type Action } from "../_mocks";

import { useRouter } from "next/navigation";
import { ContentBlock, ContentColor, ContentIconColor } from "ui/components";
import { useTradesStore } from "../../../../management/trades/store";

type ActionRequiredItemProps = {
  action: Action;
};

export function ActionRequiredItem({ action }: ActionRequiredItemProps) {
  const router = useRouter();

  const selectTrades = useTradesStore((state) => state.selectTrades);

  function editTrade(tradeId: string) {
    // TODO: Missing editing implementation
    selectTrades([tradeId], true);
    router.push("/management/trades");
  }

  function viewTrade(tradeId: string) {
    selectTrades([tradeId], true);
    router.push("/management/trades");
  }

  return (
    <ContentBlock
      action={{
        label: "Edit Trade",
        asButton: true,
        onClick: () => editTrade(action.tradeId),
      }}
      color={ContentColor.NEUTRAL_00}
      description={action.message}
      icon={{ icon: "warning", color: ContentIconColor.DANGER_100 }}
      secondaryAction={{ label: "View trades", onClick: () => viewTrade(action.tradeId) }}
      title={action.type}
    />
  );
}
