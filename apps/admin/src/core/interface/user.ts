export interface User {
  userId: string;
  dateAdded: string;
  dateUpdated: string;
  isDeleted: boolean;
  lastLogin: string;
  isActive: boolean;
  isVerified: boolean;
  userRole: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  city: string;
  country: string;
}

export type PartialUser = Omit<
  User,
  "userId" | "dateAdded" | "dateUpdated" | "isDeleted" | "lastLogin" | "isActive"
>;
