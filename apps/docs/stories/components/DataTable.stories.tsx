import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Button,
  DataTable,
  TableButton,
  TableButtonCollapsible,
  TableCheckbox,
  TableDateInput,
  TableEmptyState,
  TableEntry,
  TableHeader,
  TableInput,
  TableLabel,
  TableNumber,
  TableRow,
  useExpandedRows,
  useRowSelection,
  type SortDescriptor,
} from "ui/components";

const meta = {
  title: "DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: true }],
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    page: {
      type: "number",
      description: "Current table page",
    },
    totalPages: {
      type: "number",
      description: "Total number of table pages",
    },
    setPage: {
      type: "function",
      description: "Callback triggered on  pagination interaction, takes new page",
    },
    sticky: {
      type: "symbol",
      description:
        "Sets numbers of columns to stick at start and end of the table, receives tuple with [startCount, endCount]",
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => <DefaultComponent />,
};

function DefaultComponent() {
  type Keys =
    | "trade_id"
    | "trade_type"
    | "fixing_date"
    | "position"
    | "execution_date"
    | "currency_pair"
    | "premium"
    | "mtm_day";

  const trades = [
    {
      trade_id: "235",
      trade_type: "Put",
      fixing_date: "2024/01/26",
      position: "Long",
      execution_date: "2024/01/26",
      currency_pair: "USD-BRL",
      premium: "2,000,000.00",
      mtm_day: "2,000,000.00",
    },
    {
      trade_id: "678",
      trade_type: "Seagull",
      fixing_date: "2024/01/26",
      position: "N/A",
      execution_date: "2024/01/26",
      currency_pair: "USD-BRL",
      premium: "1,000,000.00",
      mtm_day: "1,000,000.00",
    },
    {
      trade_id: "576",
      trade_type: "Forward",
      fixing_date: "2024/01/26",
      position: "Long",
      execution_date: "2024/01/26",
      currency_pair: "USD-BRL",
      premium: "3,000,000.00",
      mtm_day: "3,000,000.00",
    },
  ];

  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<SortDescriptor>();
  const [sortedTrades, setSortedTrades] = useState(trades);

  const { selectedRows, isSelectedAll, isSelectedRow, selectAll, selectRow, clearSelection } =
    useRowSelection(trades.map((trade) => trade.trade_id));

  function handleSorting({ key, direction }: SortDescriptor) {
    sortedTrades.sort((a, b) => a[key as Keys].localeCompare(b[key as Keys]));
    setSortedTrades(direction === "ascending" ? sortedTrades : sortedTrades.reverse());
    setSort({ key, direction });
  }

  return (
    <div style={{ width: 840 }}>
      <DataTable page={page} totalPages={2} setPage={setPage} sticky={[2, 1]}>
        <thead>
          <TableRow>
            <TableHeader checked={isSelectedAll()} onCheck={selectAll} />
            <TableHeader sortKey="trade_id" sort={sort} onSort={handleSorting}>
              Trade ID
            </TableHeader>
            <TableHeader>Trade Type</TableHeader>
            <TableHeader>Fixing Date</TableHeader>
            <TableHeader>Position</TableHeader>
            <TableHeader>Execution Date</TableHeader>
            <TableHeader>Currency pair</TableHeader>
            <TableHeader reverse sortKey="premium" sort={sort} onSort={handleSorting}>
              Premium
            </TableHeader>
            <TableHeader reverse sortKey="mtm_day" sort={sort} onSort={handleSorting}>
              MtM (day)
            </TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {sortedTrades.map((trade) => (
            <TableRow key={trade.trade_id} $selected={isSelectedRow(trade.trade_id)}>
              <TableCheckbox
                active={isSelectedRow(trade.trade_id)}
                onChange={(checked) => selectRow(trade.trade_id, checked)}
              />
              <TableEntry primary>{trade.trade_id}</TableEntry>
              <TableEntry>{trade.trade_type}</TableEntry>
              <TableLabel status="negative">{trade.fixing_date}</TableLabel>
              <TableEntry>{trade.position}</TableEntry>
              <TableEntry>{trade.execution_date}</TableEntry>
              <TableEntry>{trade.currency_pair}</TableEntry>
              <TableEntry align="end">{trade.premium}</TableEntry>
              <TableButton
                align="end"
                label={trade.mtm_day}
                icon="chart"
                onClick={() => undefined}
              />
            </TableRow>
          ))}
        </tbody>
      </DataTable>

      <div style={{ height: 40, marginTop: 24 }}>
        {selectedRows.length > 0 ? (
          <Button
            label={`Clear ${selectedRows.length} selected`}
            onClick={clearSelection}
            resizeMode="fit"
          />
        ) : null}
      </div>
    </div>
  );
}

export const EditableFields: Story = {
  args: {},
  render: () => <EditableFieldsComponent />,
};

const EditableFieldsComponent: React.FunctionComponent = () => {
  const [date, setDate] = useState<Record<string, Date | undefined>>({});
  const [value, setValue] = useState<Record<string, string>>({});
  const [number, setNumber] = useState<Record<string, number | undefined>>({});
  const [checkbox, setCheckbox] = useState<Record<string, boolean>>({});

  return (
    <div style={{ width: "840px" }}>
      <DataTable>
        <TableRow>
          <TableHeader
            checked={checkbox.checkbox0}
            onCheck={(checkbox0) => setCheckbox({ ...checkbox, checkbox0 })}
          />
          <TableHeader>Input</TableHeader>
          <TableHeader>Date</TableHeader>
          <TableHeader>Value</TableHeader>
          <TableHeader>Button</TableHeader>
        </TableRow>
        <TableRow>
          <TableCheckbox
            active={checkbox.checkbox1 ?? false}
            onChange={(checkbox1) => setCheckbox({ ...checkbox, checkbox1 })}
          />
          <TableInput value={value.value1} onChange={(value1) => setValue({ ...value, value1 })} />
          <TableDateInput date={date.date1} onChange={(date1) => setDate({ ...date, date1 })} />
          <TableNumber
            value={number.number1}
            onChange={(number1) => setNumber({ ...number, number1 })}
          />
          <TableButton label="Button" onClick={() => null} />
        </TableRow>
        <TableRow>
          <TableCheckbox
            active={checkbox.checkbox2 ?? false}
            onChange={(checkbox2) => setCheckbox({ ...checkbox, checkbox2 })}
          />
          <TableInput
            align="end"
            value={value.value2}
            onChange={(value2) => setValue({ ...value, value2 })}
          />
          <TableDateInput
            date={date.date2}
            reverse
            onChange={(date2) => setDate({ ...date, date2 })}
          />
          <TableNumber
            align="end"
            value={number.number2}
            onChange={(number2) => setNumber({ ...number, number2 })}
          />
          <TableButton align="end" label="Button" onClick={() => null} />
        </TableRow>
        <TableRow>
          <TableCheckbox
            active={checkbox.checkbox3 ?? false}
            onChange={(checkbox3) => setCheckbox({ ...checkbox, checkbox3 })}
          />
          <TableInput
            error
            value={value.value3}
            onChange={(value3) => setValue({ ...value, value3 })}
          />
          <TableDateInput
            date={date.date2}
            error
            onChange={(date3) => setDate({ ...date, date3 })}
          />
          <TableNumber
            error
            value={number.number3}
            onChange={(number3) => setNumber({ ...number, number3 })}
          />
          <TableButton label="Button" onClick={() => null} align="end" />
        </TableRow>
      </DataTable>
    </div>
  );
};

export const EmptyState: Story = {
  args: {},
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <DataTable>
        <thead>
          <TableRow>
            <TableHeader>Trade ID</TableHeader>
            <TableHeader>Trade Type</TableHeader>
            <TableHeader>Execution Date</TableHeader>
            <TableHeader>Currency pair</TableHeader>
            <TableHeader>Notional</TableHeader>
          </TableRow>
        </thead>
      </DataTable>

      <TableEmptyState
        title="See your added Trades here"
        subtitle="Start adding your Trades Execute your Strategies now"
      />
    </div>
  ),
};

export const WithExpandableRows: Story = {
  args: {},
  render: () => <WithExpandableRowsComponent />,
};

function WithExpandableRowsComponent() {
  const { isExpandedRow, toggleExpand } = useExpandedRows();

  return (
    <>
      <DataTable>
        <thead>
          <TableRow>
            <TableHeader>Trade ID</TableHeader>
            <TableHeader>Trade Type</TableHeader>
            <TableHeader>Execution Date</TableHeader>
            <TableHeader>Currency pair</TableHeader>
            <TableHeader>Notional</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <TableEntry primary>235</TableEntry>
            <TableButtonCollapsible
              expanded={isExpandedRow("235")}
              onToggle={() => toggleExpand("235")}
            >
              Seagull
            </TableButtonCollapsible>
            <TableEntry>2021/10/19</TableEntry>
            <TableEntry>USD-BRL</TableEntry>
            <TableEntry>2,000,000.00</TableEntry>
          </TableRow>
          <TableRow $collapsed={!isExpandedRow("235")} $level={1}>
            <TableEntry>Leg</TableEntry>
            <TableEntry>Put</TableEntry>
            <TableEntry>2021/10/19</TableEntry>
            <TableEntry>USD-BRL</TableEntry>
            <TableEntry>2,000,000.00</TableEntry>
          </TableRow>
          <TableRow>
            <TableEntry primary>564</TableEntry>
            <TableButtonCollapsible
              expanded={isExpandedRow("564")}
              onToggle={() => toggleExpand("564")}
            >
              Seagull
            </TableButtonCollapsible>
            <TableEntry>2021/10/19</TableEntry>
            <TableEntry>USD-BRL</TableEntry>
            <TableEntry>2,000,000.00</TableEntry>
          </TableRow>
          <TableRow $collapsed={!isExpandedRow("564")} $level={1}>
            <TableEntry>Leg</TableEntry>
            <TableEntry>Call</TableEntry>
            <TableEntry>2021/10/19</TableEntry>
            <TableEntry>USD-BRL</TableEntry>
            <TableEntry>2,000,000.00</TableEntry>
          </TableRow>
        </tbody>
      </DataTable>
    </>
  );
}
