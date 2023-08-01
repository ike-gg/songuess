import chunkArrayBySize from "@/utils/chunkArrayBySize";
import { useCallback, useEffect, useMemo, useState } from "react";

interface PaginationOptions<T> {
  items: Array<T>;
  itemsPerPage: number;
  query?: string;
  queryFn?: (query: string) => Array<T>;
}

const usePagination = <T>({
  items,
  itemsPerPage,
  query,
  queryFn,
}: PaginationOptions<T>) => {
  const [internalItems, setInternalItems] = useState<Array<T>>(items);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSlice, setCurrentSlice] = useState<T[]>();

  useEffect(() => {
    setInternalItems(query && queryFn ? queryFn(query) : items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, query]);

  const pagedItems = useMemo(() => {
    setCurrentPage(0);
    return chunkArrayBySize(internalItems, itemsPerPage);
  }, [internalItems, itemsPerPage]);

  useEffect(() => {
    setCurrentSlice(pagedItems[currentPage]);
  }, [currentPage, pagedItems]);

  const paginationAvailable = internalItems.length > itemsPerPage;

  const nextAvailable = currentPage + 1 < pagedItems.length;
  const prevAvailable = currentPage - 1 >= 0;

  const nextPage = () =>
    setCurrentPage((p) => {
      const newPage = p + 1;
      if (newPage >= pagedItems.length) return p;
      return newPage;
    });

  const prevPage = () =>
    setCurrentPage((p) => {
      const newPage = p - 1;
      if (newPage < 0) return p;
      return newPage;
    });

  return {
    currentSlice,
    currentPage: currentPage + 1,
    nextPage,
    prevPage,
    nextPageAvailable: nextAvailable,
    prevPageAvailable: prevAvailable,
    paginationAvailable,
  };
};

export default usePagination;
