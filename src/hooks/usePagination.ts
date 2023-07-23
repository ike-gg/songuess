import chunkArrayBySize from "@/utils/chunkArrayBySize";
import { useEffect, useMemo, useState } from "react";

interface PaginationOptions<T> {
  items: Array<T>;
  itemsPerPage: number;
}

const usePagination = <T>({ items, itemsPerPage }: PaginationOptions<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSlice, setCurrentSlice] = useState<T[]>();

  const pagedItems = useMemo(() => {
    setCurrentPage(0);
    return chunkArrayBySize(items, itemsPerPage);
  }, [items, itemsPerPage]);

  useEffect(() => {
    setCurrentSlice(pagedItems[currentPage]);
  }, [currentPage, pagedItems]);

  const paginationAvailable = items.length > itemsPerPage;

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
