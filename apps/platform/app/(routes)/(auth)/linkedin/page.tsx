"use client";
import { useAuthInteractor } from "@/app/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

function LinkedInAuth() {
  const router = useRouter();
  const param = useSearchParams();
  const { signInWithLinkedIn } = useAuthInteractor();
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState<string>("");

  const effectRan = useRef(false);

  useEffect(() => {
    const handleSignIn = async () => {
      if (param.has("code")) {
        setLoading(true);
        const route_path = await signInWithLinkedIn(param.get("code")!);
        setRoute(route_path ?? "");
        setLoading(false);
      }
    };

    if (!effectRan.current) {
      handleSignIn();

      effectRan.current = true;
    }
  }, [param]);

  return loading ? <div>Loading</div> : <>{window.close()}</>;
}

export default function LinkedInAuthPage() {
  return (
    <Suspense>
      <LinkedInAuth />
    </Suspense>
  );
}
