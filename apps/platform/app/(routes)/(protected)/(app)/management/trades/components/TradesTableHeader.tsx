import { TableHeader, TableRow, type SortDescriptor } from "ui/components";
import { useTradesStore } from "../store";
import { KEY_MAP } from "../utilities/keys";

type TradesTableHeaderProps = {
  onSort?: (sortDescriptor: SortDescriptor) => void;
  selectable?: boolean;
  sort?: SortDescriptor;
};

export function TradesTableHeader({ selectable, onSort, sort }: TradesTableHeaderProps) {
  const checkAllTradesSelected = useTradesStore((state) => state.checkAllTradesSelected);
  const selectAllTrades = useTradesStore((state) => state.selectAllTrades);

  const HEADERS = [
    "trade_id",
    "trade_type",
    "fixing_date",
    "position",
    "execution_date",
    "currency_pair",
    "exposure_id",
    "reference",
    "counterparty",
    "notional",
    "value_date",
    "strike_price",
    "spot_ref",
    "premium",
    "mtm_day",
  ] as const;

  return (
    <TableRow>
      {selectable ? (
        <TableHeader checked={checkAllTradesSelected()} onCheck={selectAllTrades} />
      ) : null}
      {HEADERS.map((header) => (
        <TableHeader
          key={header}
          align={KEY_MAP[header].align}
          onSort={onSort}
          sort={sort}
          sortKey={header}
        >
          {KEY_MAP[header].label}
        </TableHeader>
      ))}
    </TableRow>
  );
}
