import { useMemo } from "react";

export const useExtrema = (data: Array<number>): [number, number] => {
  return useMemo(() => {
    return [Math.min(...data), Math.max(...data)];
  }, [data]);
};
