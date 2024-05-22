export interface Organization {
  organizationId: string;
  dateAdded: string;
  dateUpdated: string;
  isDeleted: boolean;
  name: string;
}

export type PartialOrganization = Omit<
  Organization,
  "organizationId" | "dateAdded" | "dateUpdated" | "isDeleted"
>;
