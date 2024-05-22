import { type User } from "@/core/interface";
import { create } from "zustand";

interface UserState {
  createUser: boolean;
  selectedUser: User | undefined;
  setCreateUser: (createUser: boolean, selectedUser?: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  createUser: false,
  selectedUser: undefined,
  setCreateUser: (createUser: boolean, selectedUser = undefined) =>
    set(() => ({ createUser, selectedUser })),
}));
