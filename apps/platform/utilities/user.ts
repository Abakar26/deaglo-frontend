import type { User } from "@/app/interface";

export function getInitialsFromUser(user: User): string {
  const firstInitial =
    user.firstName && user.firstName.length > 0 ? user.firstName[0]!.toUpperCase() : "";
  const lastInitial =
    user.lastName && user.lastName.length > 0 ? user.lastName[0]!.toUpperCase() : "";

  const initials = `${firstInitial}${lastInitial}`;
  return initials;
}
