import type { ReportItem } from "./_mocks";

type Totals = { lastYear: number; thisYear: number };

type GroupedItems = {
  totals: Totals;
  categories: Record<string, { items: ReportItem[]; totals: Totals }>;
};

export function groupItems(data: ReportItem[]) {
  const result = data.reduce<GroupedItems>(
    (acc, item) => {
      // Compute totals
      acc.totals.lastYear += item.lastYearAmount;
      acc.totals.thisYear += item.thisYearAmount;

      // Initialize category
      const category = item.category;
      acc.categories[category] = acc.categories[category]
        ? acc.categories[category]!
        : { items: [], totals: { thisYear: 0, lastYear: 0 } };

      // Add category items and compute totals
      acc.categories[category]!.items.push(item);
      acc.categories[category]!.totals.lastYear += item.lastYearAmount;
      acc.categories[category]!.totals.thisYear += item.thisYearAmount;

      return acc;
    },
    { totals: { thisYear: 0, lastYear: 0 }, categories: {} }
  );

  return result;
}
