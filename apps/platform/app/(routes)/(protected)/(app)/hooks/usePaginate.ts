import type { APIResponse, PaginatedData } from "@/app/interactors";
import { useCallback, useState } from "react";

export const usePaginate = <T>(
  data: Array<T>,
  id: string,
  searchParams: URLSearchParams,
  genericFunction: (
    current: number,
    id: string,
    searchParams: URLSearchParams
  ) => Promise<APIResponse<PaginatedData<T>>>
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paginatedData, setPaginatedData] = useState<Array<T> | undefined>(data);

  const fetchData = useCallback(
    async (pageNumber: number) => {
      setLoading(true);
      if (pageNumber > 1) {
        const [response] = await genericFunction(pageNumber, id, searchParams);
        if (response?.results) {
          const updatedPaginated = paginatedData?.concat(response?.results);
          setPaginatedData(updatedPaginated);
        }
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, paginatedData, searchParams]
  );

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      void fetchData(newPage);
    }
  };

  const nextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    void fetchData(newPage);
  };

  return { nextPage, prevPage, paginatedData, currentPage, loading };
};
