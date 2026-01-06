import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
interface PaginationProps {
  currentPage: number;
  totalPage: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}
const Pagination = ({
  currentPage,
  totalPage,
  baseUrl,
  searchParams,
}: PaginationProps) => {
    const getPageUrl = (page: number) => {
        const params = new URLSearchParams({...searchParams, page: String(page)});
        return `${baseUrl}?${params.toString()}`
    }
  if (totalPage <= 1) return null;
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPage - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPage - 1) {
      rangeWithDots.push("...", totalPage);
    } else {
      rangeWithDots.push(totalPage);

      return rangeWithDots;
    }
  };

  const visiblePages = getVisiblePages()

  return (
    <nav className="flex items-center justify-center gap-1">
      <Link
        href={currentPage <= 1 ? "#" : getPageUrl(currentPage - 1)}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
          currentPage <= 1
            ? "text-zinc-400 cursor-not-allowed bg-zinc-200 pointer-events-none"
            : "text-zinc-800 hover:bg-zinc-200 bg-white border border-zinc-300"
        }`}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft />
        Previous
      </Link>
        {visiblePages?.map((page, key) => {
            if (page === "...") {
                return <span key={key} className="px-3 py-2 text-sm text-zinc-500">...</span>
            }
            const pageNumber = page as number
            const isCurrentPage = pageNumber === currentPage
            return (
                <Link href={getPageUrl(pageNumber)} key={key} className={`px-3 py-2 text-sm font-medium rounded-lg ${isCurrentPage ? "bg-zinc-600 text-white" : "text-zinc-700 hover:bg-zinc-400 border border-zinc-300"}`}>{pageNumber}</Link>
            )
        })}
      <Link
        href={currentPage >= totalPage ? "#" : getPageUrl(currentPage + 1)}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
          currentPage >= totalPage
            ? "text-zinc-400 cursor-not-allowed bg-zinc-200 pointer-events-none"
            : "text-zinc-800 hover:bg-zinc-200 bg-white border border-zinc-300"
        }`}
        aria-disabled={currentPage >= totalPage}
      >
        Next
        <ChevronRight />
      </Link>
    </nav>
  );
};

export default Pagination;
