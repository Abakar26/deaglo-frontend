"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const generateQuery = (params: Array<[string, string]>): string => {
  return params.map(([key, value]) => `${key}=${value}`).join("&");
};

export const useQueryParams = () => {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const append = (key: string, value: string) => {
    const queryParams = Array.from(params.entries());
    const queryString = generateQuery([...queryParams, [key, value]]);
    router.push(`${path}?${queryString}`, { scroll: false });
  };

  const update = (key: string, value: string) => {
    if (params.has(key)) {
      const queryParams: Array<[string, string]> = Array.from(params.entries()).map(
        ([currentKey, currentValue]) =>
          currentKey === key ? [key, value] : [currentKey, currentValue]
      );
      const queryString = generateQuery(queryParams);
      router.push(`${path}?${queryString}`, { scroll: false });
    } else {
      append(key, value);
    }
  };

  const remove = (key: string, value?: string) => {
    const queryParams: Array<[string, string]> = Array.from(params.entries()).filter(
      ([currentKey, currentValue]) => key !== currentKey || (value && value !== currentValue)
    );
    const queryString = generateQuery(queryParams);
    router.push(`${path}?${queryString}`, { scroll: false });
  };

  const set = (queryParams: Array<{ key: string; value: string }>) => {
    const _queryParams: Array<[string, string]> = queryParams.map(({ key, value }) => [key, value]);
    const queryString = generateQuery(_queryParams);
    router.push(`${path}?${queryString}`, { scroll: false });
  };

  const clear = () => {
    router.push(`${path}`, { scroll: false });
  };

  const getAll = (keys: Array<string>): Record<string, Array<string>> => {
    return keys.reduce((prev, curr) => {
      return { ...prev, [curr]: params.getAll(curr) };
    }, {});
  };

  const suspenseKey = Array.from(params.entries())
    .map(([key, value]) => `(${key},${value})`)
    .join(",");

  return {
    params,
    suspenseKey,
    append,
    remove,
    getAll,
    update,
    set,
    clear,
  };
};
