import { usePathname, useRouter } from "next/navigation";
export const useUrl = () => {
  const path = usePathname();
  const router = useRouter();

  const push = (path: string) => router.push(path);
  const append = (tail: string) => router.push(`${path}/${tail}`);
  const backtrack = () => {
    const components = path.split("/").slice(0, -1);
    router.push(components.join("/"));
  };

  const replace = (tail: string) => {
    const components = path.split("/").slice(0, -1);
    router.push([...components, tail].join("/"));
  };

  return {
    push,
    append,
    backtrack,
    replace,
  };
};
