import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIRoute,
  authenticatedQuery,
  authenticatedMutation,
  HTTPMethod,
  type PaginatedData,
} from "@/core";
import { UserLoader, UserTabBar } from "@/view/components/users";
import { UserModal } from "@/view/components/users/modals";
import { useUserStore } from "@/core/store";
import { UserList } from "@/view/components/users";
import { type User, type PartialUser } from "@/core/interface";

export const Users: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { createUser, selectedUser, setCreateUser } = useUserStore();

  const createNewUser = async (user: PartialUser) => {
    const { success, reply, error } = await authenticatedMutation<User>(APIRoute.USER, user);

    if (error) {
      console.error(error);
    }

    if (success && reply) {
      navigate(0);
    }
  };

  const updateUser = async (userId: string, user: PartialUser) => {
    const { error } = await authenticatedMutation<User>(
      APIRoute.USER,
      user,
      undefined,
      HTTPMethod.PATCH,
      userId + "/"
    );

    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    authenticatedQuery<PaginatedData<User>>(APIRoute.USER)
      .then((response) => {
        if (isMounted) {
          if (response.success)
            setTimeout(() => {
              setUsers(response.reply!.results);
            }, 100);
          else setError("Failed to fetch users");
        }
      })
      .catch(() => {
        if (isMounted) setError("Failed to load users");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <UserTabBar />
      {createUser && (
        <UserModal
          user={selectedUser}
          onDismiss={() => setCreateUser(false)}
          onCreate={(user: PartialUser) => createNewUser(user)}
          onSave={(userId: string, user: PartialUser) => updateUser(userId, user)}
        />
      )}
      <Suspense fallback={<UserLoader count={5} />}>
        <UserList users={users} />
      </Suspense>
    </>
  );
};
