export * from "./DataTable";
export * from "./TableButton";
export * from "./TableButtonCollapsible";
export * from "./TableCheckbox";
export * from "./TableDateInput";
export * from "./TableDropdown";
export * from "./TableEmptyState";
export * from "./TableEntry";
export * from "./TableHeader";
export * from "./TableInput";
export * from "./TableLabel";
export * from "./TableNumber";
export * from "./TableRow";
export * from "./Pagination";
export * from "./hooks";

export type CellAlignment = "start" | "end" | "space-between";
export type CellDirection = "row" | "row-reverse";

export type ColumnConfig = {
  align?: CellAlignment;
  direction?: CellDirection;
};
