"use client";

import { AuthInteractor } from "@/app/interactors";
import type { User } from "@/app/interface";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    AuthInteractor.getUser()
      .then(([user]) => {
        setUser(user);
      })
      .catch(() => null);
  }, []);

  if (!user) {
    redirect("/sign-in");
  } else {
    redirect("/dashboard");
  }
}
