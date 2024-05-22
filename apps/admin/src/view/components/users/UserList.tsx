import React from "react";
import { type User } from "@/core/interface";
import { UserCard } from "@/view/components/users";

interface Props {
  users: Array<User>;
}

export const UserList: React.FunctionComponent<Props> = ({ users }) => {
  return users?.map((user) => <UserCard user={user} key={user.userId} />);
};
